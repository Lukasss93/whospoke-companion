import {app, BrowserWindow, screen, shell, Menu, dialog, ipcMain} from 'electron';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

// @ts-ignore
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
    let display = screen.getPrimaryDisplay();

    let width = 300;
    let height = 630;

    win = new BrowserWindow({
        icon: path.join(process.env.VITE_PUBLIC, 'logo.ico'),
        width: width,
        height: height,
        maxWidth: width,
        minHeight: height,
        x: display.bounds.width - (width + 30),
        y: 160,
        maximizable: false,
        //resizable: false,
        useContentSize: true,
        webPreferences: {
            //devTools: false,
            preload: path.join(__dirname, 'preload.mjs'),
            nodeIntegration: true,
            contextIsolation: true,
        },
    })

    // Test active push message to Renderer-process.
    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }

    win.setVisibleOnAllWorkspaces(true, {visibleOnFullScreen: true});
    win.setAlwaysOnTop(true, 'screen-saver', 1);

    win.webContents.setWindowOpenHandler(({url}) => {
        if (url.startsWith('https:')) shell.openExternal(url)
        return {action: 'deny'}
    })

    //win.webContents.openDevTools()
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow)

function showMainWindow() {
    if (VITE_DEV_SERVER_URL) {
        win?.loadURL(VITE_DEV_SERVER_URL)
    } else {
        // win.loadFile('dist/index.html')
        win?.loadFile(path.join(RENDERER_DIST, 'index.html'))
    }
}

ipcMain.on('message:showMainWindow', () => showMainWindow());

const isMac = process.platform === 'darwin';

const template = [
    {
        label: isMac ? 'Who Spock Companion' : 'Menu',
        submenu: [
            {
                label: 'Torna nella Home',
                click: () => {
                    showMainWindow();
                },
            },
            {
                label: 'Ricarica',
                role: 'reload',
            },
            {
                label: 'Informazioni',
                click: () => {
                    dialog.showMessageBox({
                        title: 'Who Spock Companion',
                        message: 'Who Spock Companion',
                        detail: 'Sviluppato da Luca Patera\nVersione 1.0.0',
                        type: 'info',
                        buttons: ['OK'],
                    });
                },
            },
            {
                label: isMac ? 'Chiudi' : 'Esci',
                role: isMac ? 'close' : 'quit',
            }
        ]
    },
];

//@ts-ignore
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);