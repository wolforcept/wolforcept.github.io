async function init() {
    console.log("Starting load")
    await CACHE.init()
    IMGS[IMG_MAP] = await loadImage(IMG_MAP)
    IMGS[IMG_PLAYER] = await loadImage(IMG_PLAYER)
    IMGS["IMG_PLAYER_MOVING_1"] = await loadImage(IMG_PLAYER_MOVING_1)
    IMGS["IMG_PLAYER_MOVING_2"] = await loadImage(IMG_PLAYER_MOVING_2)
    IMGS["IMG_PLAYER_MOVING_3"] = await loadImage(IMG_PLAYER_MOVING_3)
    IMGS["IMG_PLAYER_MOVING_4"] = await loadImage(IMG_PLAYER_MOVING_4)
    await Promise.all(REGIONS.map(r => r.load()))
    await Type.loadAll()
    await DATA.read()
    DATA.startClock()
    console.log("Loading done.")
    return true
}

var DEBUG = true
var CACHE_NAME = "pokeidler"
var CACHE = {}
CACHE.fetch = async (request) => {
    if (!CACHE.cache) {
        return fetch(request)
    }
    //return await CACHE.cache.add(request)
    return fetch(request)
}
CACHE.init = async () => {
    if ('caches' in window) {
        console.log("Opening cache…")
        const cache = await caches.open(CACHE_NAME)
        CACHE.cache = cache
        console.log("Opened cache successfully.")
    }
    console.log("WARNING: caching not supported!!")
}

if (!DEBUG)
    document.addEventListener('contextmenu', event => event.preventDefault());

const IMGS = []
const IMG_MAP = "assets/map.png"
const IMG_MENU = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/card-key.png"
const IMG_PLAYER = "assets/player.png"
const IMG_PLAYER_MOVING_1 = "assets/player_moving_1.png"
const IMG_PLAYER_MOVING_2 = "assets/player_moving_2.png"
const IMG_PLAYER_MOVING_3 = "assets/player_moving_3.png"
const IMG_PLAYER_MOVING_4 = "assets/player_moving_4.png"
const IMG_LOGO = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
const IMG_RENAME = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/key-to-room-1.png"
const IMG_RELEASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/destiny-knot.png"

const PAGES = [
    { name: "map", title: "Map", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png" },
    { name: "party", title: "Party", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png", canBeVisible: () => DATA.pokemons.length > 0 },
    { name: "gym", title: "Gym", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucky-punch.png", canBeVisible: () => DATA.getPokemonsInGym().length > 0 },
    { name: "allsprites", title: "All Sprites", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ghost-memory.png", canBeVisible: () => DEBUG },
    { name: "info", title: "Info", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scanner.png" },
]

const quest_starting_pokemon = new (function () {

    this.id = "quest_starting_pokemon"
    this.title = "Starting Pokemon"
    this.message = "Choose a starting pokemon"

    const choice = async (name) => {
        const newPokemon = new Pokemon(name)
        newPokemon.levelUp()
        newPokemon.levelUp()
        newPokemon.levelUp()
        newPokemon.levelUp()
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
    new Region(1816, 1490, 32, 72, "kanto-route-2", 15, []),
    new Region(1816, 1438, 32, 49, "viridian-forest", 20, [null]),
    new Region(1816, 1403, 32, 32, "pewter-city", 25, [null]),
    new Region(1850, 1405, 157, 32, "kanto-route-3", 30, []),
    new Region(1976, 1372, 32, 32, "mt-moon", 35, []),
    new Region(2010, 1373, 93, 32, "kanto-route-4", 40, []),
    new Region(2104, 1340, 64, 64, "cerulean-city", 45, [null]),
    new Region(2169, 1404, 32, 64, "kanto-route-5", 50, []),
    new Region(2168, 1533, 32, 64, "kanto-route-6", 55, []),
    new Region(2168, 1596, 32, 32, "vermilion-city", 60, [null]),
    new Region(2082, 1499, 84, 32, "kanto-route-7", 65, []),
    new Region(2016, 1499, 64, 32, "celadon-city", 70, [null]),
    new Region(2233, 1501, 32, 32, "kanto-route-8", 75, []),

    new Region(2168, 1469, 64, 64, "saffron-city", 5, [null]),
    new Region(2264, 1500, 33, 32, "lavender-town", 5, [null]),
    new Region(2072, 1723, 32, 32, "fuchsia-city", 5, [null]),
    new Region(1816, 1787, 32, 32, "cinnabar-island", 5, [null]),
    new Region(2264, 1405, 32, 32, "rock-tunnel", 5, []),
    new Region(2212, 1373, 84, 32, "kanto-route-9", 5, []),
    new Region(2264, 1437, 32, 64, "kanto-route-10", 5, []),
    new Region(2201, 1597, 66, 32, "kanto-route-11", 5, []),
    // new Region(, "kanto-route-12",5, []),
    // new Region(, "kanto-route-13",5, []),
    // new Region(, "kanto-route-14",5, []),
    // new Region(, "kanto-route-15",5, []),
    // new Region(, "kanto-route-16",5, []),
    // new Region(, "kanto-route-17",5, []),
    // new Region(, "kanto-route-18",5, []),
    // new Region(, "kanto-route-19",5, []),
    // new Region(, "kanto-route-20",5, []),
    // new Region(, "kanto-route-21",5, []),
    // new Region(, "kanto-route-22",5, []),
    // new Region(, "kanto-route-23",5, []),
    new Region(2137, 1309, 32, 32, "kanto-route-24", 5, []),
    new Region(2172, 1309, 59, 31, "kanto-route-25", 5, []),
    // new Region(0, 0, 0, 0, "",5),
    new Region(1787, 1565, 25, 30, "kanto-route-22", 5, []),
    // johto
    new Region(1272, 1404, 64, 64, "ecruteak-city", 5, []),
]

var DATA = new Data()

const App = () => {

    const contentRef = React.useRef(null)
    const [refresher, setRefresher] = React.useState(0)
    const [sidebarActive, setSidebarActive] = React.useState(true)
    const [selectedPage, setSelectedPage] = React.useState(PAGES[0])
    const [searchValue, setSearchValue] = React.useState("")
    const [alertMessage, setAlertMessage] = React.useState(null)

    DATA.refresh = () => { setRefresher(refresher + 1) }
    const data = DATA

    async function addToParty(e) {
        if (!DEBUG) return
        e.preventDefault()
        try {
            await DATA.addPokemon(searchValue.toLowerCase())
            DATA.refresh()
        } catch (e) {
            setAlertMessage(`Could not find pokemon "${searchValue}"`);
            console.log(e)
        }
    }
    const isVertical = window.matchMedia("screen and (max-width: 800px) and (orientation: portrait)").matches

    return (<div className="App">

        {<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />}

        <button type="button" id="sidebarButton" className={!sidebarActive ? "buttonOn" : "buttonOff"}
            style={{ marginLeft: sidebarActive ? "100px !important" : "0" }}
            onClick={() => setSidebarActive(!sidebarActive)}>
            <img width="60px" src={IMG_MENU} />
        </button>

        {(sidebarActive || isVertical) &&
            <nav id="sidebar" class={"bg-dark" + (sidebarActive ? "sidebarActive" : "")}>
                <div className="logo">
                    <img width="60px" src={IMG_LOGO} /> Pokemon Idler<img width="60px" src={IMG_LOGO} />
                </div>
                <ul className="list-unstyled components">
                    {PAGES
                        .filter(x => !x.canBeVisible || x.canBeVisible())
                        .map((thisPage) => {
                            return < li className={selectedPage.name == thisPage.name ? "active" : ""}
                                onClick={() => {
                                    setSelectedPage(thisPage)
                                    contentRef.current.scrollIntoView()
                                }}>
                                <a><img width="60px" src={thisPage.img} />{thisPage.title}</a>
                            </li>
                        }
                        )}
                </ul>
                {DEBUG &&
                    <div style={{ padding: "0 0 0 10px" }} >
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchValue(e.target.value)} />
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={addToParty}>Add</button>
                        </form>
                    </div>
                }
            </nav>
        }


        <div id="appContent" className={sidebarActive ? " sidebarActive" : ""}>

            <div class="container-fluid">
                <div class="row min-vh-100">
                    <div class="col-12">
                        <div class="d-flex flex-column h-100">
                            <div ref={contentRef} class="row justify-content-center">
                                <h1>{selectedPage.title}</h1>
                            </div>
                            <div class="row justify-content-center bg-blue flex-grow-1">
                                {selectedPage.name == "party" &&
                                    <TeamView party={data.getParty()} setAlertMessage={setAlertMessage} />}

                                {selectedPage.name == "gym" &&
                                    <GymView pokemonsInGym={data.getPokemonsInGym()} gymSlots={DATA.gymSlots} />}

                                {selectedPage.name == "box" &&
                                    <TeamView party={data.getPokemonsInBox()} setAlertMessage={setAlertMessage} />}

                                {selectedPage.name == "map" &&
                                    <MapView regions={data.regions} setAlertMessage={setAlertMessage} />}

                                {selectedPage.name == "allsprites" && DEBUG &&
                                    <AllSpritesView />}

                                {selectedPage.name == "info" &&
                                    <InfoTab />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div >)
}

