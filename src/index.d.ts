declare namespace PropDeclarations {
  type windowControl_eventType = "close" | "maximize" | "minimize";
}

declare namespace ApiDeclarations {
  interface PreloadContent {
    lenguage: Record<
      ContextContent.LenguageValue["location"],
      {
        [K: string]: T;
      }
    >;
  }
}

declare interface Api {
  PreloadContent(): ApiDeclarations.PreloadContent;
  windowControls(eventType: PropDeclarations.windowControl_eventType): void;
}

declare type MAIN_WINDOW_VITE_DEV_SERVER_URL = string;

declare global {
  interface Window {
    noveljs: Api;
  }
}

declare namespace ContextContent {
  interface LenguageReducer {
    StateToModify: "location";
    StateValue: Lenguage["location"];
  }
  interface LenguageValue {
    location: "es" | "en";
    dictionary: ApiDeclarations.PreloadContent["lenguage"];
  }
  interface Lenguage {
    LenguageState: LenguageValue;
    ChangeLenguageState(data: ContextContent.LenguageReducer): void;
  }
}

declare namespace VarTypes {
  type OptionsList = {
    name: string,
    options: {
      name: string
      exec: () => void
    }[]
  }[]
}