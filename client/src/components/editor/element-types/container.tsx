import { EditorElement, useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Badge, Trash } from "lucide-react";
import { Recursive } from "../recursive";

export const ContainerComponent = ({ element }: { element: EditorElement }) => {
    const { dispatch, state } = useEditor();
    const { id, content, name, styles, type } = element;

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
            className={clsx("relative p-4 transition-all group", {
                "max-w-full w-full": type === "container",
                "h-full": type === "__body",
                "overflow-scroll ": type === "__body",
                // 'flex flex-col md:!flex-row': type === '2Col',
                "!border-blue-500":
                    state.selectedElement.id === id && state.selectedElement.type !== "__body",
                "!border-yellow-400 !border-4":
                    state.selectedElement.id === id && state.selectedElement.type === "__body",
                "!border-solid": state.selectedElement.id === id,
            })}
            //   onDrop={(e) => handleOnDrop(e, id)}
            //   onDragOver={handleDragOver}
            draggable={type !== "__body"}
            //   onClick={handleOnClickBody}
            //   onDragStart={(e) => handleDragStart(e, 'container')}
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
                <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
                    <Trash size={16} onClick={handleDeleteElement} />
                </div>
            )}
        </div>
    );
};
