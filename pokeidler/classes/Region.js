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
                        details.forEach(det => det.min_level *= 2)
                        details.forEach(det => det.max_level *= 2)
                        return { ..._enc, maxChance, details, pokemon: { ...pokemon, species } }
                    }
                )()
            )
        )

        const lvls = encounters.map(enc => enc.details.map(det => det.min_level)).flat()
        this.minLevel = 2 * Math.min(this.minLevel, parseInt(arraySum(lvls) / lvls.length) - 2)

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


const quest_starting_pokemon = new (function () {

    this.id = "quest_starting_pokemon"
    this.title = "Starting Pokemon"
    this.message = "Choose a starting pokemon"

    const choice = async (loadString) => {
        const newPokemon = new Pokemon(loadString, 5)
        await newPokemon.load()
        DATA.addPokemon(newPokemon)
        DATA.finishQuest(this.id)
        DATA.refresh()
    }

    this.content = () => {

        return (<div>
            <div className="d-flex align-items-start">
                <div className="col" style={{ padding: 0, width: 192, maxWidth: 192 }}>
                    <PokemonChoiceButton id="1" onClick={() => choice("bulbasaur")} />
                </div>
                <div className="col" style={{ padding: 0, width: 192, maxWidth: 192 }}>
                    <PokemonChoiceButton id="4" onClick={() => choice("charmander")} />
                </div>
            </div>
            <div className="d-flex align-items-start">
                <div className="col" style={{ padding: 0, width: 192, maxWidth: 192 }}>
                    <PokemonChoiceButton id="7" onClick={() => choice("squirtle")} />
                </div>
                <div className="col" style={{ padding: 0, width: 192, maxWidth: 192 }}>
                    <PokemonChoiceButton id="25" onClick={() => choice("pikachu")} />
                </div>
            </div>
        </div>)
    }
})();

const REGIONS = [
    // kanto
    new Region(1816, 1660, 32, 32, "pallet-town", 0, [null], [quest_starting_pokemon]),
    new Region(1816, 1600, 32, 55, "kanto-route-1", 5, []),
    new Region(1816, 1565, 32, 32, "viridian-city", 10, [null]),
    new Region(1816, 1514, 32, 48, "kanto-route-2", 15, []),
    new Region(1817, 1440, 32, 38, "kanto-route-2", 15, []),
    new Region(1818, 1482, 32, 32, "viridian-forest", 20, [null]),
    new Region(1816, 1403, 32, 32, "pewter-city", 25, [null]),
    new Region(1850, 1404, 158, 32, "kanto-route-3", 30, []),
    new Region(1976, 1372, 32, 32, "mt-moon", 35, []),
    new Region(2010, 1373, 93, 32, "kanto-route-4", 40, []),
    new Region(2104, 1340, 64, 64, "cerulean-city", 45, [null]),
    new Region(2169, 1404, 32, 64, "kanto-route-5", 50, []),
    new Region(2168, 1533, 32, 64, "kanto-route-6", 55, []),
    new Region(2168, 1596, 32, 32, "vermilion-city", 60, [null]),
    new Region(2082, 1499, 84, 32, "kanto-route-7", 65, []),
    new Region(2016, 1499, 64, 32, "celadon-city", 70, [null]),
    new Region(2233, 1501, 32, 32, "kanto-route-8", 75, []),
    new Region(2168, 1470, 64, 64, "saffron-city", 100, [null]),
    new Region(2264, 1500, 33, 32, "lavender-town", 100, [null]),
    new Region(2072, 1724, 32, 32, "fuchsia-city", 100, [null]),
    new Region(1816, 1788, 32, 32, "cinnabar-island", 100, [null]),
    new Region(2264, 1404, 32, 32, "rock-tunnel", 100, []),
    new Region(2212, 1374, 84, 32, "kanto-route-9", 100, []),
    new Region(2264, 1439, 32, 64, "kanto-route-10", 100, []),
    new Region(2202, 1596, 66, 32, "kanto-route-11", 100, []),
    new Region(2264, 1534, 32, 160, "kanto-route-12", 100, []),
    new Region(2234, 1692, 64, 32, "kanto-route-13", 100, []),
    new Region(2200, 1694, 32, 64, "kanto-route-14", 100, []),
    new Region(2104, 1724, 94, 32, "kanto-route-15", 100, []),
    new Region(1911, 1499, 105, 32, "kanto-route-16", 100, []),
    new Region(1911, 1532, 33, 224, "kanto-route-17", 100, []),
    new Region(1942, 1724, 128, 32, "kanto-route-18", 100, []),
    new Region(2072, 1758, 32, 64, "kanto-sea-route-19", 100, []),
    new Region(1848, 1789, 224, 32, "kanto-sea-route-20", 100, []),
    new Region(1814, 1692, 32, 94, "kanto-sea-route-21", 100, []),
    new Region(1868, 1456, 32, 32, "digletts-cave", 100, []),
    // new Region(, "kanto-route-23",100, []),
    new Region(2137, 1309, 32, 32, "kanto-route-24", 100, []),
    new Region(2172, 1309, 32, 32, "kanto-route-25", 100, []),
    // new Region(0, 0, 0, 0, "",5),
    new Region(1750, 1565, 64, 32, "kanto-route-22", 100, []),
    new Region(2309, 1373, 32, 32, "power-plant", 100, []),
    new Region(2104, 1691, 33, 32, "kanto-safari-zone", 100, []),
    new Region(1752, 1405, 32, 78, "kanto-victory-road-2", 100, []),
    new Region(1753, 1482, 32, 85, "kanto-victory-road-1", 100, []),
    new Region(1752, 1372, 32, 32, "indigo-plateau", 100, []),
    new Region(1848, 1756, 32, 32, "pokemon-mansion", 100, []),
    new Region(2296, 1500, 32, 32, "pokemon-tower", 100, []),
    new Region(2128, 1596, 32, 32, "ss-anne", 100, []),
    new Region(1945, 1821, 30, 31, "seafoam-islands", 100, []),

    // johto
    new Region(1272, 1404, 64, 64, "ecruteak-city", 100, []),
]
