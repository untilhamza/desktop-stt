const { app, BrowserWindow } = require("electron");
const CoreAudio = require("node-core-audio");
const url = require("url");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const engine = new CoreAudio.AudioEngine();
  const input = engine.createDuplexStream(
    (inputChannels, outputChannels, callback) => {
      // Process audio data here
      // ...

      callback(null, outputChannels);
    }
  );

  input.start();

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

app.on("ready", createWindow);
