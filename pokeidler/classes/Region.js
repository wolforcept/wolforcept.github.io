class Region {

    x
    y
    w
    h
    name
    minLevel
    gyms
    quests

    loaded

    constructor(x, y, w, h, name, minLevel, gyms = [], quests = []) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.name = name
        this.minLevel = minLevel
        this.gyms = gyms
        this.quests = quests
    }

    async load() {
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
                        const details = arrayMax(_enc.version_details, vd => vd.max_chance).encounter_details
                        const maxChance = arrayMax(_enc.version_details, vd => vd.max_chance).max_chance
                        delete _enc.version_details
                        return { ..._enc, maxChance, details, pokemon: { ...pokemon, species } }
                    }
                )()
            )
        )

        encounters.sort((a, b) => b.maxChance - a.maxChance)
        if (DEBUG)
            console.log(this)
        this.loaded = { location, areas, encounters }
        console.log("Loaded location data from loadstring: \"" + this.name + "\" ")
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