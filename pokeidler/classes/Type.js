class Type {

    name

    double = []
    half = []
    no = []

    constructor(name) {
        this.name = name
    }

    async load() {
        const type = await (await CACHE.fetch('https://pokeapi.co/api/v2/type/' + this.name)).json()
        this.double = type.damage_relations.double_damage_from.map(x => x.name)
        this.half = type.damage_relations.half_damage_from.map(x => x.name)
        this.no = type.damage_relations.no_damage_from.map(x => x.name)
        console.log("Loaded type: " + this.name)
        if (DEBUG)
            console.log(this)
    }

    static async loadAll() {
        const types = (await (await CACHE.fetch('https://pokeapi.co/api/v2/type')).json()).results
        for (let i in types) {
            const type = new Type(types[i].name)
            await type.load()
            TYPES.push(type)
        }
    }
}

var TYPES = []
