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
        this.double = type.damage_relations.double_damage_to.map(x => x.name)
        this.half = type.damage_relations.half_damage_to.map(x => x.name)
        this.no = type.damage_relations.no_damage_to.map(x => x.name)
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

    static getDamageBoost(senderType, targetTypes) {
        let boost = 0
        const type = TYPES.find(x => x.name == senderType)
        type.double.forEach(t => {
            if (targetTypes.includes(t))
                boost += .5
        });
        type.half.forEach(t => {
            if (targetTypes.includes(t))
                boost -= .5
        });
        type.no.forEach(t => {
            if (targetTypes.includes(t))
                boost -= 1
        });
        return boost
    }
}

var TYPES = []
