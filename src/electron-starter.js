const { BrowserWindow, app, Menu, dialog, ipcMain } = require('electron');
const { menuTemplate } = require('./menu');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let colorWindow;

global.openFile = null;

const createColorWindow = () => {
  // Create the browser window.
  colorWindow = new BrowserWindow({ parent: mainWindow, width: 245, height: 90 });

  // and load the index.html of the app.
  colorWindow.loadURL("http://localhost:3000/colorpicker");
  // mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  // Open the DevTools.
  // colorWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  colorWindow.on('closed',  () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    colorWindow = null;
  });
};

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");
  // mainWindow.loadURL(`file://${__dirname}/public/index.html`);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed',  () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
  const menu = Menu.buildFromTemplate(menuTemplate(app, mainWindow, createColorWindow));
  Menu.setApplicationMenu(menu);
};


ipcMain.on('file-cmd-res', (e, res) => {
  switch (res.cmd) {
    case 'save':
      global.openFile = res.file;
      fs.writeFile(res.file, JSON.stringify(res.data), (err) => {
        if (err) {
          dialog.showMessageBox({
            type: 'error',
            message: err,
          });
        }
      });
      break;
    default:
      break;
  }
});
ipcMain.on('redux-sync', (e, res) => {
  if (res.window === 'main') {
    mainWindow.webContents.send('redux-sync', res);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

