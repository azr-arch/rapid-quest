import { DeviceTypes, EditorElement } from "./provider";

export type EditorActions =
    | {
          type: "ADD_ELEMENT";
          payload: {
              containerId: string;
              elementDetails: EditorElement;
          };
      }
    | {
          type: "UPDATE_ELEMENT";
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: "DELETE_ELEMENT";
          payload: {
              elementDetails: EditorElement;
          };
      }
    | {
          type: "CHANGE_CLICKED_ELEMENT";
          payload: {
              elementDetails?:
                  | EditorElement
                  | {
                        id: "";
                        content: [];
                        name: "";
                        styles: {};
                        type: null;
                    };
          };
      }
    | {
          type: "CHANGE_DEVICE";
          payload: {
              device: DeviceTypes;
          };
      }
    | {
          type: "LOAD_DATA";
          payload: {
              elements: EditorElement[];
          };
      }
    | {
          type: "REODER_ELEMENT";
          payload: {
              targetId: string;
              elementId: string;
              position: "before" | "after";
          };
      };
