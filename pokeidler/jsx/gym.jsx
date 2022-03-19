
const GymView = ({ pokemonsInGym, gymSlots }) => {

    const [modal, setModal] = React.useState(null)

    return (<div className="GymView" >
        {modal && <ModalView modal={modal} />}
        <div className="container">
            <div className="card-deck">{
                pokemonsInGym && pokemonsInGym.map((pokemon, i) => <GymSlotView pokemon={pokemon} />)
            }</div>
        </div>
    </div>
    )
}

const GymSlotView = ({ pokemon }) => {

    const [trainTimer, setTrainTimer] = React.useState(0)

    function startTrainTimer(e) {
        if (trainTimer != 0 || !pokemon.canTrain()) return
        setTrainTimer(1)

        const interval = setInterval(() => {
            setTrainTimer((trainTimer) => {
                if (trainTimer >= 100) {
                    clearInterval(interval)
                    pokemon.train()
                    return 0;
                }
                return trainTimer + 1
            })
        }, pokemon.getCurrentMoveStats().time);
        e.preventDefault()
    }

    const currentMoveStats = pokemon.getCurrentMoveStats()
    return (
        <div className="GymSlotView">
            <div className="card">
                <div className="d-flex align-items-start">

                    <img width="192px" alt={pokemon.getTitle()} src={pokemon.getImageSrc()} style={{ margin: "auto 0" }} />

                    <div>
                        <h4 className="card-title">{pokemon.getTitle()}</h4>
                        <h5 className="card-title">{'Level: ' + pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;{pokemon.isInGym ? " (in Gym)" : ""}</h5>
                        <div className="card-body" style={{ padding: "auto" }}>
                            <div style={{ marginBottom: 10 }}>
                                <p className="card-text">
                                    <PokemonBarsView pokemon={pokemon} />
                                </p>
                            </div>
                            <div className="d-flex align-items-start" style={{ fontSize: 20, marginBottom: 10 }}>
                                <div className="d-flex align-items-start" style={{ width: 300, color: "black" }}>
                                    <div style={{ margin: "auto auto auto 0" }}>Energy: {currentMoveStats.energy}</div>
                                    <div style={{ margin: "auto auto auto 0" }}>Time: {currentMoveStats.time}</div>
                                    <div style={{ margin: "auto auto auto 0" }}>XP: {currentMoveStats.xp}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <DropdownButton
                                        style={{ width: 160 }}
                                        text={currentMoveStats.name ? "Train " + currentMoveStats.name + " (" + currentMoveStats.mastery + "%)" : "Basic Traning"}
                                        options={
                                            [
                                                { text: "Return to Party", onClick: () => { pokemon.isInGym = false; DATA.update() } }
                                                ,
                                                { text: "Basic Training", onClick: () => pokemon.setCurrentMove(null) }
                                                ,
                                                ...(
                                                    pokemon.getMoves().map((move) => {
                                                        const stats = pokemon.getMoveStats(move)
                                                        return {
                                                            text: "Train " + stats.name + " (" + stats.mastery + "%)",
                                                            onClick: () => { pokemon.setCurrentMove(move.name) }
                                                        }
                                                    })
                                                )]
                                        }
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-start">
                                <button href="#" className="btn btn-primary" onClick={startTrainTimer}>Train</button>
                                <div className="col" style={{ height: "24px", paddingRight: 0 }}>
                                    <HealthBar style={{ height: "100%" }} size={trainTimer} frontColor="#555555" backColor="transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
