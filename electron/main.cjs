const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    minimizable: false,
    maximizable: true,
    fullscreenable: false,
  });

  win.maximize();
  win.webContents.openDevTools();
  win.loadURL("https://security-gateway-client.tools.kozow.com");
}
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
