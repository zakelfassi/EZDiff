import { app as e, BrowserWindow as a } from "electron";
import { fileURLToPath as l } from "url";
import o from "path";
const s = l(import.meta.url), n = o.dirname(s);
function i() {
  const t = new a({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1,
      preload: o.join(n, "preload.js")
    }
  }), r = e.isPackaged ? `file://${o.join(n, "../dist/index.html")}` : "http://localhost:3000";
  t.loadURL(r), e.isPackaged || t.webContents.openDevTools();
}
e.whenReady().then(() => {
  i(), e.on("activate", () => {
    a.getAllWindows().length === 0 && i();
  });
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && e.quit();
});
