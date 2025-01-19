import { EditorActions } from "./actions";
import { Editor, EditorElement, initialState } from "./provider";

const addAnElement = (state: EditorElement[], action: EditorActions): EditorElement[] => {
    if (action.type !== "ADD_ELEMENT")
        throw Error("You sent the wrong action type to the Add Element editor State");
    return state.map((item) => {
        if (item.id === action.payload.containerId && Array.isArray(item.content)) {
            return {
                ...item,
                content: [...item.content, action.payload.elementDetails],
            };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: addAnElement(item.content, action),
            };
        }
        return item;
    });
};

const updateElement = (state: EditorElement[], action: EditorActions): EditorElement[] => {
    if (action.type !== "UPDATE_ELEMENT")
        throw Error("You sent the wrong action type to the Update Element editor State");

    return state.map((item) => {
        if (item.id === action.payload.elementDetails.id) {
            return { ...item, ...action.payload.elementDetails };
        } else if (item.content && Array.isArray(item.content)) {
            return {
                ...item,
                content: updateElement(item.content, action),
            };
        }
        return item;
    });
};

const deleteElement = (state: EditorElement[], action: EditorActions): EditorElement[] => {
    if (action.type !== "DELETE_ELEMENT")
        throw Error("You sent the wrong action type to the Update Element editor State");

    return state.filter((item) => {
        if (item.id === action.payload.elementDetails.id) {
            return false;
        } else if (item.content && Array.isArray(item.content)) {
            return deleteElement(item.content, action);
        }

        return true;
    });
};

export const editorReducer = (state: Editor = initialState, action: EditorActions) => {
    switch (action.type) {
        case "ADD_ELEMENT":
            const newEditorState = {
                ...state,
                elements: addAnElement(state.elements, action),
            };

            return newEditorState;
        case "UPDATE_ELEMENT":
            const updatedElements = updateElement(state.elements, action);

            const isUpdatedElementSelected =
                action.payload.elementDetails.id === state.selectedElement.id;

            const updatedState: Editor = {
                ...state,
                elements: updatedElements,
                selectedElement: isUpdatedElementSelected
                    ? action.payload.elementDetails
                    : {
                          id: "",
                          content: [],
                          name: "",
                          styles: {},
                          type: null,
                      },
            };
            return updatedState;
        case "DELETE_ELEMENT":
            const deletedElements = deleteElement(state.elements, action);
            const isSelectedElementDeleted =
                action.payload.elementDetails.id === state.selectedElement.id;

            const newStateAfterDelete: Editor = {
                ...state,
                elements: deletedElements,
                selectedElement: isSelectedElementDeleted
                    ? {
                          id: "",
                          content: [],
                          name: "",
                          styles: {},
                          type: null,
                      }
                    : state.selectedElement,
            };

            return newStateAfterDelete;

        case "CHANGE_CLICKED_ELEMENT":
            const clickedElementState = {
                ...state,
                selectedElement: action.payload.elementDetails || {
                    id: "",
                    content: [],
                    name: "",
                    styles: {},
                    type: null,
                },
            };

            return clickedElementState;
        case "CHANGE_DEVICE":
            const updatedDeviceState = {
                ...state,
                deviceType: action.payload.device,
            };

            return updatedDeviceState;

        case "LOAD_DATA":
        default:
            return state;
    }
};
