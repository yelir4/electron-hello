// `entry point` of our desktop application
// load `index.html` into the browser window

// import electron
const { app, BrowserWindow } = require('electron')

// include the Node.js 'path' module
// import 'preload.tsx' and subsequent additions
const path = require('node:path')

// loading index.html into a new `BrowserWindow` instance
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        // `__dirname` points to path of currently executing script
        // in this case, project root folder
        //
        // `path.join` join multiple path segments together,
        // combined path string that works across all platforms
        webPreferences: {
            preload: path.join(__dirname, 'preload.tsx')
        }
    })

    mainWindow.loadFile('index.html')

    // can open devtools like so
    // mainWindow.webContents.openDevTools()
}

// we call this `createWindow` function to open the window
// browser windows can only be created after the `app` module's `ready` event is fired
// we wait for this event by using `app.whenReady()`
app.whenReady().then(() => {
    createWindow()

    // open window if none are open yet (mac)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0)
        {
            createWindow()
        }
    })
})

// quit the app when all windows are closed (windows, linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


// here we can include the rest of the app's
// specific main process code, or put them in separate files
// and include them here

