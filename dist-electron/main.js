import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    }
  });
  const startURL = app.isPackaged ? `file://${path.join(__dirname, "../dist/index.html")}` : "http://localhost:3000";
  win.loadURL(startURL);
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
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
