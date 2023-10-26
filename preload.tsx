// preload script
// DOM - the document object model
// data representation of objects that comprise
// structure and content of a web document

// we can't edit the DOM in the `main` process because
// it has no access to the renderer's `document` context

// preload script runs BEFORE the renderer process,
// has access to both renderer globals `window` & `document`
// as well as a Node.js environment

// all Node.js APIs available here,
// same sandbox as a Chrome extension
window.addEventListener('DOMContentLoaded', () => {
    // `replaceText` function
    // `element` is what we replace, given by the Id
    // passed by `selector`
    const replaceText = (selector: any, text: any) => {
        const element = document.getElementById(selector)

        // if such an element exists
        if (element)
        {
            element.innerText = text
        }
    }

    // for each dependency given, we replace it using
    // the dependency version
    for (const dependency of ['chrome', 'node', 'electron'])
    {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

// accesses `Node.js` process.versions object, runs
// `replaceText` helper function to insert version
// numbers into the HTML document