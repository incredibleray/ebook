// const electron = window.require('electron');

// const { ipcRenderer } = electron;
// let { ipcRenderer } = require("electron")
import {ipcRenderer} from "electron";

function send(message) {
    return new Promise((resolve) => {
        ipcRenderer.send('asynchronous-message', message);
    });
}