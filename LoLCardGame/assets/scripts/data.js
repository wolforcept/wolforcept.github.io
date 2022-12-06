const champions = ["Aatrox", "Ahri", "Akali", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "AurelionSol", "Azir", "Bard", "Blitzcrank", "Brand", "Braum", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Hecarim", "Heimerdinger", "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "Leblanc", "LeeSin", "Leona", "Lissandra", "KSante", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "MissFortune", "Wukong", "Mordekaiser", "Morgana", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Sejuani", "Senna", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Viktor", "Vi", "Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yorick", "Yuumi", "Zac", "Zed", "Ziggs", "Zilean", "Zoe", "Zyra"]

const campaigns = [

    {
        title: 'Freljord\'s Voidrift',
        shortDescription: 'Highly magical campain, with low movement requirement.',
        requiredChampions: ['Lissandra', 'Volibear', 'Trundle'],
        rules: 'asd',
        zoom: 500,
        position: { x: 2400, y: 0 },
        missions: [
            {
                title: 'Battle of the Frozen Flats',
                flavorText: "The armies meet on the flats of the Freljord. Lissandra retreats and prepares her final magic.",
                movement: 2,
                position: { x: 3400, y: 600 },
                objectives: [{ nr: 8, type: 'melee' }, { nr: 8, type: 'melee' }, { nr: 10, type: 'ranged' }]
            },
            {
                title: 'At the gates of the Frostguard Citadel',
                flavorText: "Avora's and Serylda's armies have found their way to Lissandra's castle. Now they need to break inside and put an end to the madness.",
                movement: 2,
                position: { x: 3450, y: 460 },
                objectives: [{ nr: 12, type: 'melee' }, { nr: 12, type: 'ranged' }, { nr: '10', type: 'magic' }, { nr: 16, type: 'magic' }]
            },
            {
                title: 'Over the Howling Abyss',
                flavorText: "In the Murder Bridge, the Frostguard mount a magical defense, protecting Lissandra, which descends into the to the void rift.",
                movement: 0,
                position: { x: 3550, y: 350 },
                objectives: [{ nr: 20, type: 'magic' }, { nr: 'X', type: 'magic' }]
            },
            {
                title: 'The True Ice Sacrifice',
                flavorText: "In the depths of the Howling Abyss, Lissandra frees the Watchers, only to then realize their true form and intentions.",
                movement: 0,
                position: { x: 3700, y: 300 },
                objectives: [{ nr: 20, type: 'magic' }, { nr: 'X', type: 'magic' }]
            }
        ],
        isEnabled: true
    },

    {
        title: 'The Fall of Icathia',
        duration: 10,
        requiredChampions: ['Azir', 'Xerath'],
        isEnabled: true
    },

    {
        title: 'Great Darkin War',
        duration: 10,
        requiredChampions: ['Nasus', 'Zoe'],
        isEnabled: true
    },

    {
        title: 'The Birth of Noxus',
        duration: 10,
        requiredChampions: ['Mordekaiser'],
        isEnabled: true
    },

    {
        title: 'The Rune Wars',
        duration: 10,
        requiredChampions: ['Ryze', 'Brand', 'Bard'],
        isEnabled: true
    },

    {
        title: 'The Black Mist',
        duration: 10,
        requiredChampions: ['Viego', 'Senna'],
        isEnabled: true
    },

    {
        title: 'Invasion of Ionia',
        duration: 10,
        requiredChampions: ['Irelia', 'Shen'],
        isEnabled: true
    },
]
