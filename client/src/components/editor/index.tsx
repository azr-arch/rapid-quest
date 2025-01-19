import { EditorProvider } from "@/providers/editor/provider";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import Editor from "./editor";

export const EmailEditor = () => {
    return (
        <EditorProvider>
            <Header />
            {/* Editor content */}
            <div className="w-full h-full flex items-center mr-[385px] border border-neutral-300 ">
                <Editor />
            </div>
            <Sidebar />
        </EditorProvider>
    );
};
