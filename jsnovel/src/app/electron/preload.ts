console.log("XD");

import { contextBridge, ipcRenderer } from 'electron';
import { IStateManagerVariables } from 'src/engine/types/state_manager';

const processAPI = {
    eventVariables(handler: (...args: any) => any) {
        ipcRenderer.on("game:variable", (_event, variable: IStateManagerVariables) => {
            handler(variable)
        })
    }
}

contextBridge.exposeInMainWorld('jsnovel', processAPI)