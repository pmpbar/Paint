const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = {
  menuTemplate: (app, mainWindow, createColorWindow) => {
    const template = [
      {
        label: 'File',
        submenu: [
          {
            label: 'New',
            accelerator: 'CmdOrCtrl+N',
            click() {
              global.openFile = null;
              mainWindow.webContents.send('file-cmd', { cmd: 'new', file: 'Untitled.paint' });
            },
          },
          {
            label: 'Open',
            accelerator: 'CmdOrCtrl+O',
            click() {
              const file = dialog.showOpenDialog(mainWindow, {
                filters: [
                  { name: 'MacPaintFiles', extensions: ['paint'] },
                ],
                properties: ['openFile'],
              });

              if (file) {
                fs.readFile(file[0], (err, d) => {
                  const data = JSON.parse(d);
                  if (data.drawing) {
                    const fileName = path.basename(file[0]);
                    mainWindow.webContents.send('file-cmd', { cmd: 'open', data, file: fileName });
                    global.openFile = file[0];
                  } else {
                    let message = "An error occured";
                    if (err) {
                      message = err;
                    }
                    dialog.showMessageBox({
                      type: 'error',
                      message,
                    });
                  }
                });
              }
            },
          },
          {
            label: 'Save',
            accelerator: 'CmdOrCtrl+S',
            click() {
              let file = global.openFile;
              if (file === null) {
                file = dialog.showSaveDialog(mainWindow, {
                  filters: [
                    { name: 'MacPaintFiles', extensions: ['paint'] },
                  ],
                });
              }
              if (file) {
                mainWindow.webContents.send('file-cmd', { cmd: 'save', file });
              }
            },
          },
          {
            label: 'Export',
            click() {
              mainWindow.webContents.send('file-cmd', { cmd: 'export' });
            },
          },
        ],
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            click() {
              mainWindow.webContents.send('draw-stack-cmd', 'undo');
            },
          },
          {
            label: 'Redo',
            accelerator: 'CmdOrCtrl+Shift+Z',
            click() {
              mainWindow.webContents.send('draw-stack-cmd', 'redo');
            },
          },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' },
        ],
      },
      {
        label: 'Tools',
        submenu: [
          {
            label: 'Color Picker',
            click() {
              createColorWindow();
            },
          },
          {
            label: 'Line',
            accelerator: 'l',
            click() {
              mainWindow.webContents.send('change-tool', 'line');
            },
          },
          {
            label: 'Circle',
            accelerator: 'c',
            click() {
              mainWindow.webContents.send('change-tool', 'circle');
            },
          },
        ],
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' },
        ],
      },
      {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' },
        ],
      },
    ];

    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services', submenu: [] },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' },
        ],
      });

      // Edit menu
      template[2].submenu.push(
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' },
          ],
        },
      );

      // Window menu
      template[4].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' },
      ];
    }
    return template;
  },
};
