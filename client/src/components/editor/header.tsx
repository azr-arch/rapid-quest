import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceTypes, useEditor } from "@/providers/editor/provider";

export const Header = () => {
    const { state, dispatch } = useEditor();

    const handleChange = (value: string) => {
        dispatch({
            type: "CHANGE_DEVICE",
            payload: {
                device: value as DeviceTypes,
            },
        });
    };

    return (
        <header className="h-16 flex items-center justify-between px-4">
            <div>
                <p className="text-2xl font-medium">Email Editor</p>
            </div>
            <nav className="flex items-center py-4 px-2">
                <aside className="ml-auto flex items-center gap-2">
                    <Tabs value={state.deviceType} onValueChange={handleChange}>
                        <TabsList>
                            <TabsTrigger value="Desktop">Desktop</TabsTrigger>
                            <TabsTrigger value="Tab">Tab</TabsTrigger>
                            <TabsTrigger value="Mobile">Mobile</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button className="ml-2">Save</Button>
                </aside>
            </nav>
        </header>
    );
};
