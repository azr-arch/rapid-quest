import { useEditor } from "@/providers/editor/provider";
import clsx from "clsx";
import { Recursive } from "./recursive";

const Editor = () => {
    const { dispatch, state } = useEditor();

    const handleClick = () => {
        dispatch({
            type: "CHANGE_CLICKED_ELEMENT",
            payload: {},
        });
    };

    return (
        <div
            style={{ minHeight: "calc(100vh - 66px)" }}
            className={clsx(
                "h-full mr-[385px] flex-1 overflow-auto bg-background transition-all rounded-md",
                {
                    "!w-[850px]": state.deviceType === "Tablet",
                    "!w-[420px]": state.deviceType === "Mobile",
                    "w-full": state.deviceType === "Desktop",
                }
            )}
            onClick={handleClick}
        >
            {Array.isArray(state.elements) &&
                state.elements.map((element) => <Recursive key={element.id} element={element} />)}
        </div>
    );
};

export default Editor;
