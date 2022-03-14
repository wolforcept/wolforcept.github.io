class Region {

    x
    y
    w
    h
    name
    quests

    loaded

    constructor(x, y, w, h, name, quests = []) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.name = name
        this.quests = quests
    }

    async load() {
        console.log("Loading location data from loadstring: \"" + this.name + "\" ")
        const location = await (await CACHE.fetch('https://pokeapi.co/api/v2/location/' + this.name)).json()
        const areas = await Promise.all(
            location.areas.map((_area) =>
                (
                    async function () {
                        const area = await (await CACHE.fetch(_area.url)).json()
                        delete area.game_indices
                        return area
                    }
                )()
            )
        )
        let encounters = []
        areas.forEach(area => {
            area.pokemon_encounters.forEach(encounter => {
                encounters.push(encounter)
            })
        })
        encounters = await Promise.all(
            encounters.map((_enc) =>
                (
                    async function () {
                        const pokemon = await (await CACHE.fetch(_enc.pokemon.url)).json()
                        delete pokemon.abilities
                        delete pokemon.game_indices
                        delete pokemon.moves
                        const species = await (await CACHE.fetch(pokemon.species.url)).json()
                        return { ..._enc, pokemon: { ...pokemon, species } }
                    }
                )()
            )
        )
        this.loaded = { location, areas, encounters }
    }

    getTitle() {
        if (!this.loaded) return null
        return this.loaded.location.names.find(x => x.language.name == 'en').name
    }

    getEncounters() {
        if (!this.loaded) return []
        return this.loaded.encounters
    }

    getQuests() {
        return this.quests.filter(q => !DATA.isQuestFinished(q.id))
    }
}