const CACHE = {}

function getSelfOnEvoChain(chain, name, arr) {

    if (chain.species.name == name) {
        if (!arr)
            arr = [chain.species.name]

        return chain
    }

    if (arr)
        arr.push(chain.species.name)

    for (let i = 0; i < chain.evolves_to.length; i++) {
        const chain2 = getSelfOnEvoChain(chain.evolves_to[i], name, arr)
        if (chain2)
            return chain2
    }
}

class Pokemon {

    name
    loadString
    loaded = false

    level = 0
    health = 0
    maxHealth = 0
    energy = 100
    xp = 0
    maxXp = 0
    chosenEvolution = 0

    currentMoveName
    masteries = []
    items = []

    shiny
    female

    /** argument can be a load string or another pokemon's data */
    constructor(loadData, level) {
        if (loadData.loadString) {
            this.loadString = loadData.loadString
            Object.keys(this).forEach(key => {
                if (loadData[key])
                    this[key] = loadData[key]
            })
        } else {
            this.loadString = loadData
            this.setLevel(level || 1)
        }
    }

    getTypes() {
        return this.getCachedPokemon().types.map(x => x.type.name)
    }

    getMaxEnergy() {
        let maxEnergy = 100
        this.items.forEach(x => {
            if (x == 'macho_brace')
                maxEnergy += 100
        })
        return maxEnergy
    }

    getItemDamageBoost() {
        let boost = 0;

        if (this.type == 'grass' && this.hasItemName('leaf_stone'))
            boost += .2

        if (this.type == 'fire' && this.hasItemName('fire_stone'))
            boost += .2

        if (this.type == 'water' && this.hasItemName('water_stone'))
            boost += .2

        if (this.type == 'electric' && this.hasItemName('thunder_stone'))
            boost += .2

        return boost;
    }

    async loadAsync() {
        if (CACHE[this.loadString]) {
            console.log(`pokemon ${this.loadString} already in cache`)
            return
        }

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
        const evolution_chain = (await (await CACHE.fetch(species.evolution_chain.url)).json()).chain
        let evolutions = getSelfOnEvoChain(evolution_chain, species.name).evolves_to
        evolutions = evolutions.map(e => ({ name: e.species.name, details: e.evolution_details, isBaby: e.is_baby }))
        CACHE[this.loadString] = { pokemon, moves, species, evolutions }
        console.log("finished loading " + this.loadString);
        DATA.refresh()
    }
    getCachedPokemon() {
        if (!CACHE[this.loadString])
            return null
        return CACHE[this.loadString].pokemon
    }
    getCachedMoves() {
        if (!CACHE[this.loadString])
            return null
        return CACHE[this.loadString].moves
    }
    getCachedSpecies() {
        if (!CACHE[this.loadString])
            return null
        return CACHE[this.loadString].species
    }
    getCachedEvolutions() {
        if (!CACHE[this.loadString])
            return null
        return CACHE[this.loadString].evolutions
    }
    isLoaded() {
        return CACHE[this.loadString] ? true : false
    }

    levelUp() {
        this.setLevel(this.level + 1)
    }

    setLevel(newLevel) {
        this.level = newLevel
        this.xp = 0
        this.maxXp = parseInt(99.37 + .3445 * this.level * this.level, 10)
        const percentHealth = this.health / this.maxHealth || 1
        this.maxHealth = parseInt(1247.2 - 274675 / (this.level + 222.373), 10)
        this.health = parseInt(this.maxHealth * percentHealth)
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

    static getNameFrom(pokemon) {
        const name1 = pokemon.species && pokemon.species.names ? pokemon.species.names.find(x => x.language.name == "en") : null
        if (name1)
            return name1.name
        if (this.name)
            return cap(this.name)
        return "?????"
        // const species = this.getCachedSpecies()
        // const name = !species ? null : species.names.find(x => x.language.name === "en")
        // return name ? name.name : cap(this.getCachedPokemon().name)
    }

    setName(name) {
        this.name = name
    }

    getTitle() {
        return `${this.getName()} Lv.${this.level} `
    }

    getFlavorText() {
        return this.getCachedSpecies().flavor_text_entries.find(
            (t) => t.language.name == "en"
        ).flavor_text.replaceAll('', ' ')
    }

    getEvolutionNames() {
        return this.getCachedEvolutions().map(e => e.name)
    }

    evolve() {
        if (this.level >= 50) {
            this.loadString = this.getEvolutionNames()[this.chosenEvolution]
            this.setLevel(1)
            this.loadAsync()
        }
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

    getMoves(getAll) {
        const pokemon = this.getCachedPokemon()
        const moves = this.getCachedMoves()


        if (getAll)
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
        if (!move)
            return {
                name: null,
                energy: 1,
                xp: 10,
                mastery: 0
            }

        const name = move.name
        // const acc = move.accuracy ? (100 - move.accuracy) : 1
        const pow = move.power
        const mastery = this.masteries.find(mastery => mastery.name == move.name)
        const mast = mastery ? mastery.value / 100 : .01

        return {
            name,
            energy: parseInt(.5 * (.25 + .75 * mast) * (((pow - 50) * .5) + 50)),
            xp: parseInt(10 + (.1 + .9 * mast) * (.3535 * pow + 16.6666)),
            mastery: mastery ? mastery.value : 0
        }
    }

    getCurrentMove() {
        return this.getMoves().find(x => x.name && x.name === this.currentMoveName)
    }

    setCurrentMove(moveName) {
        this.currentMoveName = moveName
    }

    hasItemName(itemName) {
        return this.items.find(itemName) ? true : false
    }

    addItemId(itemId) {
        this.items.push(itemId)
    }

    removeItem(itemIndex) {
        const itemId = this.items.splice(itemIndex, 1)[0]
        DATA.addItemId(itemId)
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
        if (this.energy < stats.energy) return
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
    }

    heal() {
        if (!DATA.currentBattle &&
            this.health < this.maxHealth &&
            this.energy > 0) {
            this.addHealth(1 + parseInt(this.maxHealth * .01))
            this.energy--
        }
    }

    addHealth(value) {
        this.health = parseInt(Math.min(this.maxHealth, this.health + value))
    }

    step(ticks) {
        if (ticks % 100 == 0) {
            const prevEnergy = this.energy
            this.energy = Math.min(this.energy + 2, this.getMaxEnergy())
            if (this.energy != prevEnergy)
                DATA.refresh()
        }
    }

}