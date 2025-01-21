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
        throw Error("You sent the wrong action type to the delete Element editor State");

    return state.reduce((acc, item) => {
        if (item.id === action.payload.elementDetails.id) {
            return acc; // Skip the item to be deleted
        } else if (item.content && Array.isArray(item.content)) {
            // Recursively delete elements in nested content
            return [...acc, { ...item, content: deleteElement(item.content, action) }];
        }
        return [...acc, item];
    }, [] as EditorElement[]);
};

// Part of reordering feature
// const findElementAndParent = (
//     state: EditorElement[],
//     elementId: string
// ): {
//     element: EditorElement | null;
//     parent: EditorElement[] | null;
// } => {
//     for (const element of state) {
//         if (element.id === elementId) {
//             return { element, parent: state };
//         }

//         if (element.content && Array.isArray(element.content)) {
//             const result = findElementAndParent(element.content, elementId);
//             if (result?.element) {
//                 return result;
//             }
//         }
//     }

//     return { element: null, parent: null };
// };

// const removeElement = (state: EditorElement[], elementId: string) => {
//     return state.filter((el) => {
//         if (el.id === elementId) {
//             return false;
//         }

//         if (el.content && Array.isArray(el.content)) {
//             el.content = removeElement(el.content, elementId);
//         }

//         return true;
//     });
// };

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

        // Part of reodering
        // case "REODER_ELEMENT":
        //     const { elementId, targetId, position } = action.payload;

        //     if (elementId === "__body") {
        //         return state;
        //     }

        //     console.log("In reoder");

        //     // Find the element that we are moving along with its parent
        //     const { element: elementToMove, parent: sourceParent } = findElementAndParent(
        //         state.elements,
        //         elementId
        //     );

        //     // Find the target along with its parent
        //     const { element: targetElement, parent: targetParent } = findElementAndParent(
        //         state.elements,
        //         targetId
        //     );

        //     if (!elementToMove || !sourceParent || !targetElement || !targetParent) {
        //         return state;
        //     }

        //     // Create new state
        //     const newElements = removeElement([...state.elements], elementId);

        //     console.log({ elementToMove, targetElement, sourceParent, targetParent, newElements });

        //     const targetIdx = targetParent.findIndex((el) => el.id === targetElement.id);
        //     const insertIdx = position === "before" ? targetIdx : targetIdx + 1;

        //     console.log({ targetIdx, insertIdx });

        //     targetParent.splice(insertIdx, 0, elementToMove);

        //     return {
        //         ...state,
        //         elements: newElements,
        //     };
        case "LOAD_DATA":
            return {
                ...initialState,
                elements: action.payload.elements || initialState.elements,
            };

        default:
            return state;
    }
};
