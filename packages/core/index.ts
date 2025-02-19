import NovelScriptCompiler from "@noveljs/compiler";
import ElectronInstance from "./src/modules/electron";

export function BasicNovelJsInitInstance() {

    NovelScriptCompiler

    const NovelWindowManager = ElectronInstance.getInstance()

    NovelWindowManager.getApp().whenReady()
        .then(() => {
            console.log("Crear la ventana");
            NovelWindowManager.createBrowserWindow()

            console.log("Iniciar la ventana");
            NovelWindowManager.startBrowserWindow()
        })
        .catch(e => console.log(e))
}