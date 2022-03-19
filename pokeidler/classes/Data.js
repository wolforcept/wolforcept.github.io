class Battle {

    name
    health
    maxHealth
    level
    image

    myTurn = false

    constructor(name, health, level, image) {
        if (name.name) {
            // load  battle from another battle
            this.name = name.name
            this.health = name.health
            this.maxHealth = name.health
            this.level = name.level
            this.image = name.image
        } else {
            this.name = name
            this.health = health
            this.maxHealth = health
            this.level = level
            this.image = image
        }
        if (!DATA.seenPokemon.includes(name))
            DATA.seenPokemon.push(name)
    }

    getMyPokemon() {
        return DATA.getParty().filter(x => x.health > 0)[0]
    }

    step() {

        const myPokemon = this.getMyPokemon()

        if (this.myTurn) {
            this.health--
        } else {
            myPokemon.health--
        }

        if (myPokemon.health <= 0) {
            DATA.currentBattle = null
        }

        if (this.health <= 0) {
            DATA.currentBattle = null
            myPokemon.gainXp(this.level)
            DATA.update()
        }

        this.myTurn = !this.myTurn
    }

}

async function createBattle(region) {
    console.log(region)

    const encounters = region.loaded.encounters

    let total = 0
    let probs = []
    encounters.forEach(encounter => {
        const maxmaxChance = arrayMax(encounter.version_details, vd => vd.max_chance)
        probs.push(maxmaxChance)
        total += maxmaxChance
    })

    const chosenEncounter = randomWeighted(encounters, probs, total)
    console.log(chosenEncounter)

    const pokemon = new Pokemon(chosenEncounter.pokemon.name)
    await pokemon.load()
    if (DATA.canBattle())
        return new Battle(pokemon.getName(), pokemon.health, pokemon.level, pokemon.getImageSrc())
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
            this.pokemons.forEach(pokemon => pokemon.step());

            if (this.isSearching && this.getLiveParty().length == 0)
                this.isSearching = false

            if (Math.random() < .005)
                if (this.canBattle()) {
                    createBattle(REGIONS[this.currentRegion]).then(battle => this.currentBattle = battle)
                }

            if (this.ticks % 100 == 0) {
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
                if (loadedData.currentBattle)
                    this.currentBattle = new Battle(this.currentBattle)
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

    async addPokemon(loadstring) {
        let pokemon = new Pokemon(loadstring)
        await pokemon.load()
        if (this.getParty().length == 6)
            pokemon.isInBox = true
        this.pokemons.push(pokemon)
        this.update()
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

    releasePokemon(pokemon) {
        this.pokemons.splice(this.pokemons.indexOf(pokemon), 1)
    }

    update() {
        console.log("Nothing to update.")
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
            REGIONS[this.currentRegion]
    }

}