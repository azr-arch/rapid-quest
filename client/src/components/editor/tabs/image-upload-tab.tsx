import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import "@uploadthing/react/styles.css";

// const OurUploadButton = () => (
//     <UploadButton
//         content={{ button: "Upload" }}
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//             // Do something with the response
//             console.log("Files: ", res);
//             alert("Upload Completed");
//         }}
//         onUploadError={(error: Error) => {
//             // Do something with the error.
//             alert(`ERROR! ${error.message}`);
//         }}
//         onBeforeUploadBegin={(files) => {
//             // Preprocess files before uploading (e.g. rename them)
//             console.log("upload begin");
//             return files.map((f) => new File([f], "renamed-" + f.name, { type: f.type }));
//         }}
//         onUploadBegin={(name) => {
//             // Do something once upload begins
//             console.log("Uploading: ", name);
//         }}
//     />
// );

const ImageUploadTab = () => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="image-upload" className="px-6 border-y-[1px]">
                <AccordionTrigger className="!no-underline">Upload Image</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2 ">
                    <p className="text-xs text-neutral-500 mb-4">Not working yet</p>
                    <p className="text-neutral-500">
                        {" "}
                        To use the image feature, you can use the{" "}
                        <em className="text-black">Background Image</em> option in settings. Just
                        navigate to Settings -{">"} Background.
                    </p>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        {/* <OurUploadButton /> */}
                        {/* Not working yet */}
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ImageUploadTab;
