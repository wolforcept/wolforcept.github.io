function html(s, ...e) {
    return e.reduce((a, b, i) => a + b + s[i + 1], s[0])
}

function getCurrentHashLoc() {
    return window.location.hash.substring(1)
}

window.addEventListener('hashchange', () => location.reload())

async function loadPage(comp, name, data) {
    // console.log({ comp, name, data })
    await $.ajax({
        url: name + '.js',
        dataType: 'script',
        success: _ => {
            comp.html(createElement(data, comp.html()))
            comp.addClass(name)
        },
    });
}

async function my(comp, hash) {

    let tag = comp.prop('tagName').toLowerCase()
    let name = tag.substring(4)

    let attributes = Object.assign({}, ...Array.from(comp[0].attributes, ({ name, value }) => ({ [name]: value })))

    if (!comp.hasClass(name)) {

        if (tag.startsWith('my--')) {

            // console.log({ tag, name, hash })
            if (tag == 'my--default') {
                if (hash !== '')
                    comp.remove()
            }

            else if (!hash.split('-').includes(name)) {
                console.log({ name, hash })
                comp.remove()
            }

            else if (attributes['newpage']) {

                if (hash && hash.startsWith(name + "-")) {
                    await loadPage(comp, name, attributes)
                    hash = hash.replace(name + "-", '')
                } else if (hash && hash.startsWith(name)) {
                    await loadPage(comp, name, attributes)
                    hash = hash.replace(name, '')
                }
            }

        } else if (tag.startsWith('my-')) {
            let name = tag.substring(3)
            await loadPage(comp, name, attributes)
        }
    }

    if (comp.children) {
        comp.children().each(async function () {
            await my($(this), hash)
        })
    }
}

$(document).ready(() => my($(`body`), getCurrentHashLoc()))
