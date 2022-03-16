class Data {

    name = CACHE_NAME
    team = []
    regions = []
    gymSlots = 10
    seenPokemon = []
    finishedQuests = []
    isSearching = false

    clock = setInterval(() => {
        this.team.forEach(pokemon => pokemon.step());
    }, 1000)

    async unwrite() {
        localStorage.setItem(this.name, "");
    }

    async write() {
        const dataToSave = JSON.parse(JSON.stringify(this));
        dataToSave.team.forEach(pokemon => {
            delete pokemon.loaded
        });
        localStorage.setItem(this.name, JSON.stringify(dataToSave));
        console.log(`Data Saved. nr of pokemons: ${dataToSave.team.length}`)
    }

    async read() {

        try {
            console.log("Loading player data...")
            const loadedData = JSON.parse(localStorage.getItem(this.name))
            if (loadedData) {
                console.log("Loading pokemons...")
                this.team = loadedData.team.map(loadedPokemon => new Pokemon(loadedPokemon))
                await Promise.all(this.team.map(pokemon => pokemon.load()))
                console.log("Loading other data...")
                Object.keys(loadedData).forEach(key => {
                    if (key != 'team' && key != 'clock')
                        this[key] = loadedData[key]
                })
                return
            }
        } catch (e) {
            console.log('Unable to load player data.')
            console.log(e)
        }

        console.log('No player data loaded.');
        // this.team = [new Pokemon(25)]
        // await this.team[0].load()
        this.write()
        console.log('New player data created.');

    }

    async addToParty(loadstring) {
        let pokemon = new Pokemon(loadstring)
        await pokemon.load()
        this.team.push(pokemon)
    }

    releasePokemon(pokemon) {
        this.team.splice(this.team.indexOf(pokemon), 1)
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

}