import InitEngine from "../../engine/init_engine";
import CharacterManager from "../../engine/character/instance";
import MediaInstance from "../../engine/media/instance";
import StateManager from "../../engine/state_manager/instance";
import { IStateManagerVariables } from "../../engine/types/state_manager";

export default async function registerEvents(ipcMain: Electron.IpcMain) {
    // Cargar el archivo de configuración del motor
    await InitEngine.startInstance();
    console.log("Electron events registered");

    ipcMain.handle("game:media:get", async _event => {
        const mediaInstance = MediaInstance.getInstance();
        if (!mediaInstance) return;
        return mediaInstance!.getAllMedia();
    })

    ipcMain.handle("game:character:get", async _event => {
        const characterInstance = CharacterManager.getInstance();
        if (!characterInstance) return;

        return characterInstance!.getAllCharacters();
    })

    ipcMain.on("game:state:get", async _event => {
        const stateManager = StateManager.getInstance();
        if (!stateManager) return;

        const state = stateManager.getAllVariables();

        _event.returnValue = state;
    })

    ipcMain.on("game:state:set", async (_event, state: IStateManagerVariables) => {
        const stateManager = StateManager.getInstance();
        if (!stateManager) return;

        Object.entries(state).forEach(([key, value]) => {
            stateManager.updateVariable(key, value);
        });

        _event.sender.send("game:state:change", stateManager.getAllVariables());
    });
}