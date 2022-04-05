const ItemsTab = () => {

    const items = DATA.getItems().filter(x => x)

    return (
        <div className="ItemsTab">
            {items.map(item => {
                <div class="item-row">
                    <img src={item.img} />
                    <h5>{item.name}</h5>
                    <p>{item.description}</p>
                </div>
            })}
        </div >
    )
}