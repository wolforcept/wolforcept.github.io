
const QuestionTypes = {

    Lore_Champion: (game) => {
        let championName = game.championNames[Math.floor(Math.random() * game.championNames.length)]
        let champion = game.champions[championName]
        let lore = champion.lore.replaceAll(champion.name, '??????')
        game.createQuestionDiv("Guess the champion based on the champion's lore:", lore)
        game.currentAnswer = champion.name
    },

    Abilities_Champion: (game) => {
        let championName = game.championNames[Math.floor(Math.random() * game.championNames.length)]
        let champion = game.champions[championName]
        let i = Math.floor(Math.random() * champion.spells.length)
        let spell = champion.spells[i]
        let spellDescription = spell.description.replaceAll(champion.name, '??????')
        game.createQuestionDiv(`Guess the champion based on the champion's ability description: (${(['Q', 'W', 'E', 'R'])[i]})`, spellDescription)
        game.currentAnswer = champion.name
    },

    Ultimate_Name: (game) => {
        let championName = game.championNames[Math.floor(Math.random() * game.championNames.length)]
        let champion = game.champions[championName]
        let spellDescription = champion.spells[3].description
        game.createQuestionDiv("Guess the champion's ultimate ability based on its description:", spellDescription)
        game.currentAnswer = champion.spells[3].name
    },

    Ultimate_Champion: (game) => {
        let championName = game.championNames[Math.floor(Math.random() * game.championNames.length)]
        let champion = game.champions[championName]
        game.createQuestionDiv("Guess the champion based on its ultimate ability's name:", champion.spells[3].name)
        game.currentAnswer = championName
    },

    Spells_Champion: (game) => {
        let championName = game.championNames[Math.floor(Math.random() * game.championNames.length)]
        let champion = game.champions[championName]
        let spell = champion.spells[Math.floor(Math.random() * champion.spells.length)]
        let spellDescription = `Q: ${champion.spells[0].name}<br />
    W: ${champion.spells[1].name}<br />
    E: ${champion.spells[2].name}`
        game.createQuestionDiv("Guess the champion based on its abilities names:", spellDescription)
        game.currentAnswer = champion.name
    },

}

class Game {

    availableQuestionTypes
    currentAnswer = undefined
    score = 0

    input = $('input');
    submitButton = $('#submit');
    skipButton = $('#skip');
    questions = $('#questions');

    champions
    championNames

    constructor(champions, championNames) {
        this.champions = champions;
        this.championNames = championNames;
        $("#start").click(() => this.start())
    }

    start() {

        let types = []
        Object.keys(QuestionTypes).forEach(q => {
            if ($(`#toggle_${q}:checked`).length)
                types.push(q)
        });
        if (types.length === 0) return
        this.availableQuestionTypes = types

        $("#buttons_start").hide();
        $("#buttons_game").show();

        this.input.keydown(e => { if ((e.keyCode || e.which) == 13) this.submit() })
        this.submitButton.click(e => this.submit())
        this.skipButton.click(e => this.skip())
        this.createQuestion()
    }

    // ██▀ █▄ █ ▄▀  █ █▄ █ ██▀ 
    // █▄▄ █ ▀█ ▀▄█ █ █ ▀█ █▄▄ 

    submit() {
        if (this.match(this.input.val(), this.currentAnswer)) {
            this.createAnswerDiv(`Answer "${this.input.val()}" is correct! +1 Point`, '#23bd28')
            this.createSeparator()
            this.createQuestion()
            this.score++
            this.updateScore()
        } else {
            if (this.input.val())
                this.createAnswerDiv(`Answer "${this.input.val()}" is incorrect!`, '#998888')
        }
        this.input.val('')
    }

    skip() {
        this.score -= 1
        this.updateScore()
        this.createAnswerDiv(`Skipped. Correct answer was "${this.currentAnswer}". -1 Points`, '#e34622')
        this.createSeparator()
        this.createQuestion()
        this.input.val('')
    }

    createQuestion() {
        let questionType = this.availableQuestionTypes[Math.floor(Math.random() * this.availableQuestionTypes.length)]
        QuestionTypes[questionType](this)
    }

    match(text1, text2) {
        let t1 = text1.toLowerCase().replace(' ', '').replace(/[^\w\s!?]/g, '');
        let t2 = text2.toLowerCase().replace(' ', '').replace(/[^\w\s!?]/g, '');
        return t1 == t2
    }

    // █▄█ ▀█▀ █▄ ▄█ █   
    // █ █  █  █ ▀ █ █▄▄ 

    createQuestionDiv(title, text) {
        let newDiv = $(`<div class="question"><h3>${title}</h3>${text}</div>`)
        this.questions.append(newDiv)
        newDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    createAnswerDiv(answer, color) {
        let newDiv = $(`<div class="answer" style="color: ${color}">${answer}</div>`)
        this.questions.append(newDiv)
        newDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    updateScore() {
        $('h1').html('Score: ' + this.score)
    }

    createSeparator() {
        let newDiv = $(`<div class="separator"></div>`)
        this.questions.append(newDiv)
        newDiv[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

function getChampionImage(name, i = 0) {
    return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${name}_${i}.jpg`
}

async function downloadData(version = '12.14.1') {

    let data = await fetch(`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`)
    data = await data.json()

    let names = Object.keys(data.data)

    data = (await Promise.all(names.map(name =>
        fetch(`http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion/${name}.json`)
    )))
    data = await Promise.all(data.map(response => response.json()))

    let championData = {}
    data.forEach(loaded => {
        let name = Object.keys(loaded.data).filter(x => x != 'format' && x != 'type' && x != 'version')[0]
        championData[name] = loaded.data[name]
    })

    console.log(championData)

    $('body').append($('<a href="data:' +
        "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(championData))
        + '" download="data.json">DOWNLOAD NEW CHAMPION DATA JSON</a>'))

}
