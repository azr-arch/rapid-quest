import { EditorElement, useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Badge, Trash } from "lucide-react";

// Fix link rendering

export const LinkComponent = ({ element }: { element: EditorElement }) => {
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

    const handleOnClickElement = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch({
            type: "CHANGE_CLICKED_ELEMENT",
            payload: {
                elementDetails: element,
            },
        });
    };

    const handleDragStart = (e: React.DragEvent, type: string) => {
        if (type === null) return;
        console.log("Draggin link ");

        e.dataTransfer.setData("componentType", type);
    };

    return (
        <div
            style={styles}
            draggable
            onDragStart={(e) => handleDragStart(e, "link")}
            className={clsx("p-[2px] w-full m-[5px] relative text-[16px] transition-all", {
                "!border-blue-500 border-solid": state.selectedElement.id === element.id,
            })}
            onClick={handleOnClickElement}
        >
            {state.selectedElement.id === element.id && (
                <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
                    {state.selectedElement.name}
                </Badge>
            )}
            {!Array.isArray(element.content) && (
                <a href={element.content.href || "#"}>{element.content.innerText}</a>
            )}

            <span
                contentEditable={true}
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
                <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
                    <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
                </div>
            )}
        </div>
    );
};
