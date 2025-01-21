import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlusIcon, PlusIcon, SettingsIcon } from "lucide-react";

export const MenuTabList = () => {
    return (
        <TabsList className="flex flex-col items-center justify-start px-2 h-full bg-background space-y-2">
            <TabsTrigger value="settings" className="data-[state=active]:bg-muted ">
                <SettingsIcon className="" />
            </TabsTrigger>
            <TabsTrigger value="components" className="data-[state=active]:bg-muted ">
                <PlusIcon />
            </TabsTrigger>
            <TabsTrigger value="image-upload" className="data-[state=active]:bg-muted">
                <ImagePlusIcon />
            </TabsTrigger>
        </TabsList>
    );
};
