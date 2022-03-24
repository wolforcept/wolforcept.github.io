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
    { name: "box", title: "Box", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/machine-part.png", canBeVisible: () => DATA.box.length > 0 && DATA.getCurrentRegion() && DATA.getCurrentRegion().gyms.length > 0 },
    { name: "gym", title: "Gym", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucky-punch.png", canBeVisible: () => DATA.getCurrentRegion() && DATA.getCurrentRegion().gyms.length > 0 },
    { name: "allsprites", title: "All Sprites", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ghost-memory.png", canBeVisible: () => DEBUG },
    { name: "info", title: "Info", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scanner.png" },
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

            <div class="container-fluid" about={refresher}>
                <div class="row min-vh-100">
                    <div class="col-12">
                        <div class="d-flex flex-column h-100">
                            <div ref={contentRef} class="row justify-content-center">
                                <h1>{selectedPage.title}</h1>
                            </div>
                            <div id="pageContent" class="row justify-content-center bg-blue flex-grow-1" style={isVertical ? {} : { maxHeight: `${window.innerHeight - 80 - 16}px` }}>
                                {selectedPage.name == "party" &&
                                    <TeamView party={data.getParty()} setAlertMessage={setAlertMessage} />}

                                {selectedPage.name == "gym" &&
                                    <GymView party={data.getParty()} />}

                                {selectedPage.name == "box" &&
                                    <TeamView party={data.getPokemonsInBox()} setAlertMessage={setAlertMessage} isBox={true} />}

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

