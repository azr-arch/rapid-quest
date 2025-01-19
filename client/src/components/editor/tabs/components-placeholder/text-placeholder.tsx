import { TypeIcon } from "lucide-react";

const TextPlaceholder = () => {
    return (
        <div
            draggable
            //   onDragStart={(e) => {
            //     handleDragState(e, 'text')
            //   }}
            className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
        >
            <TypeIcon size={40} className="text-muted-foreground" />
        </div>
    );
};

export default TextPlaceholder;
