const ItemsTab = () => {

    const items = DATA.getItems().filter(x => x && x.name)

    if (!items)
        return <div><h2>Loading...</h2></div>

    const party = DATA.getParty()

    return (
        <div className="ItemsTab">
            {items.map((item, itemIndex) => (
                <div class="item-block">
                    <div className="title">
                        <img src={IMG_ + item.img} />
                        <div className="name">{item.name}</div>
                    </div>
                    <div className="description">{item.description}</div>
                    <DropdownButton
                        style={{ width: "100%" }}
                        text="Send to Pokemon"
                        options={party.map(pokemon => ({
                            text: pokemon.isLoaded() ? pokemon.getName() : "Loading...",
                            onClick: () => {
                                pokemon.addItemId(item.id)
                                DATA.removeItem(itemIndex)
                                DATA.refresh()
                            }
                        }))}
                    />
                </div>
            ))}
        </div >
    )
}