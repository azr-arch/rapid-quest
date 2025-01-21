import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import clsx from "clsx";
import { MenuTabList } from "./menu-tab-list";
import SettingsTab from "./tabs/settings-tab";
import ComponentsTab from "./tabs/components-tab";
import ImageUploadTab from "./tabs/image-upload-tab";

export const Sidebar = () => {
    return (
        <Sheet modal={false} open={true}>
            <Tabs className="w-full" defaultValue="settings">
                <SheetContent
                    // showX={false}
                    side="right"
                    className={clsx(
                        "w-16 mt-[64px] z-[80]  pb-[60px]  shadow-none  p-0 focus:border-none transition-all overflow-hidden"
                    )}
                >
                    <MenuTabList />
                </SheetContent>

                <SheetContent className=" mt-[64px] pb-[60px]  border border-neutral-300 w-80 mr-16 z-[50] p-0  transition-all">
                    <TabsContent value="settings">
                        <SettingsTab />
                    </TabsContent>
                    <TabsContent value="components">
                        <ComponentsTab />
                    </TabsContent>
                    <TabsContent value="image-upload">
                        <ImageUploadTab />
                    </TabsContent>
                </SheetContent>
            </Tabs>
        </Sheet>
    );
};
