const { app, BrowserWindow} = require('electron')
const path = require("path");




function createWindow () {
    // Erstellen Sie das Browser-Fenster.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    // und laden Sie die index.html der App.
    win.loadFile('leagues-dashboard/index.html')

    // Öffnen Sie die DevTools.
    win.webContents.openDevTools()

    win.maximize();

}

app.whenReady().then(createWindow)

function getConnection() {
    return db;
}
// Beenden, wenn alle Fenster geschlossen sind.
app.on('window-all-closed', () => {
    // Unter macOS ist es üblich, für Apps und ihre Menu Bar
    // aktiv zu bleiben, bis der Nutzer explizit mit Cmd + Q die App beendet.
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // Unter macOS ist es üblich ein neues Fenster der App zu erstellen, wenn
    // das Dock Icon angeklickt wird und keine anderen Fenster offen sind.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})
