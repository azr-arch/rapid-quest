import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import clsx from "clsx";
import { MenuTabList } from "./menu-tab-list";
import SettingsTab from "./tabs/settings-tab";
import ComponentsTab from "./tabs/components-tab";

export const Sidebar = () => {
    return (
        <Sheet modal={false} open={true}>
            <Tabs className="w-full" defaultValue="settings">
                <SheetContent
                    // showX={false}
                    side="right"
                    className={clsx(
                        "mt-[64px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden"
                    )}
                >
                    <MenuTabList />
                </SheetContent>

                <SheetContent className=" border border-neutral-300 mt-[64px] w-80 mr-16 z-[50] p-0  transition-all overflow-hidden">
                    <TabsContent value="settings">
                        <SettingsTab />
                    </TabsContent>
                    <TabsContent value="components">
                        <ComponentsTab />
                    </TabsContent>
                </SheetContent>
            </Tabs>
        </Sheet>
    );
};
