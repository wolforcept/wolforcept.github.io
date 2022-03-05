const LOGO_IMG = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
const PAGES = [
    { name: "team", title: "Team", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" },
    { name: "map", title: "Map", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png" }]

//
// STATIC METHODS

async function createPokemon(pokemonString) {
    let pokemon = await (await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemonString)).json()
    let species = await (await fetch(pokemon.species.url)).json()
    pokemon.species = species
    pokemon.health = 80
    pokemon.energy = 50
    return pokemon
}

const Alert = ({ alertMessage, setAlertMessage }) => {
    return alertMessage && <div className="alert alert-dark alert-dismissible fade show" role="alert">
        {alertMessage}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage(null)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
}

const HealthBar = ({ text, size, frontColor, backColor, style }) => {
    return (<div className="HealthBar" style={{ "background-color": backColor, ...style }}>
        {size > 0 && <div className="bar" style={{ "background-color": frontColor, width: size + "%" }}>&nbsp;{text}</div>}
    </div>
    )
}

const TeamView = ({ team }) => {

    console.log(team)
    const [heldPokemon, setHeldPokemon] = React.useState(null)

    function swapHeldPokemon(e, i, swap) {
        if (swap) {
            if (heldPokemon) {
                let temp = team[i]
                team[i] = team[heldPokemon.i]
                team[heldPokemon.i] = temp
                setHeldPokemon(null)
                $('#HeldPokemon').css("left", "-1000px")
                $('#HeldPokemon').css("top", "-1000px")
            }
        } else {
            setHeldPokemon({ i, img: team[i].sprites.front_default })
            setTimeout(() => {
                $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
                $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
                $('#HeldPokemon').css("z-index", "10")
            }, 0)
        }
    }

    function onMouseMove(e) {
        if (e && heldPokemon) {
            $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
            $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
            $('#HeldPokemon').css("z-index", "10")
        }
    }

    return (<div className="TeamView" onMouseMove={onMouseMove}>
        {
            <div class="container">
                <div class="card-deck"> {
                    <>
                        {heldPokemon && <img id="HeldPokemon" src={heldPokemon.img} />}
                        {team.map((pokemon, i) => <PokemonView pokemon={pokemon} i={i} swapHeldPokemon={swapHeldPokemon}></PokemonView>)}
                    </>
                }</div>
            </div>
        }
    </div >)
}

const PokemonView = ({ pokemon, i, swapHeldPokemon, heldPokemon }) => {
    const [tab, setTab] = React.useState(1)
    const [hovered, setHovered] = React.useState(false)
    const setCurrTab = (i) => (e) => { setTab(i); e.preventDefault() }
    return <>
        <div className="card mb-4 PokemonView">
            {hovered && pokemon.sprites.back_default
                ? <img className="card-img-top img-fluid" alt={pokemon.name} src={pokemon.sprites.back_default}
                    onMouseOut={() => setHovered(false)}
                    onMouseDown={(e) => { swapHeldPokemon(e, i, false); e.preventDefault }}
                    onMouseUp={(e) => swapHeldPokemon(e, i, true)}
                    onDragStart={(e) => { e.preventDefault(); return false }} />
                : <img className="card-img-top img-fluid" alt={pokemon.name} src={pokemon.sprites.front_default}
                    onMouseOver={() => setHovered(true)} />
                // : <img className="card-img-top" alt={pokemon.name} src={`images/pokemon/${pad(pokemon.id, 3)}.png`} />
            }
            <div className="card-body">
                <h4 className="card-title">{`${cap(pokemon.name)} #${pokemon.id}`}</h4>
                <div style={{ height: "80px" }}>
                    { /* pokemon.species.flavor_text_entries.map((entry) => <span>{entry.flavor_text}</span>) */}
                    {tab == 1 && <p className="card-text">
                        <HealthBar text="Experience" size={pokemon.health} frontColor="#2253f5" backColor="#152457" style={{ margin: "0 0 8px 0" }} />
                        <HealthBar text="Health" size={pokemon.energy} frontColor="#0b7824" backColor="#0a4016" style={{ margin: "0 0 8px 0" }} />
                        <HealthBar text="Energy" size={pokemon.energy} frontColor="#e0a000" backColor="#856404" />
                    </p>}
                    {tab == 2 && <p className="card-text"> {firstThat(pokemon.species.flavor_text_entries, (t) => t.language.name == "en").flavor_text.replaceAll('', ' ')}</p>}
                </div>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(1)}>Stats</a>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(1)}>Items</a>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(2)}>Descr</a>
            </div>
        </div>
    </>
}

const App = () => {

    const [sidebarActive, setSidebarActive] = React.useState()
    const [page, setPage] = React.useState(PAGES[0])
    const [team, setTeam] = React.useState([])
    const [searchValue, setSearchValue] = React.useState("")
    const [alertMessage, setAlertMessage] = React.useState(null)

    //
    // APP METHODS

    function addToParty(e) {
        e.preventDefault()
        createPokemon(searchValue.toLowerCase()).then((pokemon) => {
            setTeam([...team, pokemon])
        }).catch((e) => { setAlertMessage(`Could not find pokemon "${searchValue}"`); console.log(e) })
    }

    // ON INIT
    React.useEffect(() => {
        createPokemon(25).then(
            p1 => createPokemon(3).then(
                p2 => createPokemon(6).then(
                    p3 => createPokemon(9).then(
                        p4 => createPokemon(151).then(
                            p5 => setTeam([...team, p1, p2, p3, p4, p5])
                        )
                    )
                )
            )
        )
    }, [])

    return (<div className="App">

        {<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />}

        <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={sidebarActive ? "active" : ""} >
                <div className="custom-menu">
                    <button type="button" id="sidebarCollapse" className="btn btn-primary" onClick={() => setSidebarActive(!sidebarActive)}></button>
                </div>
                <div className="img bg-wrap text-center py-4">
                    <div className="user-logo">
                        <h3><img src={LOGO_IMG} /> Pokemon Idler<img src={LOGO_IMG} /></h3>
                    </div>
                </div>
                <ul className="list-unstyled components mb-5">
                    {PAGES.map((page) =>
                        <li className={page == page.name ? "active" : ""} onClick={() => setPage(page)}>
                            <a><img src={page.img} />{page.title}</a>
                        </li>
                    )}
                </ul>
                <ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchValue(e.target.value)} />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={addToParty}>Search</button>
                    </form>
                </ul>
            </nav>

            <div id="content" className2="p-6 p-md-6 pt-6">
                {page.name == "team" && <TeamView team={team} />}
            </div>
        </div>
    </div>)
}