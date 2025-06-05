import { contextBridge, ipcRenderer } from 'electron';
import { IStateManagerVariables } from '../../engine/types/state_manager';

console.log("XD");

const processAPI = {
    getMedia() {
        return ipcRenderer.invoke("game:media:get")
    },
    getCharacter() {
        return ipcRenderer.invoke("game:character:get")
    },
    getState() {
        return ipcRenderer.invoke("game:state:get")
    },
    setState(state: IStateManagerVariables) {
        ipcRenderer.send("game:state:set", state)
    },
    eventState(handler: (args: IStateManagerVariables) => any) {
        ipcRenderer.on("game:state:change", (_event, variable: IStateManagerVariables) => {
            handler(variable)
        })
    }
}

contextBridge.exposeInMainWorld('jsnovel', processAPI)