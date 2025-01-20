import { EditorProvider } from "@/providers/editor/provider";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Editor from "./editor";

export const EmailEditor = () => {
    return (
        <EditorProvider>
            <Header />
            {/* Editor content */}
            <div
                style={{ width: "calc(100vw - 390px)" }}
                className="  w-full h-full flex items-center border border-neutral-300 "
            >
                <Editor />
            </div>
            <Sidebar />
        </EditorProvider>
    );
};
