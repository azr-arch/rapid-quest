import { EditorElement, useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Badge, Trash } from "lucide-react";
import { Recursive } from "../recursive";
import { defaultStyles, ElementType } from "@/lib/constants";
import { v4 } from "uuid";

export const ContainerComponent = ({ element }: { element: EditorElement }) => {
    const { dispatch, state } = useEditor();
    const { id, content, styles, type } = element;

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
        if (type === "__body") return;
        e.dataTransfer.setData("componentType", type);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleOnDrop = (e: React.DragEvent, id: string) => {
        e.stopPropagation();
        const componentType = e.dataTransfer.getData("componentType") as ElementType;

        switch (componentType) {
            case "text":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: id,
                        elementDetails: {
                            content: { innerText: "Text Element" },
                            id: v4(),
                            type: "text",
                            styles: {
                                color: "black",
                                ...defaultStyles,
                            },
                            name: "Text",
                        },
                    },
                });
                break;
            case "container":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: id,
                        elementDetails: {
                            content: [],
                            id: v4(),
                            type: "container",
                            styles: {
                                ...defaultStyles,
                            },
                            name: "Container",
                        },
                    },
                });
                break;
            case "link":
                dispatch({
                    type: "ADD_ELEMENT",
                    payload: {
                        containerId: id,
                        elementDetails: {
                            content: {
                                innerText: "Link element",
                                href: "#",
                            },
                            id: v4(),
                            type: "link",
                            styles: {
                                color: "black",
                                ...defaultStyles,
                            },
                            name: "Link",
                        },
                    },
                });
                break;
        }
    };

    return (
        <div
            style={{
                ...styles,
                backgroundImage: `url(${styles.backgroundImage})`,
            }}
            className={clsx("relative h-full px-4 py-7 transition-all group bg-cover bg-center", {
                "max-w-full w-full border border-neutral-400 ": type === "container",
                "h-full": type === "__body",
                "overflow-hidden": type === "__body",
                // 'flex flex-col md:!flex-row': type === '2Col',
                "!border-blue-500 border":
                    state.selectedElement.id === id && state.selectedElement.type !== "__body",
                "!border-yellow-400 !border-4":
                    state.selectedElement.id === id && state.selectedElement.type === "__body",
                "!border-solid": state.selectedElement.id === id,
            })}
            draggable={type !== "__body"}
            onDragStart={(e) => handleDragStart(e, "container")}
            onDragOver={handleDragOver}
            onDrop={(e) => handleOnDrop(e, id)}
            onClick={handleOnClickElement}
        >
            <Badge
                className={clsx(
                    "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
                    {
                        block: state.selectedElement.id === element.id,
                    }
                )}
            >
                {element.name}
            </Badge>

            {Array.isArray(content) &&
                content.map((childElement) => (
                    <Recursive key={childElement.id} element={childElement} />
                ))}

            {state.selectedElement.id === element.id && state.selectedElement.type !== "__body" && (
                <div className="text-white absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
                    <Trash size={16} onClick={handleDeleteElement} />
                </div>
            )}
        </div>
    );
};
