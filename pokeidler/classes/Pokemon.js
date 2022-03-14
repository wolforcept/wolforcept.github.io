class Pokemon {

    name
    loadString

    level = 0
    health = 0
    maxHealth = 0
    energy = 100
    maxEnergy = 100
    xp = 0
    maxXp = 0

    isInGym = false
    currentMoveName
    masteries = []

    shiny
    female

    /** argument can be a load string or another pokemon's data */
    constructor(loadData) {
        if (loadData.loadString) {
            this.loadString = loadData.loadString
            Object.keys(this).forEach(key => this[key] = loadData[key])
        } else {
            this.loadString = loadData
            this.levelUp()
        }
    }

    async load() {

        console.log("Loading pokemon data from loadstring \"" + this.loadString + "\"")
        const pokemon = await (await CACHE.fetch('https://pokeapi.co/api/v2/pokemon/' + this.loadString)).json()
        if (!pokemon)
            throw `error: pokemon ${this.loadString} not found`
        const moves = await Promise.all(
            pokemon.moves.map((_move) =>
                (
                    async function () {
                        const move = await (await CACHE.fetch(_move.move.url)).json()
                        delete move.learned_by_pokemon
                        move.level = _move.version_group_details[0].level_learned_at
                        return move
                    }
                )()
            )
        )
        const species = await (await CACHE.fetch(pokemon.species.url)).json()
        const evolutions = await (await CACHE.fetch(species.evolution_chain.url)).json()

        this.loaded = { pokemon, moves, species, evolutions }
    }
    getCachedPokemon() { return this.loaded.pokemon }
    getCachedMoves() { return this.loaded.moves }
    getCachedSpecies() { return this.loaded.species }
    getCachedEvolutions() { return this.loaded.evolutions }

    levelUp() {
        // TODO
        this.level++
        this.xp = 0
        this.maxXp = parseInt(89.37 + .2445 * this.level * this.level, 10)
        this.maxHealth = parseInt(1247.2 - 274675 / (this.level + 222.373), 10)
        this.health = this.maxHealth
    }

    getId() {
        return this.getCachedPokemon().id
    }

    getName() {
        if (this.name)
            return this.name
        const species = this.getCachedSpecies()
        const name = !species ? null : species.names.find(x => x.language.name === "en")
        return name ? name.name : cap(this.getCachedPokemon().name)
    }

    setName(name) {
        this.name = name
    }

    getTitle() {
        return `#${this.getId()} ${this.getName()}`
    }

    getFlavorText() {
        return this.getCachedSpecies().flavor_text_entries.find(
            (t) => t.language.name == "en"
        ).flavor_text.replaceAll('', ' ')
    }

    getImageSrc(back) {
        const pokemon = this.getCachedPokemon()
        const s = (back ? "back" : "front") + (this.shiny ? "_shiny" : "_default") + (this.female ? "_female" : "")
        return pokemon.sprites[s] ? pokemon.sprites[s] : pokemon.sprites.front_default
    }

    getMoveList() {
        return this.getCachedMoves()
            .sort((a, b) => {
                if (a.level === b.level)
                    return a.name > b.name ? 1 : -1
                return a.level - b.level
            })
            .map(x => x.name + ": lv " + x.level)
    }

    getMoves() {
        const pokemon = this.getCachedPokemon()
        const moves = this.getCachedMoves()
        return pokemon.moves.filter(
            pkmnMove => pkmnMove.version_group_details.find(_ => true).move_learn_method.name === "level-up"
                && pkmnMove.version_group_details.find(_ => true).level_learned_at <= this.level
        ).map(
            pkmnMove => {
                return moves.find(move => move.name === pkmnMove.move.name)
            }
        ).filter(
            move => move.power
        )
    }

    getCurrentMoveStats() {
        return this.getMoveStats(this.getCurrentMove())
    }

    getMoveStats(move) {
        const accMod = move && move.accuracy ? (100 - move.accuracy) : 1
        const powMod = move ? move.power / 10 : 1
        const mastery = this.masteries.find(mastery => mastery.name == move.name)
        const masteryMod = mastery ? mastery.value : 1
        return {
            name: move ? move.name : null,
            energy: move ? parseInt(move.power / 10, 10) : 1,
            time: parseInt(accMod * this.level * 1.753, 10),
            xp: parseInt(1 + masteryMod / 100.0 * powMod * 7.28, 10),
            mastery: mastery ? mastery.value : 0
        }
    }

    getCurrentMove() {
        return this.getMoves().find(x => x.name && x.name === this.currentMoveName)
    }

    setCurrentMove(moveName) {
        console.log("current move: " + moveName)
        this.currentMoveName = moveName
        console.log(this.getCurrentMove())
        DATA.update()
    }

    gainXp(n) {
        this.xp += n
        if (this.xp >= this.maxXp) {
            const diff = this.xp - this.maxXp
            this.levelUp()
            this.gainXp(diff)
        }
    }

    canTrain() {
        return this.energy >= this.getCurrentMoveStats().energy
    }

    train() {
        const stats = this.getCurrentMoveStats()
        if (stats.name) {
            const mastery = this.masteries.find(x => x.name == stats.name)
            if (mastery) {
                if (mastery.value < 100)
                    mastery.value++
            } else
                this.masteries.push({ name: stats.name, value: 1 })
        }
        this.gainXp(stats.xp)
        this.energy -= stats.energy
        DATA.update()
    }

    step() {
        if (this.energy < this.maxEnergy)
            this.energy++
        DATA.update()
    }

}