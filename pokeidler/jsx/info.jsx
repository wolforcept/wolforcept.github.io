

const InfoTab = ({ }) => {

    const [log, setLog] = React.useState(DATA.logData || [])

    React.useEffect(() => {
        DATA.updateInfoLog = setLog
        DATA.scrollToBottomOfLog()
    }, [])

    return (
        <div className="pokeTab InfoTab">
            <h3>Log</h3>
            <div id="log" className="textbox">{log.map(x => <div>{x}</div>)}</div>
            <h3>Game Settings</h3>
            <div class="container">
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.write()
                    DATA.refresh()
                }}>Save Game Data</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.unwrite(); window.location.reload()
                }}>Reset Game Data</button>
            </div>
            <h3>About</h3>
            <div class="textbox">
                Game created by Wolforce in Portugal<br />
                Check my other projects at:
                <a href="https://www.curseforge.com/members/wolforce/projects">Curseforge</a>
                or
                <a href="https://wolforcept.github.io/">Github Pages</a><br />
                <br />
                Dependant on (and a big thanks to) PokeApi. <br />
                Without it this project would not exist.
            </div>
        </div >
    )
}