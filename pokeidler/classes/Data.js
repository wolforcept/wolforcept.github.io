const turn_start = 0, turn_exit = 1, turn_win = 2, turn_defeat = 3, turn_my_attack = 4, turn_other_attack = 5

class Battle {

    loadString
    name
    types
    health
    maxHealth
    level
    xp
    image
    moves

    turn = turn_start
    catching = 0

    constructor(loaded, name, types, health, level, xp, image, moves) {
        if (loaded.loadString) {
            // load  battle from another battle
            this.loadString = loaded.loadString
            this.name = loaded.name
            this.types = loaded.types
            this.health = loaded.health
            this.maxHealth = loaded.maxHealth
            this.level = loaded.level
            this.xp = loaded.xp
            this.image = loaded.image
            this.moves = loaded.moves
            this.turn = loaded.turn
            this.catching = loaded.catching
        } else {
            this.loadString = loaded
            this.name = name
            this.types = types
            this.health = health
            this.maxHealth = health
            this.level = level
            this.xp = xp
            this.image = image
            this.moves = moves
        }
        if (!DATA.seenPokemon.includes(this.loadString))
            DATA.seenPokemon.push(this.loadString)

        if (DEBUG)
            console.log(this)
    }

    getMyPokemon() {
        return DATA.getPokemonInBattle()
    }

    tryCatch() {
        const catchRate = 1 + Math.max(0, Math.random() * 10 * (this.maxHealth - this.health) / this.maxHealth)
        this.catching = Math.min(100, this.catching + catchRate)
        DATA.refresh()
    }

    //
    // STEP
    //

    stepTryCatch(myPokemon) {
        DATA.log(`You threw a pokeball...`)
        if (this.catching == 100) {
            MyAnim.alpha("#pokeballImg", 0, 1, 1)
            MyAnim.moveFunction("#pokeballImg", (t) => { return { x: 400 * t, y: 296 * t * t - 494 * t - 1 } }, 20)
                .then(() => MyAnim.alpha("#pokeballImg", 1, 1, 1)
                    .then(() => MyAnim.alpha("#pokeballImg", 0, 0, 1)
                        .then(() => {
                            $("#pokeballImg").css({ 'transform': `translate(0px, 0px)` })
                            this.image = IMG_POKEBALL
                        })
                    )
                )
            DATA.log(`Pokemon caught!`)
            DATA.addPokemon(this.loadString)
            this.turn = turn_exit

        } else {
            const escapeRate = 1 + Math.max(0, 30 * this.health / this.maxHealth)
            this.catching = Math.max(0, this.catching - escapeRate)
            MyAnim.alpha("#pokeballImg", 0, 1, 1)
            MyAnim.moveFunction("#pokeballImg", (t) => { return { x: 500 * t, y: 315 * t * t - 412 * t } }, 30)
                .then(() => MyAnim.alpha("#pokeballImg", 1, 1, 1)
                    .then(() => MyAnim.alpha("#pokeballImg", 0, 0, 1)
                        .then(() => $("#pokeballImg").css({ 'transform': `translate(0px, 0px)` }))
                    )
                )
            DATA.log(`Pokeball missed!`)
            this.turn = turn_other_attack
        }
    }

    stepWin(myPokemon) {
        const xpDiff = myPokemon.level < this.level + 10 ? 0 :
            this.xp * (1 - 0.01 * Math.pow(myPokemon.level - 10, 2))
        const xp = parseInt(Math.max(0, this.xp + xpDiff))
        myPokemon.gainXp(xp)
        DATA.log(this.name + " fainted! " + myPokemon.getName() + " gained " + xp + " xp")
        this.turn = turn_exit
    }

    stepDefeat(myPokemon) {
        if (DATA.getLiveParty().length > 0)
            this.turn = turn_my_attack
        else
            this.turn = turn_exit
    }

    stepMyAttack(myPokemon) {
        const moves = myPokemon.getMoves()
        const move = moves[parseInt(Math.random() * moves.length)]
        if (!move) {
            DATA.log(`${this.name} is distracted...`)
        } else {
            const moveStats = myPokemon.getMoveStats(move)

            const baseDamage = (move.power || 1) * (.5 + .5 * moveStats.mastery * .1) * .8 * .01 * this.maxHealth

            // boosts must be in %
            const levelDamageBoost = (myPokemon.level - this.level) * .1
            const itemDamageBoost = myPokemon.getItemDamageBoost()
            const weaknessDamageBoost = Type.getDamageBoost(move.type.name, this.types);

            const dmgIncrease = baseDamage * (levelDamageBoost + itemDamageBoost + weaknessDamageBoost)
            const totalDamage = parseInt(baseDamage + Math.max(-baseDamage * .9, Math.min(baseDamage * 10, dmgIncrease)))

            myPokemon.gainXp(parseInt(moveStats.xp / 2))
            this.health -= Math.min(this.maxHealth * .9, totalDamage)

            MyAnim.moveStraight("#myPokemonImg", 20, -20, 6)
                .then(() => MyAnim.moveStraight("#myPokemonImg", -20, 20, 6))
            MyAnim.alpha("#otherPokemonImg", 1, 0, 20)
                .then(() => MyAnim.alpha("#otherPokemonImg", 0, 1, 20))

            DATA.log(`${myPokemon.getName()} used ${move.name}!`)
            if (weaknessDamageBoost > 0)
                DATA.log(`It is super effective!`)
            if (weaknessDamageBoost < 0)
                DATA.log(`It is not very effective!`)
        }

        if (this.health <= 0)
            this.turn = turn_win
        else
            this.turn = turn_other_attack
    }

    stepOtherAttack(myPokemon) {
        const move = this.moves[parseInt(Math.random() * this.moves.length, 10)]
        if (!move) {
            DATA.log(`${this.name} is distracted...`)
        } else {
            const levelDamageBoost = (this.level - myPokemon.level) * .1
            const weaknessDamageBoost = Type.getDamageBoost(move.type, myPokemon.getTypes());

            const baseDamage = (move.power || 1) * .5 * .01 * myPokemon.maxHealth
            const damageIncrease = baseDamage * (levelDamageBoost + weaknessDamageBoost)
            const totalDamage = parseInt(baseDamage + Math.max(-baseDamage * .9, Math.min(baseDamage * 10, damageIncrease)))
            myPokemon.addHealth(-totalDamage)

            DATA.log(`${this.name} used ${move.name}!`)
            if (weaknessDamageBoost > 0)
                DATA.log(`It is super effective!`)
            if (weaknessDamageBoost < 0)
                DATA.log(`It is not very effective!`)
            MyAnim.moveStraight("#otherPokemonImg", -20, 20, 6)
                .then(() => MyAnim.moveStraight("#otherPokemonImg", 20, -20, 6)
                    .then(
                        () => MyAnim.alpha("#myPokemonImg", 1, 0, 20).then(
                            () => MyAnim.alpha("#myPokemonImg", 0, 1, 20)
                        )
                    )
                )
            if (myPokemon.health <= 0) {
                DATA.log(myPokemon.getName() + " fainted! ")
                this.turn = turn_defeat
                return
            }
        }
        this.turn = turn_my_attack
    }

    step() {

        const myPokemon = this.getMyPokemon()

        switch (this.turn) {

            case turn_start: { // prepare, show battle
                this.turn = myPokemon.level >= this.level ? turn_my_attack : turn_other_attack
                DATA.log(`-----------------------------`)
                DATA.log(`A wild ${this.name} appeared!`)
                return
            }

            case turn_exit: { // exit battle
                DATA.currentBattle = null
                return
            }

            case turn_win: { // other pokemon defeated
                this.stepWin(myPokemon)
                return
            }

            case turn_defeat: { // my pokemon fainted
                this.stepDefeat(myPokemon)
                return
            }

            case turn_my_attack: { // my turn
                if (this.catching > 0)
                    this.stepTryCatch(myPokemon);
                else
                    this.stepMyAttack(myPokemon)
                return;
            }

            case turn_other_attack: { // his turn
                this.stepOtherAttack(myPokemon)
                return
            }

        }

    }

}

async function createBattle(region) {

    const encounters = region.loaded.encounters

    let total = 0
    let probs = []
    encounters.forEach(encounter => {
        probs.push(encounter.maxChance)
        total += encounter.maxChance
    })

    const chosenEncounter = randomWeighted(encounters, probs, total)
    const level = chosenEncounter.details[parseInt(Math.random() * chosenEncounter.details.length, 10)].max_level
    const pokemon = new Pokemon(chosenEncounter.pokemon.name, level)
    await pokemon.loadAsync()
    const moves = pokemon.getMoves().map(x => {
        return {
            name: x.names.find(x => x.language.name == 'en').name,
            power: x.power, pp: x.pp, type: x.type.name
        }
    })

    if (DATA.canBattle()) {
        return new Battle(pokemon.loadString, pokemon.getName(), pokemon.getTypes(), pokemon.health, pokemon.level, parseInt(pokemon.maxXp / 2), pokemon.getImageSrc(), moves)
    }
}

const TRANSIENTS = ['pokemons', 'box', 'clock', 'isSearching', 'currentBattle']
class Data {

    name = CACHE_NAME
    pokemons = []
    box = []
    items = []
    currentRegion = 0
    seenPokemon = []
    finishedQuests = []
    isSearching = false
    searchingMethod = 'walk'
    searchMethods = ['walk']
    ticks = 0
    currentBattle = null
    battleCooldown = 0
    clock

    //settings 
    alwaysShowPercentage = false

    async startClock() {
        this.clock = setInterval(() => {
            this.ticks++

            if (this.battleCooldown > 0)
                this.battleCooldown--

            if (this.repaint) this.repaint()
            this.pokemons.forEach(pokemon => pokemon.step(this.ticks));

            if (this.isSearching && this.getLiveParty().length == 0)
                this.isSearching = false

            if (this.battleCooldown < 1 && Math.random() < .005)
                if (this.canBattle()) {
                    this.battleCooldown = 200
                    createBattle(this.getCurrentRegion()).then(battle => {
                        this.currentBattle = battle
                        DATA.refresh()
                    })
                }

            if (this.ticks % 150 == 0) {
                if (this.currentBattle) {
                    this.currentBattle.step()
                    if (!this.currentBattle)
                        this.battleCooldown = 200
                    DATA.refresh()
                }
            }

            if (this.ticks % 1000 == 0) {
                DATA.write()
            }
        }, 1000 / 60)
    }

    async unwrite() {
        localStorage.setItem(this.name, "");
    }

    async write() {
        const dataToSave = JSON.parse(JSON.stringify(this));
        localStorage.setItem(this.name, JSON.stringify(dataToSave));
        console.log(`Data Saved. nr of pokemons: ${dataToSave.pokemons.length}`)
    }

    async read() {

        try {
            console.log("synced > Loading player data...")
            const loadedData = JSON.parse(localStorage.getItem(this.name))
            if (loadedData) {
                console.log("synced > Loading pokemons...")
                this.pokemons = loadedData.pokemons.map(loadedPokemon => new Pokemon(loadedPokemon))
                // Promise.all(this.pokemons.map(pokemon => pokemon.loadAsync()))
                console.log("synced > Loading box...")
                this.box = loadedData.box.map(loadedBoxPokemon => new Pokemon(loadedBoxPokemon))
                // Promise.all(this.box.map(boxPokemon => boxPokemon.loadAsync()))
                console.log("synced > Loading other data...")
                Object.keys(loadedData).forEach(key => {
                    if (!TRANSIENTS.includes(key))
                        this[key] = loadedData[key]
                })
                console.log("synced > finished loading.")
                if (DEBUG)
                    console.log(this)
                return
            }
        } catch (e) {
            console.log('synced > Unable to load player data.')
            console.log(e)
        }

        console.log('synced > No player data loaded.');
        this.write()
        console.log('synced > New player data created.');

    }

    async addPokemon(loadString) {
        let pokemon = new Pokemon(loadString)
        pokemon.loadAsync()
        if (this.getParty().length == 6)
            this.box.push(pokemon)
        else
            this.pokemons.push(pokemon)
        this.refresh()
    }

    getParty() {
        return this.pokemons
    }

    getLiveParty() {
        return this.pokemons.filter(pokemon => (pokemon.health > 0))
    }

    getPokemonsInBox() {
        return this.box
    }

    sendPokemonToParty(pokemon) {
        if (this.pokemons.length < 6) {
            const i = this.box.indexOf(pokemon)
            this.box.splice(i, 1)
            this.pokemons.push(pokemon)
            return true
        }
        return false
    }

    sendPokemonToBox(pokemon) {
        const i = this.pokemons.indexOf(pokemon)
        console.log(i)
        this.pokemons.splice(i, 1)
        this.box.push(pokemon)
    }

    canEnterRegion(region) {
        if (!region.minLevel)
            return true
        const party = this.getParty()
        for (let i = 0; i < party.length; i++) {
            if (party[i].level >= region.minLevel)
                return true
        }
        return false
    }

    setCurrentRegion(region) {
        this.isSearching = REGIONS.indexOf(region) != this.currentRegion ? false : this.isSearching
        this.currentRegion = REGIONS.indexOf(region)
    }

    getCurrentRegion() {
        return REGIONS[this.currentRegion]
    }

    releasePokemon(pokemon) {
        this.pokemons.splice(this.pokemons.indexOf(pokemon), 1)
    }

    refresh() {
        console.log("Nothing to refresh.")
    }

    finishQuest(id) {
        this.finishedQuests.push(id)
    }

    isQuestFinished(id) {
        return this.finishedQuests.includes(id)
    }

    canBattle() {
        const liveParty = this.getLiveParty()
        return liveParty.length > 0 &&
            liveParty[0].isLoaded() &&
            this.isSearching &&
            !this.currentBattle &&
            this.getCurrentRegion()
    }

    getPokemonInBattle() {
        return DATA.getParty().filter(x => x.health > 0)[0]
    }

    runFromBattle() {
        this.currentBattle = null
        this.battleCooldown = 200
        this.refresh()
    }

    getItems() {
        return this.items.map(itemId => ({ id: itemId, ...ITEMS[itemId] }))
    }

    addItemId(itemId) {
        this.items.push(itemId)
    }

    removeItem(itemIndex) {
        this.items.splice(itemIndex, 1)
    }

    logData = []

    scrollToBottomOfLog() {
        var objDiv = document.getElementById("log");
        if (objDiv)
            objDiv.scrollTop = objDiv.scrollHeight;
    }

    log(str) {
        this.logData.push(str)
        if (this.logData.length > 100)
            this.logData.splice(0, this.logData.length - 100)
        this.updateInfoLog(this.logData)
        this.scrollToBottomOfLog()
        if (DEBUG)
            console.log("LOG: " + str)
    }

    updateInfoLog() { }
}