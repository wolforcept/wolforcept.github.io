class Data {

    name = CACHE_NAME
    team = []
    regions = []
    gymSlots = 10
    seen = []

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
            console.log("Loading data...")
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
                console.log("Loading done.")
                return
            }
        } catch (e) {
            console.log('Unable to load data.')
            console.log(e)
        }

        console.log('No data loaded.');
        this.team = [new Pokemon(25)]
        await this.team[0].load()
        this.write()
        console.log('New data created.');

    }

    releasePokemon(pokemon) {
        this.team.splice(this.team.indexOf(pokemon), 1)
    }

    update() {
        console.log("Nothing to update.")
    }

}