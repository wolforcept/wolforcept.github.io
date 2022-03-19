
const SettignsTab = ({ }) => {
    return (
        <div className="pokeTab SettignsTab">
            <h1>Settings</h1>
            <h3>Game</h3>
            <div class="container">
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.write()
                    DATA.update()
                }}>Save Game Data</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.unwrite(); window.location.reload()
                }}>Reset Game Data</button>
            </div>
        </div >
    )
}