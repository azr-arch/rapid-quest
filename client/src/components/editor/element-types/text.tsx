import { EditorElement, useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Trash } from "lucide-react";

export const TextComponent = ({ element }: { element: EditorElement }) => {
    const { state, dispatch } = useEditor();

    const styles = element.styles;

    const handleDeleteElement = () => {
        dispatch({
            type: "DELETE_ELEMENT",
            payload: {
                elementDetails: element,
            },
        });
    };

    return (
        <div
            style={styles}
            className={clsx("p-[2px] w-full m-[5px] relative text-[16px] transition-all", {
                "!border-blue-500": state.selectedElement.id === element.id,

                "!border-solid": state.selectedElement.id === element.id,
                //   'border-dashed border-[1px] border-slate-300': !state.liveMode,
            })}
        >
            <span
                contentEditable="true"
                onBlur={(e) => {
                    const spanElement = e.target as HTMLSpanElement;
                    dispatch({
                        type: "UPDATE_ELEMENT",
                        payload: {
                            elementDetails: {
                                ...element,
                                content: {
                                    innerText: spanElement.innerText,
                                },
                            },
                        },
                    });
                }}
            >
                {!Array.isArray(element.content) && element.content.innerText}
            </span>

            {state.selectedElement.id === element.id && (
                <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
                    <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
                </div>
            )}
        </div>
    );
};
