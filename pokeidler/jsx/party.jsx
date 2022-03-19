
const PokemonView = ({ pokemon, i, heldPokemon, swapHeldPokemon, setModal, setAlertMessage }) => {

    const [tab, setTab] = React.useState(1)
    const [hovered, setHovered] = React.useState(false)
    const setCurrTab = (i) => (e) => { setTab(i); e.preventDefault() }

    function rename(e) {
        setModal({
            title: <><img src={IMG_RENAME} />&nbsp;Rename Pokemon</>,
            message: "Choose a new name for your pokemon",
            saveText: "Save",
            initialPayload: pokemon.name,
            content: ({ payload, setPayload }) => {
                const searchInput = React.useRef(null)
                React.useEffect(() => {
                    searchInput.current.focus();
                }, [])
                return <input ref={searchInput} className="form-control mr-sm-2" type="search" placeholder="New Name" aria-label="Name" onChange={e => setPayload(e.target.value.substring(0, 10))} value={payload} ></input>
            },
            save: (payload) => { if (payload) { pokemon.name = payload }; setModal(null) },
            close: (payload) => setModal(null)
        })
    }

    function release(e) {
        setModal({
            title: <><img src={IMG_RELEASE} />&nbsp;Release Pokemon</>,
            message: "Are you sure you want to release your pokemon?",
            saveText: "Yes",
            initialPayload: null,
            save: () => { DATA.releasePokemon(pokemon); setModal(null) },
            close: () => setModal(null)
        })
    }

    function sendToGym(e) {
        let n = DATA.getPokemonsInGym().length
        let slots = DATA.gymSlots
        if (pokemon.isInGym) {
            pokemon.isInGym = false
            DATA.update()
        } else {
            if (n < slots) {
                pokemon.isInGym = true
                DATA.update()
            } else {
                setAlertMessage(`Gym is already full! ${n}/${slots}`)
            }
        }
    }

    if (!pokemon.loaded)
        return <div className="card mb-4 PokemonView" style={{ color: "black", color: "black" }}>Loading...</div>
    return <>
        <div className="PokemonView card mb-4">
            {hovered
                ? <img className="card-img-top img-fluid"
                    src={pokemon.getImageSrc(true)} alt={pokemon.name}
                    width="192px" height="192px"
                    onMouseOut={() => setHovered(false)}
                    onMouseDown={(e) => { swapHeldPokemon(e, i, heldPokemon); e.preventDefault }}
                    onMouseUp={(e) => swapHeldPokemon(e, i, true)}
                    onDragStart={(e) => { e.preventDefault(); return false }} />
                : <img className="card-img-top img-fluid"
                    src={pokemon.getImageSrc()} alt={pokemon.getTitle()}
                    width="192px" height="192px"
                    onMouseOver={() => setHovered(true)} />
            }
            <div className="card-body">
                <h4 className="card-title">{pokemon.getTitle()}</h4>
                <h5 className="card-title">{'Level: ' + pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;{pokemon.isInGym ? " (in Gym)" : ""}</h5>
                <div style={{ height: "80px" }}>
                    { /* pokemon.species.flavor_text_entries.map((entry) => <span>{entry.flavor_text}</span>) */}
                    {tab == 1 &&
                        <p className="card-text">
                            <PokemonBarsView pokemon={pokemon} />
                        </p>
                    }
                    {tab == 2 &&
                        <div className="card-text scroller" style={{ height: "80px", overflowY: "scroll" }} >
                            {pokemon.getMoves().map(move => {
                                const stats = pokemon.getMoveStats(move)
                                return <div style={{ margin: 0, padding: 0, color: "#000", fontSize: 20 }}>{`${stats.name} (${stats.mastery}%)`}</div>
                            }
                            )}
                        </div>
                    }
                    {tab == 3 &&
                        <p className="card-text">
                            {pokemon.getFlavorText()}
                        </p>
                    }
                </div>
                <a className="btn btn-primary tab" onClick={setCurrTab(1)}>Stats</a>
                <a className="btn btn-primary tab" onClick={setCurrTab(2)}>Moves</a>
                <a className="btn btn-primary tab" onClick={setCurrTab(3)}>Descr</a>
                <DropdownButton text="opts" options={[
                    { text: pokemon.isInGym ? "Remove to Gym" : "Send to Gym", onClick: sendToGym },
                    { text: "Rename", onClick: rename },
                    { text: "Release", onClick: release },
                ]} />
            </div>
        </div>
    </>
}

const TeamView = ({ party, setAlertMessage }) => {

    const [heldPokemon, setHeldPokemon] = React.useState(null)
    const [modal, setModal] = React.useState(null)

    function swapHeldPokemon(e, i, swap) {
        if (swap) {
            if (heldPokemon) {
                let temp = party[i]
                party[i] = party[heldPokemon.i]
                party[heldPokemon.i] = temp
                clearHelpPokemon()
            }
        } else {
            setHeldPokemon({ i, imgSrc: party[i].getImageSrc() })
            setTimeout(() => {
                $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
                $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
                $('#HeldPokemon').css("z-index", "10")
            }, 0)
        }
    }

    function clearHelpPokemon() {
        setHeldPokemon(null)
        $('#HeldPokemon').css("left", "-1000px")
        $('#HeldPokemon').css("top", "-1000px")
    }

    function onMouseMove(e) {
        if (e && heldPokemon) {
            $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
            $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
            $('#HeldPokemon').css("z-index", "10")
        }
    }

    // ACTUAL TEAM VIEW COMPONENT
    return (<div className="TeamView" onMouseMove={onMouseMove} onMouseUp={clearHelpPokemon}>
        {modal && <ModalView modal={modal} />}
        <div className="container">
            <div className="card-deck"> {
                <>
                    {heldPokemon && <img id="HeldPokemon" src={heldPokemon.imgSrc} width={192} height={192} />}
                    {party && party.map((pokemon, i) =>
                        <PokemonView pokemon={pokemon} i={i} heldPokemon={heldPokemon} swapHeldPokemon={swapHeldPokemon} setModal={setModal} setAlertMessage={setAlertMessage} />)}
                </>
            }</div>
        </div>
    </div >)
}