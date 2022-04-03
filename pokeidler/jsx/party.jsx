const IMG_ = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/"
const IMG_STATS = IMG_ + "card-key.png"
const IMG_MOVES = IMG_ + "lucky-punch.png"
const IMG_ITEMS = IMG_ + "super-potion.png"
const IMG_OPTIONS = IMG_ + "town-map.png"

const PokemonView = ({ pokemon, i, heldPokemon, swapHeldPokemon, setModal, setAlertMessage, isBox }) => {

    const [tab, setTab] = React.useState(0)
    const [hovered, setHovered] = React.useState(false)
    const [updater, setUpdater] = React.useState(1)
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)
    const setCurrTab = (i) => (e) => { setTab(tab == i ? 0 : i); e.preventDefault() }

    const selectedItem = ITEMS[pokemon.items[selectedItemIndex]]

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
            save: () => { DATA.releasePokemon(pokemon); DATA.refresh(); setModal(null) },
            close: () => setModal(null)
        })
    }

    function sendTo() {
        if (isBox) {
            const possible = DATA.sendPokemonToParty(pokemon)
            if (!possible) {
                setAlertMessage("Party is full!")
            }
        } else {
            DATA.sendPokemonToBox(pokemon)
        }
        DATA.refresh()
    }

    function train() {
        pokemon.train()
        setUpdater(updater + 1)
    }

    if (!pokemon.loaded)
        return <div className="PokemonView" style={{ color: "black", color: "black" }}>Loading...</div>

    const currentMoveStats = pokemon.getCurrentMoveStats()

    return <>
        <div className={"PokemonView " + (tab == 0 ? "opened" : "closed")} >
            <div class="row min-vh-100">
                <div class="pokemon-main col">
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
                        <PokemonBarsView pokemon={pokemon} />
                    </div>
                </div>
                <div className="pokemon-secondary col" style={tab == 0 ? { display: "none" } : {}} >
                    {tab == 1 && <>
                        <h4 className="card-title">{'Details'}</h4>
                        <p className="card-text">
                            {pokemon.getFlavorText()}
                        </p>
                        <p className="card-text">
                            Evolves at Lv.100 into:<br />
                            <DropdownButton
                                style={{ width: "100%" }}
                                text={cap(pokemon.getEvolutionNames()[pokemon.chosenEvolution])}
                                options={
                                    pokemon.getEvolutionNames().map((e, i) => {
                                        return { text: e, onClick: () => { pokemon.chosenEvolution = i; DATA.refresh() } }
                                    })
                                }
                            />
                        </p>
                    </>}
                    {tab == 2 && <>
                        <h4 className="card-title">{'Moves'}</h4>
                        <HealthBarSlow
                            text="Energy" hoverText={`${pokemon.energy} / ${pokemon.getMaxEnergy()}`}
                            size={parseInt((10000 * pokemon.energy / pokemon.getMaxEnergy()), 10) / 100
                            }
                            frontColor="#e0a000" backColor="#856404"
                            style={{ height: 24, borderRadius: 100, fontSize: 24 }}
                        />
                        <DropdownButton
                            style={{ width: "100%" }}
                            text={currentMoveStats.name ? currentMoveStats.name + " (" + currentMoveStats.mastery + "%)" : "Basic Training"}
                            options={
                                [
                                    { text: "Basic Training", onClick: () => { pokemon.setCurrentMove(null); DATA.refresh() } },
                                    // ...(pokemon.level >= 100 ? [{ text: "Level Up", onClick: () => pokemon.setCurrentMove("levelup") }] : []),
                                    ...(
                                        pokemon.getMoves().map((move) => {
                                            const stats = pokemon.getMoveStats(move)
                                            return {
                                                text: stats.name + " (" + stats.mastery + "%)",
                                                onClick: () => { { pokemon.setCurrentMove(move.name); DATA.refresh() } }
                                            }
                                        })
                                    )]
                            }
                        />
                        <br />
                        <h5 className="card-title">Energy: {currentMoveStats.energy}</h5>
                        <h5 className="card-title">XP: {currentMoveStats.xp}</h5>
                        {isBox && <p>(In Box)</p>}
                        {DATA.currentBattle && !isBox && <p>(In Battle)</p>}
                        {!DATA.currentBattle && !isBox &&
                            <button href="#" className="btn btn-primary" onClick={train} style={{ width: "100%" }}
                            >Train</button>}
                    </>}
                    {tab == 3 && <>
                        <h4 className="card-title">{'Items'}</h4>
                        {pokemon.items.length == 0 && <p>No items</p>}
                        {pokemon.items.length > 0 &&
                            <DropdownButton
                                style={{ width: "100%" }}
                                text={<><img src={IMG_ + selectedItem.img} />{selectedItem.name}</>}
                                options={
                                    pokemon.items.map((item, i) => {
                                        return {
                                            text: <><img src={IMG_ + ITEMS[item].img} />{ITEMS[item].name}</>,
                                            onClick: () => { setSelectedItemIndex(i) }
                                        }
                                    })}
                            />}
                        {selectedItem && <>
                            <p>{selectedItem.description}</p>
                            <button href="#" className="btn btn-primary" style={{ width: "100%" }} onClick={() => {
                                pokemon.removeItem(selectedItemIndex)
                                setSelectedItemIndex(i - 1)
                                DATA.addItem(selectedItem.name)
                            }}>Remove</button><br />
                        </>}
                    </>}
                    {tab == 4 && <>
                        <h4 className="card-title">{'Actions'}</h4>
                        <button href="#" className="btn btn-primary" style={{ width: "100%" }} onClick={rename}>Rename Pokemon</button><br />
                        <button href="#" className="btn btn-primary" style={{ width: "100%" }} onClick={sendTo}>{isBox ? "Send to Party" : "Send to Box"}</button><br />
                        <button href="#" className="btn btn-primary" style={{ width: "100%" }} onClick={release}>Release Pokemon</button><br />
                    </>}
                </div>
            </div>
            <div className="pokemon-tabs" style={tab != 0 ? { left: 470 } : {}}>
                <a className={"pokemon-tab" + (tab == 1 ? " selected" : "")} onClick={setCurrTab(1)}><img src={IMG_STATS} /></a>
                <a className={"pokemon-tab" + (tab == 2 ? " selected" : "")} onClick={setCurrTab(2)}><img src={IMG_MOVES} /></a>
                <a className={"pokemon-tab" + (tab == 3 ? " selected" : "")} onClick={setCurrTab(3)}><img src={IMG_ITEMS} /></a>
                <a className={"pokemon-tab" + (tab == 4 ? " selected" : "")} onClick={setCurrTab(4)}><img src={IMG_OPTIONS} /></a>
            </div>
        </div>
    </>
}

const TeamView = ({ party, setAlertMessage, isBox }) => {

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
                        <PokemonView pokemon={pokemon} i={i} heldPokemon={heldPokemon} swapHeldPokemon={swapHeldPokemon} setModal={setModal} setAlertMessage={setAlertMessage} isBox={isBox} />)}
                </>
            }</div>
        </div>
    </div >)
}