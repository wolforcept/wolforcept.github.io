// █▀▄ █▀▄ ▄▀▄ █▀▄ █▀▄ ▄▀▄ █   █ █▄ █ 
// █▄▀ █▀▄ ▀▄▀ █▀  █▄▀ ▀▄▀ ▀▄▀▄▀ █ ▀█ 
const DropdownButton = ({ text, options }) => {
    return (<div className="DropdownButton">
        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">{text}</button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {options.map(
                (option) => <li><a className="dropdown-item" onClick={(e) => { option.onClick(); e.preventDefault() }}>{cap(option.text)}</a></li>
            )}
        </ul>
    </div>)
}

// ▄▀▄ █   ██▀ █▀▄ ▀█▀ 
// █▀█ █▄▄ █▄▄ █▀▄  █  
const Alert = ({ alertMessage, setAlertMessage }) => {
    return alertMessage && <div className="alert alert-dark alert-dismissible fade show" role="alert">
        {alertMessage}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage(null)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
}

// █▄█ ██▀ ▄▀▄ █   ▀█▀ █▄█    ██▄ ▄▀▄ █▀▄ 
// █ █ █▄▄ █▀█ █▄▄  █  █ █    █▄█ █▀█ █▀▄ 
const HealthBar = ({ text, hoverText, size, frontColor, backColor, style }) => {
    const [isHovered, setIsHovered] = React.useState(false)
    return (<div
        className="HealthBar"
        style={{ "background-color": backColor, ...style }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="text">{isHovered ? hoverText : text}</div>
        {size > 0 && <div className="bar" style={{ "background-color": frontColor, height: 1000, width: size + "%" }}>&nbsp;</div>}
    </div>
    )
}

// █▄ ▄█ ▄▀▄ █▀▄ ▄▀▄ █   
// █ ▀ █ ▀▄▀ █▄▀ █▀█ █▄▄ 
const ModalView = ({ modal }) => {
    const [payload, setPayload] = React.useState(modal.initialPayload)
    return (
        <div className="RenameModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title">{modal.title}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={modal.close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{modal.message}</p>
                        {modal.content && new modal.content({ payload, setPayload })}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => modal.save(payload)}>{modal.saveText}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => modal.close(payload)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

// █▀▄ ▄▀▄ █▄▀ ██▀    ██▄ ▄▀▄ █▀▄ ▄▀▀    █ █ █ ██▀ █   █ 
// █▀  ▀▄▀ █ █ █▄▄    █▄█ █▀█ █▀▄ ▄█▀    ▀▄▀ █ █▄▄ ▀▄▀▄▀ 
const PokemonBarsView = ({ pokemon }) => {
    const xpPercent = parseInt((10000 * pokemon.xp / pokemon.maxXp), 10) / 100
    const hpPercent = parseInt((10000 * pokemon.health / pokemon.maxHealth), 10) / 100
    const enPercent = parseInt((10000 * pokemon.energy / pokemon.maxEnergy), 10) / 100
    return (<>
        <HealthBar
            text="Experience" hoverText={`${pokemon.xp} / ${pokemon.maxXp}`}
            size={xpPercent} frontColor="#2253f5" backColor="#152457"
            style={{ margin: "0 0 8px 0" }}
        />
        <HealthBar
            text="Health" hoverText={`${pokemon.health} / ${pokemon.maxHealth}`}
            size={hpPercent} frontColor="#0b7824" backColor="#0a4016"
            style={{ margin: "0 0 8px 0" }}
        />
        <HealthBar
            text="Energy" hoverText={`${pokemon.energy} / ${pokemon.maxEnergy}`}
            size={enPercent} frontColor="#e0a000" backColor="#856404"
        />
    </>)
}

// █▀▄ ▄▀▄ █▄▀ ██▀    ▄▀▀ █▄█ ▄▀▄ █ ▄▀▀ ██▀ 
// █▀  ▀▄▀ █ █ █▄▄    ▀▄▄ █ █ ▀▄▀ █ ▀▄▄ █▄▄ 
const PokemonChoiceButton = ({ id, ...rest }) => {
    return <div className="PokemonChoiceButton">
        <img width={192} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} {...rest} />
    </div>
}