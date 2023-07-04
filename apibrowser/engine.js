const INDENT = 30
let searchParams = new URLSearchParams(window.location.search)

if (searchParams.has('address')) {
    let param = searchParams.get('address')
    $('#address').val(param)
    $("#content").empty()
    $("#content").append("loading...")
    fetch(param).then(async x => load(await x.json()))
}

$('#go').click(() => {
    window.location.href = '?address=' + $('#address').val();
})

async function load(content) {
    $("#content").empty()
    $("#content").append(makeDiv("response", content, true, 0))
    finish()
}


function makeDiv(_name, _content, openImmediately = false, indent = 20) {

    const name = $(`<span>${_name}</span>`);
    const content = _content;
    const div = $(`<div style="padding-left: ${indent}px"></div>`)

    div.append(name)

    if (content === undefined || content === null || content === NaN || typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {

        const s = "" + content;

        if (s.endsWith("png") || s.endsWith("jpg") || s.endsWith("jpeg")) {

            let addr = searchParams.get('address');
            if (!addr.endsWith("/"))
                addr += "/"

            div.append(`<img src="${s.startsWith('http') ? s : addr + s}">`)
        }
        else if (s.startsWith("http"))
            div.append(`<a href="?address=${s}">${s}</a>`)
        else
            div.append(s)

    } else if (typeof content === 'object' && content.constructor === Array && content.length > 0) {

        const contentDiv = $(`<div></div`)
        name.addClass("collapsible-button")
        name.click(() => {
            if (contentDiv.children().length === 0) {
                content.forEach((val, i) => {
                    contentDiv.append(makeDiv(i + ": ", val))
                })
            } else {
                contentDiv.empty()
            }
        })
        div.append(contentDiv)

        if (openImmediately || content.length === 1) {
            content.forEach((val, i) => {
                contentDiv.append(makeDiv(i + ": ", val))
            })
        }

    } else {

        const keys = Object.keys(content)
        if (keys.length > 0) {
            const contentDiv = $(`<div></div`)
            name.addClass("collapsible-button")
            name.click(() => {
                if (contentDiv.children().length === 0) {
                    keys.forEach(key => {
                        const inner = content[key]
                        contentDiv.append(makeDiv(key + ": ", inner))
                    })
                } else {
                    contentDiv.empty()
                }
            })
            div.append(contentDiv)

            if (openImmediately || keys.length === 1) {
                keys.forEach(key => {
                    const inner = content[key]
                    contentDiv.append(makeDiv(key + ": ", inner))
                })
            }
        }
    }

    return div

    // if (name)
    //     append(name + ": ", indent)
    // else
    //     append("", indent)

    // if (content === undefined || content === null || content === NaN) {
    //     append('- - -')
    //     append(`<br />`)

    // } else if (typeof content === 'string' || typeof content === 'number' || typeof content === 'boolean') {
    //     append(`${content}`)
    //     append(`<br />`)

    // } else if (typeof content === 'object' && content.constructor === Array) {
    //     append("[ <br />")
    //     content.forEach((val, i) => {
    //         add("" + i, val, indent + INDENT)
    //     });
    //     append("] <br />", indent)
    // } else {
    //     append("{ <br />")
    //     const keys = Object.keys(content);
    //     keys.forEach(key => {
    //         add(key, content[key], indent + INDENT)
    //     });
    //     append("} <br />", indent)
    // }

}

function append(val, indent) {
    if (!indent)
        $("#content").append(`<span>${val}</span>`)
    else
        $("#content").append(`<span style="margin-left: ${indent}px">${val}</span>`)
}

// function append(val, indent, isCollapsible = true, isNewLine = false) {
//     if (!val || !val.startsWith) return;

//     const clazz = isCollapsible ? `class="elem collapsible"` : "elem"
//     const newline = isNewLine ? `<br />` : ""
//     if (val.endsWith("png"))
//         $("#content").append(newline + `<img style="margin-left: ${indent}px" src="${val}">${val}`)
//     else if (val.startsWith("http"))
//         $("#content").append(newline + `<a ${clazz} style="margin-left: ${indent}px" href="?address=${val}">${val}</a>`)
//     else
//         $("#content").append(newline + `<span ${clazz} style="margin-left: ${indent}px">${val}</span>`)
// }

function finish() {

    $("collapsible").each(_elem => {
        const elem = _elem
        elem.click(() => {
            elem.next(".elem").hide()
        })
    })
}