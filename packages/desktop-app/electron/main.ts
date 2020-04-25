import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";
import init from "./init";

import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

const pie = require("puppeteer-in-electron");
const puppeteer = require("puppeteer-core");

let win: BrowserWindow | null = null;

async function createWindow() {
  const browser = await pie.connect(app, puppeteer);

  win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.on("closed", () => (win = null));

  // Hot Reloading
  if (isDev) {
    // 'node_modules/.bin/electronPath'
    require("electron-reload")(
      [`${__dirname}/../../electron`, `${__dirname}/../../src`],
      {
        electron: path.join(
          __dirname,
          "..",
          "..",
          "node_modules",
          ".bin",
          "electron"
        ),
        forceHardReset: true,
        hardResetMethod: "exit",
      }
    );
  }

  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log("An error occurred: ", err));

  if (isDev) {
    win.webContents.openDevTools();
  }

  const page = await pie.getPage(browser, win);

  if (isDev) {
    page.goto("http://localhost:3000/index.html");
  } else {
    // 'build/index.html'
    page.goto(`file://${__dirname}/../index.html`);
  }

  init();
}

(async () => {
  await pie.initialize(app);

  app.on("ready", createWindow);

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (win === null) {
      createWindow();
    }
  });
})();
