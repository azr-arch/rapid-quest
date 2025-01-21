import { Button } from "@/components/ui/button";
import { downloadHtml, generateHtmlFromState } from "@/lib/utils";
import { useEditor } from "@/providers/editor/provider";
import { useState } from "react";

export const Header = () => {
    const { state } = useEditor();
    const [loading, setLoading] = useState(false);

    const onSave = async () => {
        const htmlContent = generateHtmlFromState(state.elements);
        try {
            setLoading(true);
            await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/uploadEmailLayout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ html: htmlContent }),
            });

            console.log("saving this: ", htmlContent);

            alert("Layout saved on backend");
        } catch (error) {
            console.error("Error saving layout:", error);
            console.error("Failed to save layout.");
        } finally {
            setLoading(false);
        }
    };

    // Not working
    // const onFetch = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getEmailLayout`);
    //         const { html } = await response.json();

    //         if (!html) {
    //             throw new Error("Invalid layout data");
    //         }

    //         console.log("getting this : ", html);
    //     } catch (error) {
    //         console.error("Error fetching layout:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const onDownload = () => {
        const htmlString = generateHtmlFromState(state.elements);
        setLoading(true);
        downloadHtml(htmlString);
        setLoading(false);
    };

    return (
        <header className="h-16 flex items-center justify-between px-4">
            <div>
                <p className="text-2xl font-medium">Email Editor</p>
            </div>

            <div className="flex items-center gap-2">
                {/* Not working yet! */}
                {/* <Button disabled={true} className="">
                    Fetch Layout
                </Button> */}

                <Button disabled={loading} onClick={onSave} className="">
                    Save
                </Button>
                <Button disabled={loading} onClick={onDownload} className="">
                    Download
                </Button>
            </div>
        </header>
    );
};
