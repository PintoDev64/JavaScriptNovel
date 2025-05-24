console.log("XD");

import { contextBridge, ipcRenderer } from 'electron';

const processAPI = {

}

contextBridge.exposeInMainWorld('jsnovel', processAPI)