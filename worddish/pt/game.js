

const words = [
    "amor",
    "fato",
    "mito",
    "vies",
    "voce",
    "caos",
    "como",
    "esmo",
    "brio",
    "vide",
    "acao",
    "sede",
    "apos",
    "pois",
    "vida",
    "casa",
    "auge",
    "saga",
    "medo",
    "ônus",
    "ermo",
    "suma",
    "mote",
    "vovo",
    "alem",
    "idem",
    "tolo",
    "sina",
    "urge",
    "crer",
    "pela",
    "apto",
    "zelo",
    "veio",
    "pude",
    "tudo",
    "area",
    "ruim",
    "mais",
    "amar",
    "rude",
    "coxo",
    "cota",
    "para",
    "soar",
    "ater",
    "fase",
    "sera",
    "ente",
    "auto",
    "tras",
    "doce",
    "voga",
    "logo",
    "onde",
    "rima",
    "deus",
    "pelo",
    "ante",
    "cedo",
    "jugo",
    "meio",
    "meta",
    "arte",
    "alma",
    "cujo",
    "sela",
    "traz",
    "numa",
    "cela",
    "teor",
    "face",
    "noia",
    "sido",
    "nojo",
    "asco",
    "alvo",
    "foco",
    "pose",
    "isso",
    "base",
    "vale",
    "sair",
    "teve",
    "agir",
    "odio",
    "todo",
    "alto",
    "ocio",
    "rito",
    "eita",
    "irao",
    "alva",
    "agil",
    "novo",
    "tese",
    "alta",
    "nexo",
    "bojo",
    "orla",
    "peco",
    "mero",
    "agua",
    "rege",
    "nada",
    "util",
    "fora",
    "caso",
    "quer",
    "frio",
    "seio",
    "joia",
    "hoje",
    "lume",
    "haja",
    "tema",
    "algo",
    "quao",
    "pena",
    "hera",
    "fito",
    "belo",
    "nome",
    "pode",
    "bola",
    "fiel",
    "nude",
    "gama",
    "evoe",
    "país",
    "tipo",
    "vibe",
    "coca",
    "luta",
    "dote",
    "vira",
    "buco",
    "poxa",
    "siso",
    "este",
    "prol",
    "guia",
    "nato",
    "seja",
    "anti",
    "suar",
    "opor",
    "qual",
    "alfa",
    "dolo",
    "tino",
    "tais",
    "mera",
    "item",
    "dico",
    "real",
    "afim",
    "opio",
    "azul",
    "povo",
    "essa",
    "leal",
    "fuga",
    "esse",
    "grau",
    "lide",
    "erro",
    "post",
    "tabu",
    "chao",
    "puro",
    "usar",
    "selo",
    "bolo",
    "lida",
    "orar",
    "rara",
    "modo",
    "hein",
    "raca",
    "taxa",
    "sito",
    "cair",
    "rola",
    "cafe",
    "aval",
    "fogo",
    "peao",
    "asno",
    "dois",
    "sexy",
    "ledo",
    "piao",
    "dado",
    "obra",
    "raro",
    "gana",
    "quis",
    "cume",
    "bobo",
    "gato",
    "quem",
    "fome",
    "rogo",
    "apor",
    "indo",
    "cena",
    "show",
    "pneu",
    "bens",
    "aqui",
    "raiz",
    "caro",
    "sobe",
    "juiz",
    "apta",
    "esta",
    "Davi",
    "leve",
    "flor",
    "meca",
    "cara",
    "hora",
    "seco",
    "rumo",
    "aula",
    "joio",
    "cada",
    "trem",
    "deve",
    "rico",
    "raso",
    "fera",
    "mora",
    "moco",
    "topo",
    "irma",
    "lema",
    "rijo",
    "fado",
    "nego",
    "sebe",
    "peso",
    "tomo",
    "peca",
    "feio",
    "reto",
    "seus",
    "dano",
    "puto",
    "poli",
    "ramo",
    "falo",
    "sape",
    "coro",
    "aria",
    "lixo",
    "fofo",
    "pejo",
    "eixo",
    "esta",
    "vixe",
    "rixa",
    "odor",
    "halo",
    "rede",
    "paco",
    "liso",
    "tido",
    "foro",
    "baia",
    "cimo",
    "limo",
    "mole",
    "tres",
    "doar",
    "xale",
    "voto",
    "laco",
    "fixo",
    "bela",
    "sumo",
    "maca",
    "xara",
    "anel",
    "fiar",
    "ismo",
    "gado",
    "dela",
    "cais",
    "coco",
    "pipa",
    "mesa",
    "ateu",
    "hexa",
    "leao",
    "xodo",
    "tupi",
    "fama",
    "ogro",
    "bebe",
    "voar",
    "meia",
    "semi",
    "eter",
    "duma",
    "dose",
    "duro",
    "polo",
    "vara",
    "agem",
    "bora",
    "aura",
    "vela",
    "mimo",
    "acha",
    "olho",
    "cear",
    "nota",
    "cepa",
    "dica",
    "vaga",
    "cego",
    "saiu",
    "cito",
    "pesa",
    "dito",
    "ceta",
    "vovô",
    "amem",
    "rato",
    "toda",
    "reza",
    "gafe",
    "tato",
    "luxo",
    "teso",
    "fins",
    "fuso",
    "sapo",
    "dele",
    "ilha",
    "foge",
    "rale",
    "moca",
    "cabo",
    "sofa",
    "rosa",
    "saia",
    "arar",
    "jilo",
    "oleo",
    "foto",
    "vero",
    "anil",
    "breu",
    "pura",
    "mono",
    "bofe",
    "cama",
    "leia",
    "laia",
    "hino",
    "seta",
    "boca",
    "look",
    "muro",
    "maco",
    "luto",
    "mane",
    "fixa",
    "dona",
    "rota",
    "jaez",
    "quiz",
    "nata",
    "leme",
    "sigo",
    "nora",
    "grei",
    "cuja",
    "elan",
    "boco",
    "polo",
    "ogra",
    "anca",
    "laje",
    "jogo",
    "solo",
    "sono",
    "guri",
    "fala",
    "cima",
    "ouro",
    "ceia",
    "azar",
    "dali",
    "sope",
    "faco",
    "unir",
    "idos",
    "veem",
    "poca",
    "cocô",
    "atem",
    "mana",
    "nene",
    "isto",
    "jaja",
    "copa",
    "osso",
    "orbe",
    "digo",
    "time",
    "proa",
    "site",
    "taba",
    "bago",
    "roca",
    "vico",
    "asso",
    "eden",
    "edil",
    "rasa",
    "anjo",
    "raca",
    "nova",
    "ruco",
    "pomo",
    "poco",
    "sujo",
    "rack",
    "cura",
    "mapa",
    "raio",
    "momo",
    "boia",
    "mago",
    "vago",
    "leva",
    "luso",
    "veto",
    "Jose",
    "urbe",
    "mega",
    "acre",
    "sala",
    "roto",
    "seca",
    "diva",
    "nela",
    "lira",
    "mudo",
    "coxa",
    "xepa",
    "cipo",
    "moco",
    "peia",
    "luna",
    "pior",
    "riso",
    "role",
    "caju",
    "data",
    "tona",
    "vaso",
    "jaba",
    "dama",
    "cite",
    "faia",
    "gula",
    "viva",
    "cina",
    "sabe",
    "vivo",
    "roca",
    "lado",
    "azia",
    "buxo",
    "seda",
    "cola",
    "domo",
    "oral",
    "nerd",
    "celo",
    "luar",
    "teia",
    "cabe",
    "pera",
    "sopa",
    "pane",
    "onda",
    "zoar",
    "moda",
    "agro",
    "bone",
    "nulo",
    "bula",
    "toga",
    "icar",
    "pele",
    "diva",
    "pede",
    "sega",
    "caca",
    "angu",
    "hall",
    "paga",
    "colo",
    "musa",
    "adro",
    "gaze",
    "atar",
    "iaia",
    "assa",
    "mare",
    "cova",
    "cade",
    "pedi",
    "hipo",
    "ruir",
    "cruz",
    "lady",
    "beco",
    "maos",
    "taxi",
    "gera",
    "sois",
    "vaca",
    "leso",
    "ecra",
    "sebo",
    "frei",
    "baby",
    "papo",
    "acaí",
    "xixi",
    "tara",
    "ocre",
    "pais",
    "mano",
    "lato",
    "dedo",
    "cria",
    "agio",
    "veda",
    "fulo",
    "tapa",
    "teto",
    "bala",
    "mana",
    "grao",
    "zona",
    "naco",
    "paje",
    "baco",
    "ceus",
    "doze",
    "gene",
    "miss",
    "tufo",
    "link",
    "alho",
    "ioiô",
    "robô",
    "mina",
    "jipe",
    "dono",
    "boxe",
    "baio",
    "rama",
    "suja",
    "roxo",
    "veia",
    "dita",
    "lago",
    "humo",
    "cera",
    "gelo",
    "vivi",
    "tatu",
    "arco",
    "sete",
    "orfa",
    "homo",
    "pala",
    "eles",
    "czar",
    "ator",
    "duas",
    "faca",
    "erva",
    "feto",
    "beta",
    "tina",
    "arma",
    "deem",
    "mato",
    "dias",
    "bons",
    "rebu",
    "pino",
    "coar",
    "neve",
    "copo",
    "inte",
    "inda",
    "fada",
    "baba",
    "lama",
    "pato",
    "tita",
    "etc.",
    "sana",
    "pôde",
    "silo",
    "dons",
    "fino",
    "cepo",
    "safo",
    "dada",
    "raia",
    "bisa",
    "mofo",
    "fole",
    "jeca",
    "onca",
    "duto",
    "boom",
    "nume",
    "seis",
    "ajam",
    "pele",
    "suco",
    "poro",
    "gume",
    "muda",
    "deva",
    "eira",
    "baía",
    "urso",
    "mini",
    "coio",
    "gajo",
    "cuia",
    "anao",
    "lote",
    "gala",
    "galo",
    "goto",
    "fedo",
    "neno",
    "suso",
    "veem",
    "isla",
    "zero",
    "gris",
    "acto",
    "mala",
    "lobo",
    "eito",
    "loja",
    "pito",
    "toca",
    "olmo",
    "bode",
    "pivô",
    "urze",
    "moto",
    "cita",
    "fria",
    "popa",
    "bote",
    "egua",
    "sege",
    "noro",
    "cone",
    "tela",
    "filo",
    "soma",
    "feno",
    "Att.",
    "juro",
    "lica",
    "pras",
    "peru",
    "fume",
    "doer",
    "leda",
    "robe",
    "oito",
    "ísis",
    "play",
    "orto",
    "cega",
    "gaja",
    "tour",
    "coma",
    "leoa",
    "vate",
    "velo",
    "vila",
    "bidu",
    "lata",
    "bixa",
    "amem",
    "irar",
    "muco",
    "pico",
    "alea",
    "poda",
    "suor",
    "paul",
    "ergo",
    "book",
    "lava",
    "olha",
    "liga",
    "tear",
    "capô",
    "mico",
    "olor",
    "vala",
    "pata",
    "veja",
    "saci",
    "doxa",
    "blog",
    "soer",
    "pote",
    "nagô",
    "nega",
    "cede",
    "rape",
    "peta",
    "meme",
    "fumo",
    "bati",
    "rego",
    "saco",
    "valo",
    "ônix",
    "endo",
    "mata",
    "roda",
    "tira",
    "baga",
    "luva",
    "guru",
    "vezo",
    "menu",
    "gala",
    "pego",
    "biza",
    "anta",
    "sova",
    "jave",
    "isca",
    "fiat",
    "mira",
    "fuca",
    "chat",
    "bizu",
    "demo",
    "foca",
    "tutu",
    "migo",
    "ruga",
    "lido",
    "nero",
    "capa",
    "tejo",
    "trio",
    "tupa",
    "vice",
    "caia",
    "mofa",
    "tava",
    "gare",
    "furo",
    "juri",
    "sino",
    "caco",
    "bule",
    "boga",
    "teve",
    "fava",
    "pisa",
    "sena",
    "gibi",
    "fina",
    "gole",
    "fila",
    "vime",
    "muar",
    "alca",
    "ralo",
    "favo",
    "mona",
    "jato",
    "moca",
    "fita",
    "doca",
    "pupa",
    "zoom",
    "dura",
    "psiu",
    "poti",
    "odre",
    "gral",
    "Joao",
    "reta",
    "rolo",
    "saio",
    "íris",
    "pago",
    "sois",
    "rele",
    "arca",
    "joca",
    "cava",
    "soro",
    "meus",
    "puxo",
    "B.O.",
    "moer",
    "soja",
    "Zeus",
    "male",
    "ansa",
    "vera",
    "rodo",
    "sima",
    "funk",
    "gema",
    "soez",
    "etos",
    "dual",
    "fula",
    "nele",
    "viga",
    "rabi",
    "cebo",
    "aedo",
    "kiwi",
    "peba",
    "nave",
    "seto",
    "toma",
    "poia",
    "paga",
    "tiro",
    "atro",
    "elmo",
    "unha",
    "abra",
    "bota",
    "nuns",
    "deao",
    "nano",
    "duna",
    "self",
    "gira",
    "maca",
    "mola",
    "soco",
    "urna",
    "grua",
    "riba",
    "noda",
    "cana",
    "diet",
    "melô",
    "rega",
    "deck",
    "gari",
    "piso",
    "bege",
    "roer",
    "juba",
    "maio",
    "maga",
    "lima",
    "asar",
    "zica",
    "adao",
    "faro",
    "viso",
    "cora",
    "rudo",
    "miga",
    "pano",
    "paca",
    "boas",
    "baal",
    "bate",
    "apar",
    "avel",
    "levo",
    "doma",
    "alar",
    "fofa",
    "bufe",
    "xote",
    "poer",
    "rose",
    "gomo",
    "maís",
    "anto",
    "puxa",
    "pega",
    "maiô",
    "rela",
    "obus",
    "mula",
    "sita",
    "taca",
    "ursa",
    "gata",
    "leem",
    "napa",
    "neon",
    "coto",
    "lero",
    "luau",
    "tico",
    "pira",
    "sola",
    "bole",
    "bico",
    "roxa",
    "fico",
    "nona",
    "reis",
    "taxo",
    "etno",
    "roco",
    "prea",
    "gota",
    "jaca",
    "ruge",
    "cubo",
    "oiro",
    "bobo",
    "ache",
    "gude",
    "folk",
    "abre",
    "dial",
    "fake",
    "piti",
    "cast",
    "siga",
    "palo",
    "saba",
    "rapa",
    "bica",
    "gogo",
    "urro",
    "avos",
    "papa",
    "ruar",
    "fero",
    "baba",
    "kilo",
    "adir",
    "cash",
    "loca",
    "gale",
    "erga",
    "siri",
    "mica",
    "pila",
    "lais",
    "atum",
    "jacu",
    "miau",
    "mate",
    "fela",
    "cica",
    "tamo",
    "toco",
    "puma",
    "spot",
    "triz",
    "FIFA",
    "chef",
    "soga",
    "bato",
    "meso",
    "godo",
    "mimi",
    "rubi",
    "gara",
    "cuca",
    "lona",
    "cano",
    "amao",
    "pega",
]
const S = 64;
const W = 5;
const H = 5;

var nextCleanIn = 20;

const vowels = ["A", "E", "I", "O", "U"];
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const probabilities = [8.4966, 2.0720, 4.5388, 3.3844, 11.161, 1.8121, 2.4705, 3.0034, 7.5448, 0.1965, 1.1016, 5.4893, 3.0129, 6.6544, 7.1635, 3.1671, 0.1962, 7.5809, 5.7351, 6.9509, 3.6308, 1.0074, 1.2899, 0.2902, 1.7779, 0.2722];

const objectiveWords = [];

function randomWord() {
    const index = Math.floor(Math.random() * words.length);
    return words.splice(index, 1)[0];
}

function randomLetter() {
    if (Math.random() < .05)
        return vowels[Math.floor(Math.random() * vowels.length)]
    let r = Math.random();
    for (const i in letters) {
        if (r < probabilities[i] / 100)
            return letters[i]
        r -= probabilities[i] / 100
    }
}
// A	8.4966 	43.31	    
// B	2.0720 	10.56
// C	4.5388 	23.13	    
// D	3.3844 	17.25	    
// E	11.1607	56.88	
// F	1.8121 	9.24
// G	2.4705 	12.59
// H	3.0034 	15.31
// I	7.5448 	38.45	    
// J	0.1965 	1.00
// K	1.1016 	5.61
// L	5.4893 	27.98	    
// M	3.0129 	15.36
// N	6.6544 	33.92	    
// O	7.1635 	36.51	    
// P	3.1671 	16.14	    
// Q	0.1962 	1
// R	7.5809 	38.64	    
// S	5.7351 	29.23	    
// T	6.9509 	35.43	    
// U	3.6308 	18.51	    
// V	1.0074 	5.13
// W	1.2899 	6.57
// X	0.2902 	1.48
// Y	1.7779 	9.06
// Z	0.2722 	1.39

const cellGroups = [
    [".cell1", ".cell2", ".cell3", ".cell4"],
    [".cell5", ".cell6", ".cell7", ".cell8"],
    [".cell9", ".cell10", ".cell11", ".cell12"],
    [".cell13", ".cell14", ".cell15", ".cell16"],

    [".cell1", ".cell5", ".cell9", ".cell13"],
    [".cell2", ".cell6", ".cell10", ".cell14"],
    [".cell3", ".cell7", ".cell11", ".cell15"],
    [".cell4", ".cell8", ".cell12", ".cell16"],

    [".cell1", ".cell6", ".cell11", ".cell16"],
    [".cell4", ".cell7", ".cell10", ".cell13"],
]

function deleteAllLettersInGroup(group) {
    group.forEach(cell => {
        $(cell).empty()
    });
}

function makeWordFromGroup(group) {
    let str = "";
    group.forEach(cell => str += $(cell).text());
    return str;
}

function checkNextIsEmpty() {
    const next = $("#nextLetter");
    if (next.children().length === 0) {
        makeLetter(randomLetter())
    }
}

function checkAllWords() {
    for (const group of cellGroups) {
        const word = makeWordFromGroup(group).toLocaleLowerCase();
        if (words.includes(word)) {
            words.splice(words.indexOf(word), 1)
            if (objectiveWords.includes(word))
                markObjectiveDone(word)
            else
                makeDoneword(word)
            deleteAllLettersInGroup(group)
        }
    }
}

function makeCells() {
    for (let i = 1; i <= 16; i++) {
        $(`.cell${i}`).droppable({ accept: ".letter, svg" });
    }
}

function makeLetter(letter) {

    const div = $(`<div class="letter">${letter}</div>`);
    div.draggable({
        // containment: "#grid",
        revert: function (droppable) {

            if (droppable && droppable.hasClass("cell")) {
                div.css({ position: "relative", top: 0, left: 0 });
                if (droppable.children().length === 0) {
                    div.appendTo(droppable);
                } else {
                    const other = droppable.children(':first-child');
                    other.appendTo($(this).parent())
                    $(this).appendTo(droppable);
                }
                checkAllWords();
                checkNextIsEmpty();
                return false;
            }
            return true;
        },
    });

    $("#nextLetter").append(div)
    nextCleanIn--;
    if (nextCleanIn === 0) {
        nextCleanIn = 5;
        makeClean();
    }
}

function makeDoneword(word) {
    const div = $(`<div id="doneword-${word}" class="doneword">${word}</div>`);

    $("#donewords").prepend(div)
}

function makeObjective() {
    const word = randomWord();
    // const word = "aaaa"
    objectiveWords.push(word)
    const div = $(`<div id="objective-${word}" class="objective">${word}</div>`);

    $("#objectives").append(div)
}

function markObjectiveDone(word) {
    $("#objective-" + word).css({ backgroundColor: "rgb(76, 122, 76)" })
}

function makeClean() {
    const svg = $(`<svg xmlns="http://www.w3.org/2000/svg" style="fill:rgb(125,0,0)" viewBox="0 0 48 48" width="40px" height="40px"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"/></svg>`)
    svg.draggable({
        // containment: "#grid",
        revert: function (droppable) {

            if (droppable && droppable.hasClass("cell") && droppable.children().length > 0) {
                $(this).remove();
                droppable.empty();
                checkAllWords();
                checkNextIsEmpty();
                return false;
            }
            return true;
        },
    });
    $('#cleans').append(svg);
}

makeCells();

makeLetter(randomLetter());
for (let i = 0; i < 6; i++)
    makeObjective()
// for (let i = 0; i < 6; i++)
//     makeDoneword("test")

makeClean()
makeClean()
makeClean()
makeClean()