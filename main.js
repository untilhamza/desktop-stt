const { app, BrowserWindow, desktopCapturer, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
// In the main process.

const tryCapture = async () => {};

const getSystemAudioNoMic = async () => {
  const sources = await desktopCapturer.getSources({
    types: ["window", "screen", "audio", "video"],
  });

  console.log(sources);

  const audioSource = sources.find((source) => {
    return source.name === "Electron";
  });

  console.log(audioSource);

  return audioSource;
};

ipcMain.on("GET_SOURCE", (event, arg) => {
  console.log(arg);

  desktopCapturer
    .getSources({ types: ["window", "screen"] })
    .then(async (sources) => {
      console.log(sources);
      for (const source of sources) {
        if (source.name === "Screen 2") {
          console.log(source);
          mainWindow.webContents.send("SET_SOURCE", source.id);

          return;
        }
      }
    });
  //startRecord();

  // Event emitter for sending asynchronous messages
  event.sender.send("SET_SOURCE", "screen:1:0");
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // setTimeout(() => {
  //   desktopCapturer
  //     .getSources({ types: ["window", "screen"] })
  //     .then(async (sources) => {
  //       for (const source of sources) {
  //         console.log(JSON.stringify(source));
  //         if (source.name === "Electron") {
  //           mainWindow.webContents.send("SET_SOURCE", source.id);
  //           return;
  //         }
  //       }
  //     });
  // }, 1000);

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //show developer tools
  mainWindow.webContents.openDevTools();
}

app.on("ready", createWindow);
