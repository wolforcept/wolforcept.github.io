
const IMG_POKEBALL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"

var mapMousePoll = false,
    mapMousePoll2 = false,
    mapPos = { x: -1695, y: -1265 },
    imgSize = { w: 999, h: 936 },
    canvasSize = { w: 640, h: 640 },
    mapZoom = 4,
    mapMoved = false

var mx = 0, my = 0
var ssmx = 0, ssmy = 0
var rmx = 0, rmy = 0

const MapView = ({ setAlertMessage }) => {

    // console.log("remaking map view")

    const isVertical = window.matchMedia("screen and (max-width: 800px) and (orientation: portrait)").matches
    const isSmallScreen = window.matchMedia("screen and (max-height: 800px)").matches

    if (isSmallScreen) {
        canvasSize = { w: 400, h: 400 }
    }

    if (isVertical) {
        var width = $("canvas").parent().width();
        canvasSize = { w: width, h: width }
    }

    const canvas = React.useRef(null);
    const [mapHoveredRegion, setMapHoveredRegion] = React.useState(null)
    const [currentRegion, _setCurrentRegion] = React.useState(DATA.getCurrentRegion())
    const setCurrentRegion = (region) => {
        if (region && (isSmallScreen || isVertical)) {
            mapPos.x = -region.x - currentRegion.w / 2 + canvasSize.w / 2 - 16
            mapPos.y = -region.y - currentRegion.h / 2 + canvasSize.h / 2 - 16
        }
        DATA.setCurrentRegion(region)
        _setCurrentRegion(region)
        DATA.refresh()
    }

    const questViews = currentRegion && currentRegion.getQuests()
        .map(quest => <QuestView quest={quest} />)

    const uniqueEncounters = []
    const encounterViews = currentRegion && currentRegion.getEncounters()
        // .filter(x => x.details.find(x => x.method.name == 'walk'))
        .filter(x => {
            if (!uniqueEncounters.includes(x.pokemon.name)) {
                uniqueEncounters.push(x.pokemon.name)
                return true
            }
            return false
        })
        .map(enc => <EncounterView encounter={enc} />)

    React.useEffect(() => {
        repaint()
    });

    const html = <div className="MapView" >
        {DATA.currentBattle && <BattleView currentBattle={DATA.currentBattle} isVertical={isVertical} />}
        <div className="MapHoverViewWrapper">
            {mapHoveredRegion && <MapHoverView region={mapHoveredRegion} />}
        </div>
        <div className="container-fluid">
            <div className="row cols-wrapper">

                <div className="col" style={{ maxWidth: canvasSize.w + 32 }} >
                    <h2>Current Location: {currentRegion.getTitle()}</h2>
                    <div style={{ minHeight: 48 }}>
                        {!DATA.isSearching && <button href="#" className="btn btn-primary"
                            onClick={() => {
                                if (encounterViews.length == 0) {
                                    setAlertMessage('No pokemons to find!')
                                    return
                                }
                                if (DATA.getLiveParty().length == 0) {
                                    setAlertMessage("No available Pokemon!")
                                    return
                                }
                                DATA.isSearching = true
                                DATA.refresh()
                            }}>Search for Pokemon</button>}
                        {DATA.isSearching && <button href="#" className="btn btn-primary"
                            onClick={() => { DATA.isSearching = false; DATA.refresh() }}>Stop searching</button>}
                        {<DropdownButton
                            style={{ width: 160 }}
                            text={"Walking"}
                            options={[
                                { text: "Walking", onClick: () => DATA.searchingMethod = 'walk' }
                            ]}
                        />}
                    </div>
                    <canvas ref={canvas} id="mapCanvas" width={canvasSize.w} height={canvasSize.h} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave} />

                </div>

                <div className="col">
                    <div id="right-panel" className="col-right-wrapper" >
                        <div className="card-deck">
                            {questViews.length > 0 && <h2>Quests:</h2>}
                            {questViews}
                            {encounterViews.length > 0 && <h2>Pokemon Encounters:</h2>}
                            {encounterViews}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    function onMouseDown(e) {
        e.preventDefault()

        if (e.button == 0) {
            mapMousePoll = true
            mapMoved = false
        }

        if (e.button == 2 && DEBUG) {
            mapMousePoll2 = true;
            [ssmx, ssmy] = (() => {
                let [a, b] = getMousePos(e)
                return [a - mapPos.x, b - mapPos.y]
            })()
        }
    }

    function onMouseUp(e) {
        e.preventDefault()

        if (e.button == 0) {
            mapMousePoll = false
            if (!mapMoved && mapHoveredRegion) {
                if (DATA.canEnterRegion(mapHoveredRegion))
                    setCurrentRegion(mapHoveredRegion)
                else
                    setAlertMessage("Cannot enter region. Minimum level: " + mapHoveredRegion.minLevel)
            }
        }

        if (e.button == 2 && DEBUG) {
            mapMousePoll2 = false;
            let [ss2mx, ss2my] = (() => {
                let [a, b] = getMousePos(e)
                return [a - mapPos.x, b - mapPos.y]
            })()

            console.log(`${parseInt(ssmx)}, ${parseInt(ssmy)}, ${parseInt(ss2mx - ssmx)}, ${parseInt(ss2my - ssmy)}`)
        }
    }

    function onMouseMove(e) {

        [mx, my] = getMousePos(e)
        let [mapMx, mapMy] = [mx - mapPos.x, my - mapPos.y]

        let hoveringRegion = false
        REGIONS.forEach(r => {
            if (mapMx > r.x && mapMy > r.y && mapMx < r.x + r.w && mapMy < r.y + r.h) {
                if (r != mapHoveredRegion) {
                    setMapHoveredRegion(r)
                }
                hoveringRegion = true
            }
        });

        if (!hoveringRegion)
            setMapHoveredRegion(null)

        if (mapMousePoll) {
            if (Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1)
                mapMoved = true
            mapPos.x = Math.min(0, Math.max(-imgSize.w * mapZoom + canvasSize.w, mapPos.x + e.movementX))
            mapPos.y = Math.min(0, Math.max(-imgSize.h * mapZoom + canvasSize.h, mapPos.y + e.movementY))
        }

        if (mapMousePoll2) {
        }

    }

    function onMouseLeave(e) {
        mx = -1; my = -1
        ssmx = -1; ssmy = -1
        rmx = -1; rmy = -1
        setMapHoveredRegion(null)
        mapMousePoll = false;
    }

    function repaint() {
        if (DEBUG)
            console.log("rendering canvas!")

        if (!canvas || !canvas.current) {
            return
        }

        if (currentRegion && (isSmallScreen || isVertical)) {
            mapPos.x = -currentRegion.x - currentRegion.w / 2 + canvasSize.w / 2 - 16
            mapPos.y = -currentRegion.y - currentRegion.h / 2 + canvasSize.h / 2 - 16
        }

        const canvasEle = canvas.current;
        const ctx = canvasEle.getContext("2d");
        ctx.imageSmoothingEnabled = false

        ctx.drawImage(
            IMGS[IMG_MAP],
            -mapPos.x / mapZoom, -mapPos.y / mapZoom,
            canvasSize.w / mapZoom, canvasSize.h / mapZoom,
            0, 0, canvasSize.w, canvasSize.h
        );

        if (mapHoveredRegion) {
            ctx.fillStyle = "#FFFFFF77";
            ctx.strokeStyle = "#FFFFFF77";
            ctx.lineWidth = 3;
            ctx.beginPath();
            const xx = mapHoveredRegion.x + mapPos.x, yy = mapHoveredRegion.y + mapPos.y
            ctx.rect(xx, yy, mapHoveredRegion.w, mapHoveredRegion.h);
            ctx.fill();
            ctx.stroke();
        }

        if (mapMousePoll2) {
            ctx.fillStyle = "#FFFFFF77";
            ctx.strokeStyle = "#FFFFFF77";
            ctx.lineWidth = 3;
            ctx.beginPath();
            const xx = ssmx + mapPos.x, yy = ssmy + mapPos.y
            ctx.rect(xx, yy, mx - xx, my - yy);
            ctx.fill();
            ctx.stroke();
        }

        if (DATA.isSearching) {
            ctx.drawImage(IMGS["IMG_PLAYER_MOVING_" + (1 + parseInt(DATA.ticks / 10, 10) % 4)],
                currentRegion.x + currentRegion.w / 2 - 16 + mapPos.x - 15,
                currentRegion.y + currentRegion.h / 2 - 16 + mapPos.y - 32, 64, 64);
        } else {
            ctx.drawImage(IMGS[IMG_PLAYER],
                currentRegion.x + currentRegion.w / 2 - 16 + mapPos.x - 15,
                currentRegion.y + currentRegion.h / 2 - 16 + mapPos.y - 32, 64, 64);
        }

    }

    DATA.repaint = repaint

    return html
}

const QuestView = ({ quest }) => {
    return (
        <div className="QuestView">
            <h3>{quest.title}</h3>
            <p>{quest.message}</p>
            {quest.content()}
        </div>
    )
}

const EncounterView = ({ encounter }) => {
    const seen = DATA.seenPokemon.includes(encounter.pokemon.name)
    return (
        <div className={"EncounterView card" + (seen ? "" : " sil")}>
            <img className={seen ? "" : " sil"} src={encounter.pokemon.sprites.front_default} width={192} />
            <p>{seen ? Pokemon.getNameFrom(encounter.pokemon) : "??????"}</p>
        </div >
    )
}

const MapHoverView = ({ region }) => {
    if (!region)
        return (
            <div className="MapHoverView" style={{ left: region.x + mapPos.x + 16, top: region.y + mapPos.y - 16 }}>
                {"Loading…"}
            </div >
        )

    const quests = region.getQuests()
    const unfinishedQuestsNr = quests.filter(x => !DATA.isQuestFinished(x.id)).length
    const encounters = region.getEncounters()
    const seenPokemonNr = encounters ? encounters.filter(enc => DATA.seenPokemon.includes(enc.pokemon.name)).length : 0
    const canvasPos = $("canvas").first().position()

    return (
        <div className="MapHoverView"
            style={{ left: region.x + mapPos.x + 16 + canvasPos.left, top: region.y + mapPos.y - 16 + canvasPos.top }}
        >
            <div className="header">{region.getTitle()}</div>
            <div className="content">
                Level: {region.minLevel}<br />
                {quests.length > 0 && <div>Quests: {unfinishedQuestsNr} / {quests.length}</div>}
                {encounters && <div>Seen Pokemon: {seenPokemonNr} / {encounters.length}</div>}
            </div>
        </div >
    )
}

const BattleView = ({ currentBattle, isVertical }) => {

    const myPokemon = currentBattle.getMyPokemon()
    if (!myPokemon) {
        DATA.currentBattle = null
        DATA.refresh()
        return <></>
    }

    const myHealthPercent = parseInt(10000 * myPokemon.health / myPokemon.maxHealth, 10) / 100
    const otherHealthPercent = parseInt(10000 * currentBattle.health / currentBattle.maxHealth, 10) / 100
    const xpPercent = parseInt(10000 * myPokemon.xp / myPokemon.maxXp, 10) / 100

    return <div className="BattleView">
        <div className="container">
            <h3>Wild Pokemon Battle!</h3>

            <div className="fightBox">
                <img id="pokeballImg" src={IMG_POKEBALL} style={{ opacity: 0, width: 30, height: 30, position: 'absolute', left: 0, bottom: 0 }} />

                <div className="myPokemon imgWrapper">
                    <img id="myPokemonImg" src={myPokemon.getImageSrc(true)} alt={myPokemon.name}
                        width="192px" height="192px" />
                </div>

                <div className="myPokemon pokemon col">
                    <h4><span>{myPokemon.getName()}</span><span className="level">Lv. {myPokemon.level}</span></h4>
                    <HealthBarSlow
                        text="Health" hoverText={`${myPokemon.health} / ${myPokemon.maxHealth}`}
                        size={myHealthPercent} frontColor="#0b7824" backColor="#0a4016"
                        style={{ margin: "0 0 8px 0" }}
                    />
                    <HealthBarSlow
                        text="Experience" hoverText={`${myPokemon.xp} / ${myPokemon.maxXp}`}
                        size={xpPercent} frontColor="#2253f5" backColor="#152457"
                        style={{ margin: "0 0 8px 0" }}
                    />
                </div>

                <div id="otherPokemonImg" className="otherPokemon imgWrapper">
                    <img src={currentBattle.image} alt={currentBattle.name}
                        width="192px" height="192px" />
                </div>

                <div className="otherPokemon pokemon col">

                    <h4><span>{currentBattle.name}</span><span className="level">Lv. {currentBattle.level}</span></h4>
                    <HealthBarSlow
                        text="Health" hoverText={`${currentBattle.health} / ${currentBattle.maxHealth}`}
                        size={otherHealthPercent} frontColor="#0b7824" backColor="#0a4016"
                        style={{ margin: "0 0 8px 0" }}
                    />
                    {currentBattle.catching > 0 &&
                        <HealthBarSlow
                            text="Catching..."
                            size={currentBattle.catching} frontColor="#c9140a" backColor="#40160a"
                            style={{ margin: "0 0 8px 0" }}
                        />}
                </div>
            </div>
            {isVertical ?
                <div className="buttons">
                    <div>
                        <button className="btn btn-primary" onClick={() => DATA.currentBattle.tryCatch()} >{currentBattle.catching > 0 ? `Catching ${parseInt(currentBattle.catching)}%` : `Throw Pokeball`}</button>
                        <button className="btn btn-primary" onClick={() => { DATA.currentBattle = null; DATA.refresh() }} >Run from Battle</button>
                    </div>
                    <div>
                        {DATA.logData[DATA.logData.length - 2] && <span>{DATA.logData[DATA.logData.length - 2]}</span>}
                    </div>
                    <div>
                        {DATA.logData[DATA.logData.length - 1] && <span>{DATA.logData[DATA.logData.length - 1]}</span>}
                    </div>
                </div>
                :
                <div className="buttons">
                    <div>
                        {DATA.logData[DATA.logData.length - 2] && <span>{DATA.logData[DATA.logData.length - 2]}</span>}
                        <button className="btn btn-primary" onClick={() => DATA.currentBattle.tryCatch()} >{currentBattle.catching > 0 ? `Catching ${parseInt(currentBattle.catching)}%` : `Throw Pokeball`}</button>
                    </div>
                    <div>
                        {DATA.logData[DATA.logData.length - 1] && <span>{DATA.logData[DATA.logData.length - 1]}</span>}
                        <button className="btn btn-primary" onClick={() => { DATA.currentBattle = null; DATA.refresh() }} >Run from Battle</button>
                    </div>
                </div>
            }
        </div>
    </div>
}
