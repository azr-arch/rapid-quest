import { EditorElement, useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Badge, Trash } from "lucide-react";

export const ImageComponent = ({ element }: { element: EditorElement }) => {
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

    const handleUpdateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageSrc = event.target?.result as string;
                // dispatch({
                //     type: "UPDATE_ELEMENT",
                //     payload: {
                //         elementDetails: {
                //             ...element,
                //             content: {
                //                 src: ,
                //             },
                //         },
                //     },
                // });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            style={styles}
            className={clsx("p-[2px] w-full m-[5px] relative text-[16px] transition-all", {
                "!border-blue-500": state.selectedElement.id === element.id,
                "!border-solid": state.selectedElement.id === element.id,
            })}
        >
            {state.selectedElement.id === element.id && (
                <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg ">
                    {state.selectedElement.name}
                </Badge>
            )}

            {/* Display image */}
            <img
                src={"https://placehold.co/600x400"} // Fallback placeholder
                alt={"Image"}
                className="w-full"
                // draggable
                // onClick={() =>
                //     dispatch({
                //         type: "SELECT_ELEMENT",
                //         payload: {
                //             elementDetails: element,
                //         },
                //     })
                // }
            />

            {/* Input for updating image */}
            {state.selectedElement.id === element.id && (
                <div className="absolute top-[5px] left-[5px] flex space-x-2">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id={`upload-${element.id}`}
                        onChange={handleUpdateImage}
                    />
                    <label
                        htmlFor={`upload-${element.id}`}
                        className="bg-primary text-white text-xs px-2 py-1 rounded cursor-pointer"
                    >
                        Change Image
                    </label>
                </div>
            )}

            {/* Delete button */}
            {state.selectedElement.id === element.id && (
                <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
                    <Trash className="cursor-pointer" size={16} onClick={handleDeleteElement} />
                </div>
            )}
        </div>
    );
};
