import { ElementType } from "@/lib/constants";
import { Dispatch, ReactNode, useContext, useReducer, createContext } from "react";

import { EditorActions } from "./actions";
import { editorReducer } from "./reducer";

export type DeviceTypes = "Desktop" | "Tablet" | "Mobile";
export type EditorElement = {
    id: string;
    type: ElementType;
    styles: React.CSSProperties;
    name: string;
    content:
        | EditorElement[]
        | {
              innerText: string;
              href?: string;
              src?: string;
          };
};

export type Editor = {
    elements: EditorElement[];
    selectedElement: EditorElement;
    deviceType: DeviceTypes;
};

export const initialState: Editor = {
    elements: [
        {
            content: [],
            id: "__body",
            name: "Body",
            styles: {},
            type: "__body",
        },
    ],
    selectedElement: {
        id: "",
        type: null,
        styles: {},
        name: "",
        content: [],
    },
    deviceType: "Desktop",
};

interface EditorContextType {
    state: Editor;
    dispatch: Dispatch<EditorActions>;
}

const EditorContext = createContext<EditorContextType>({
    state: initialState,
    dispatch: () => undefined,
});

export const EditorProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(editorReducer, initialState);

    return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
};

export const useEditor = () => useContext<EditorContextType>(EditorContext);
