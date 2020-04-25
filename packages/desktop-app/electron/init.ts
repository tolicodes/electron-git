const electron = require("electron");

const autoStart = () => {
  electron.app.setLoginItemSettings({
    openAtLogin: true,
    path: electron.app.getPath("exe"),
  });
};

export default async () => {
  autoStart();
};
