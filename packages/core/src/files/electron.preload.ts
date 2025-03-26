import { contextBridge } from "electron";

const GameAPI = {
    loadInstructions() {

    },
    loadGameImages() {

    },
    loadGameVideos() {

    },
      
};
const DevAPI = {

};

contextBridge.exposeInMainWorld("NovelJsAPIGameAPI", GameAPI);
if (true) {
    contextBridge.exposeInMainWorld("NovelJsAPIDevAPI", DevAPI);
}