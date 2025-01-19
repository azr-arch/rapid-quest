import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Header = () => {
    return (
        <header className="h-16 flex items-center justify-between px-4">
            <div>
                <p className="text-2xl font-medium">Email Editor</p>
            </div>
            <nav className="flex items-center py-4 px-2">
                <aside className="ml-auto flex items-center gap-2">
                    <Tabs defaultValue="desktop">
                        <TabsList>
                            <TabsTrigger value="desktop">Desktop</TabsTrigger>
                            <TabsTrigger value="tab">Tab</TabsTrigger>
                            <TabsTrigger value="mobile">Mobile</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Button className="ml-2">Save</Button>
                </aside>
            </nav>
        </header>
    );
};
