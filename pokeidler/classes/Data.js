class Battle {

    loadString
    name
    health
    maxHealth
    level
    image
    moves

    turn = 0
    catching = 0

    constructor(loaded, name, health, level, image, moves) {
        if (loaded.loadString) {
            // load  battle from another battle
            this.loadString = loaded.loadString
            this.name = loaded.name
            this.health = loaded.health
            this.maxHealth = loaded.health
            this.level = loaded.level
            this.image = loaded.image
            this.moves = loaded.moves
            this.turn = loaded.turn
            this.catching = loaded.catching
        } else {
            this.loadString = loaded
            this.name = name
            this.health = health
            this.maxHealth = health
            this.level = level
            this.image = image
            this.moves = moves
        }
        if (!DATA.seenPokemon.includes(this.loadString))
            DATA.seenPokemon.push(this.loadString)

        if (DEBUG)
            console.log(this)
    }

    getMyPokemon() {
        return DATA.getPokemonInBattle()
    }

    tryCatch() {
        const catchRate = 1 + Math.max(0, Math.random() * 10 * (this.maxHealth - this.health) / this.maxHealth)
        this.catching = Math.min(100, this.catching + catchRate)
        DATA.refresh()
    }

    step() {

        const myPokemon = this.getMyPokemon()

        if (this.turn != 3 && myPokemon.health <= 0) {
            this.turn = 3
            DATA.log(myPokemon.getName() + " fainted.")
            DATA.refresh()
            return
        }

        if (this.turn != 3 && this.health <= 0) {
            this.turn = 3
            const xpGained = this.level
            myPokemon.gainXp(xpGained)
            DATA.log(myPokemon.getName() + " defeated " + this.name + " for " + xpGained + " xp")
            DATA.refresh()
            return
        }

        // console.log(this)

        switch (this.turn) {

            case 0: { // prepare, show battle
                this.turn = 1
                DATA.log(`A wild ${this.name} appeared!`)
                break
            }

            case 1: { // my turn

                if (this.catching > 0) { // try catch
                    DATA.log(`You threw a pokeball...`)
                    if (this.catching == 100) {
                        MyAnim.alpha("#pokeballImg", 0, 1, 1)
                        MyAnim.moveFunction("#pokeballImg", (t) => { return { x: 400 * t, y: 296 * t * t - 494 * t - 1 } }, 20)
                            .then(() => MyAnim.alpha("#pokeballImg", 1, 1, 1)
                                .then(() => MyAnim.alpha("#pokeballImg", 0, 0, 1)
                                    .then(() => {
                                        $("#pokeballImg").css({ 'transform': `translate(0px, 0px)` })
                                        this.image = IMG_POKEBALL
                                        DATA.refresh()
                                    })
                                )
                            )
                        DATA.log(`Pokeball caught!`)
                        this.turn = 3
                        DATA.addPokemon(this.loadString)
                        DATA.refresh()
                        return;
                    } else {
                        const escapeRate = 1 + Math.max(0, 30 * this.health / this.maxHealth)
                        this.catching = Math.max(0, this.catching - escapeRate)
                        MyAnim.alpha("#pokeballImg", 0, 1, 1)
                        MyAnim.moveFunction("#pokeballImg", (t) => { return { x: 500 * t, y: 315 * t * t - 412 * t } }, 30)
                            .then(() => MyAnim.alpha("#pokeballImg", 1, 1, 1)
                                .then(() => MyAnim.alpha("#pokeballImg", 0, 0, 1)
                                    .then(() => $("#pokeballImg").css({ 'transform': `translate(0px, 0px)` }))
                                )
                            )
                        DATA.log(`Pokeball missed!`)
                    }
                }
                else { // otherwise attack
                    const moves = myPokemon.getMoves()
                    const move = moves[parseInt(Math.random() * moves.length, 10)]
                    const dmg = this.level * move.power * .1
                    this.health -= dmg
                    DATA.log(`${myPokemon.getName()} used ${move.name}!`)
                    DATA.log(`It inflicted ${dmg} dmg to ${this.name}`)
                    MyAnim.moveStraight("#myPokemonImg", 20, -20, 6)
                        .then(() => MyAnim.moveStraight("#myPokemonImg", -20, 20, 6)
                            .then(() => MyAnim.alpha("#otherPokemonImg", 1, 0, 20)
                                .then(() => MyAnim.alpha("#otherPokemonImg", 0, 1, 20)
                                )
                            )
                        )
                }
                this.turn = 2
                break
            }

            case 2: { // his turn
                const move = this.moves[parseInt(Math.random() * this.moves.length, 10)]
                const dmg = this.level * move.power * .1 * .5
                myPokemon.health -= dmg
                DATA.log(`${this.name} used ${move.name}!`)
                DATA.log(`It inflicted ${dmg} dmg to ${myPokemon.getName()}`)
                this.turn = 1

                MyAnim.moveStraight("#otherPokemonImg", -20, 20, 6)
                    .then(() => MyAnim.moveStraight("#otherPokemonImg", 20, -20, 6)
                        .then(
                            () => MyAnim.alpha("#myPokemonImg", 1, 0, 20).then(
                                () => MyAnim.alpha("#myPokemonImg", 0, 1, 20)
                            )
                        )
                    )

                break
            }

            case 3: {
                DATA.currentBattle = null
                break
            }

        }

        DATA.refresh()

    }

}

async function createBattle(region) {

    const encounters = region.loaded.encounters

    let total = 0
    let probs = []
    encounters.forEach(encounter => {
        probs.push(encounter.maxChance)
        total += encounter.maxChance
    })

    const chosenEncounter = randomWeighted(encounters, probs, total)
    console.log(chosenEncounter)

    const level = chosenEncounter.details[parseInt(Math.random() * chosenEncounter.details.length, 10)].max_level

    const pokemon = new Pokemon(chosenEncounter.pokemon.name, level)
    await pokemon.load()

    const moves = pokemon.getMoves().map(x => {
        return {
            name: x.names.find(x => x.language.name == 'en').name,
            power: x.power, pp: x.pp, type: x.type.name
        }
    })

    if (DATA.canBattle())
        return new Battle(pokemon.loadString, pokemon.getName(), pokemon.health, pokemon.level, pokemon.getImageSrc(), moves)
}

class Data {

    name = CACHE_NAME
    pokemons = []
    currentRegion = 0
    gymSlots = 10
    seenPokemon = []
    finishedQuests = []
    isSearching = false
    ticks = 0
    currentBattle = null

    //settings 
    alwaysShowPercentage = false

    async startClock() {
        this.clock = setInterval(() => {
            this.ticks++
            if (this.repaint) this.repaint()
            this.pokemons.forEach(pokemon => pokemon.step(this.ticks));

            if (this.isSearching && this.getLiveParty().length == 0)
                this.isSearching = false

            if (Math.random() < .005)
                if (this.canBattle()) {
                    createBattle(this.getCurrentRegion()).then(battle => {
                        this.currentBattle = battle
                        DATA.refresh()
                    })
                }

            if (this.ticks % 150 == 0) {
                if (this.currentBattle) {
                    this.currentBattle.step()
                }
            }

            if (this.ticks % 1000 == 0) {
                DATA.write()
            }
        }, 1000 / 60)
    }

    async unwrite() {
        localStorage.setItem(this.name, "");
    }

    async write() {
        const dataToSave = JSON.parse(JSON.stringify(this));
        dataToSave.pokemons.forEach(pokemon => {
            delete pokemon.loaded
        });
        localStorage.setItem(this.name, JSON.stringify(dataToSave));
        console.log(`Data Saved. nr of pokemons: ${dataToSave.pokemons.length}`)
    }

    async read() {

        try {
            console.log("Loading player data...")
            const loadedData = JSON.parse(localStorage.getItem(this.name))
            if (loadedData) {
                console.log("Loading pokemons...")
                this.pokemons = loadedData.pokemons.map(loadedPokemon => new Pokemon(loadedPokemon))
                await Promise.all(this.pokemons.map(pokemon => pokemon.load()))
                console.log("Loading other data...")
                Object.keys(loadedData).forEach(key => {
                    if (key != 'pokemons' && key != 'clock')
                        this[key] = loadedData[key]
                })
                if (loadedData.currentBattle) {
                    this.currentBattle = new Battle(loadedData.currentBattle)
                    console.log("Loaded current battle:")
                    console.log(this.currentBattle);
                }
                return
            }
        } catch (e) {
            console.log('Unable to load player data.')
            console.log(e)
        }

        console.log('No player data loaded.');
        this.write()
        console.log('New player data created.');

    }

    async addPokemon(loadString) {
        let pokemon = new Pokemon(loadString)
        await pokemon.load()
        // TODO if (this.getParty().length == 6)
        // pokemon.isInBox = true
        this.pokemons.push(pokemon)
        this.refresh()
    }

    getParty() {
        return this.pokemons.filter(pokemon => (!pokemon.isInGym && !pokemon.isInBox))
    }

    getLiveParty() {
        return this.pokemons.filter(pokemon => (!pokemon.isInGym && !pokemon.isInBox && pokemon.health > 0))
    }

    getPokemonsInGym() {
        return this.pokemons.filter(pokemon => pokemon.isInGym)
    }

    getPokemonsInBox() {
        return this.pokemons.filter(pokemon => pokemon.isInBox)
    }

    canEnterRegion(region) {
        if (!region.minLevel)
            return true
        const party = this.getParty()
        if (party.length == 0)
            return false
        for (let i = 0; i < party.length; i++) {
            if (party[i].level < region.minLevel)
                return false
        }
        return true
    }

    setCurrentRegion(region) {
        this.isSearching = REGIONS.indexOf(region) != this.currentRegion ? false : this.isSearching
        this.currentRegion = REGIONS.indexOf(region)
    }

    getCurrentRegion() {
        return REGIONS[this.currentRegion]
    }

    releasePokemon(pokemon) {
        this.pokemons.splice(this.pokemons.indexOf(pokemon), 1)
    }

    refresh() {
        console.log("Nothing to refresh.")
    }

    finishQuest(id) {
        this.finishedQuests.push(id)
    }

    isQuestFinished(id) {
        return this.finishedQuests.includes(id)
    }

    canBattle() {
        return this.getLiveParty().length > 0 &&
            this.isSearching &&
            !this.currentBattle &&
            this.getCurrentRegion()
    }

    getPokemonInBattle() {
        return DATA.getParty().filter(x => x.health > 0)[0]
    }

    logData = []

    scrollToBottomOfLog() {
        var objDiv = document.getElementById("log");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }

    log(str) {
        this.logData.push(str)
        if (this.logData.length > 100)
            this.logData.splice(0, this.logData.length - 100)
        this.updateInfoLog(this.logData)
        this.scrollToBottomOfLog()
        if (DEBUG)
            console.log("LOG: " + str)
    }

    updateInfoLog() { }
}