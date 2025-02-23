import ElectronInstance from "./modules/electron";
import { LogFunctions } from "./utils";

export function BasicNovelJsInitInstance() {

    const NovelWindowManager = ElectronInstance.getInstance()

    NovelWindowManager.getApp().whenReady()
        .then(() => {
            LogFunctions.Process("Crear la ventana");
            NovelWindowManager.createBrowserWindow()

            LogFunctions.Process("Iniciar la ventana");
            NovelWindowManager.startBrowserWindow()
        })
        .catch(e => console.log(e))
}