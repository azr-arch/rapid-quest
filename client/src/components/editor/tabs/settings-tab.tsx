import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/provider";
import {
    AlignCenter,
    AlignHorizontalJustifyCenterIcon,
    AlignHorizontalJustifyEndIcon,
    AlignHorizontalJustifyStart,
    AlignHorizontalSpaceAround,
    AlignHorizontalSpaceBetween,
    AlignJustify,
    AlignLeft,
    AlignRight,
    AlignVerticalJustifyCenter,
    AlignVerticalJustifyStart,
} from "lucide-react";

const SettingsTab = () => {
    const { state, dispatch } = useEditor();

    const handleOnChanges = (e: any) => {
        const styleSettings = e.target.id;
        let value = e.target.value;
        const styleObject = {
            [styleSettings]: value,
        };

        dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
                elementDetails: {
                    ...state.selectedElement,
                    styles: {
                        ...state.selectedElement.styles,
                        ...styleObject,
                    },
                },
            },
        });
    };

    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="Typography" className="px-6 mt-0 border-y-[1px]">
                <AccordionTrigger className="!no-underline">Typography</AccordionTrigger>
                <AccordionContent className="px-2 flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-muted-foreground">Text Align</p>
                        <Tabs
                            onValueChange={(value) => {
                                handleOnChanges({
                                    target: {
                                        id: "textAlign",
                                        value,
                                    },
                                });
                            }}
                            value={state.selectedElement.styles.textAlign}
                        >
                            <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                                <TabsTrigger
                                    value="left"
                                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                >
                                    <AlignLeft size={18} />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="right"
                                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                >
                                    <AlignRight size={18} />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="center"
                                    className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                                >
                                    <AlignCenter size={18} />
                                </TabsTrigger>
                                <TabsTrigger
                                    value="justify"
                                    className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                                >
                                    <AlignJustify size={18} />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-muted-foreground">Color</p>
                        <Input
                            id="color"
                            onChange={handleOnChanges}
                            value={state.selectedElement.styles.color}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="space-y-2">
                            <Label className="text-muted-foreground font-normal">Weight</Label>
                            <Select
                                onValueChange={(e) =>
                                    handleOnChanges({
                                        target: {
                                            id: "font-weight",
                                            value: e,
                                        },
                                    })
                                }
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a weight" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Font Weights</SelectLabel>
                                        <SelectItem value="bold">Bold</SelectItem>
                                        <SelectItem value="normal">Regular</SelectItem>
                                        <SelectItem value="lighter">Light</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-muted-foreground font-normal">Size</Label>
                            <Input
                                placeholder="px"
                                id="fontSize"
                                onChange={handleOnChanges}
                                value={state.selectedElement.styles.fontSize}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Decorations" className="px-6 py-0 ">
                <AccordionTrigger className="!no-underline">Background</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Label className="text-muted-foreground font-normal">
                            Background Color
                        </Label>
                        <div className="flex  border-[1px] rounded-md overflow-clip">
                            <div
                                className="w-12 "
                                style={{
                                    color: state.selectedElement.styles.backgroundColor,
                                }}
                            />
                            <Input
                                placeholder="#HFI245"
                                className="!border-y-0 rounded-none !border-r-0 mr-2  focus-visible:ring-0"
                                id="backgroundColor"
                                onChange={handleOnChanges}
                                value={state.selectedElement.styles.backgroundColor}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label className="text-muted-foreground font-normal">
                            Background Image
                        </Label>
                        <div className="flex  border-[1px] rounded-md overflow-clip">
                            <Input
                                placeholder="#HFI245"
                                className="!border-y-0 rounded-none !border-r-0 mr-2  focus-visible:ring-0"
                                id="backgroundImage"
                                onChange={handleOnChanges}
                                value={state.selectedElement.styles.backgroundImage}
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Flexbox" className="px-6 py-0 ">
                <AccordionTrigger className="!no-underline">Flexbox</AccordionTrigger>
                <AccordionContent className="px-2 flex flex-col gap-2">
                    <Label className="text-muted-foreground">Justify Content</Label>
                    <Tabs
                        onValueChange={(e) =>
                            handleOnChanges({
                                target: {
                                    id: "justifyContent",
                                    value: e,
                                },
                            })
                        }
                        value={state.selectedElement.styles.justifyContent}
                    >
                        <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                            <TabsTrigger
                                value="space-between"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                            >
                                <AlignHorizontalSpaceBetween size={18} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="space-evenly"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                            >
                                <AlignHorizontalSpaceAround size={18} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="center"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                            >
                                <AlignHorizontalJustifyCenterIcon size={18} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="start"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                            >
                                <AlignHorizontalJustifyStart size={18} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="end"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                            >
                                <AlignHorizontalJustifyEndIcon size={18} />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <Label className="text-muted-foreground">Align Items</Label>
                    <Tabs
                        onValueChange={(e) =>
                            handleOnChanges({
                                target: {
                                    id: "alignItems",
                                    value: e,
                                },
                            })
                        }
                        value={state.selectedElement.styles.alignItems}
                    >
                        <TabsList className="flex items-center flex-row justify-between border-[1px] rounded-md bg-transparent h-fit gap-4">
                            <TabsTrigger
                                value="center"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted"
                            >
                                <AlignVerticalJustifyCenter size={18} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="normal"
                                className="w-10 h-10 p-0 data-[state=active]:bg-muted "
                            >
                                <AlignVerticalJustifyStart size={18} />
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="flex items-center gap-2">
                        <Input
                            className="h-4 w-4"
                            placeholder="px"
                            type="checkbox"
                            id="display"
                            onChange={(va) => {
                                handleOnChanges({
                                    target: {
                                        id: "display",
                                        value: va.target.checked ? "flex" : "block",
                                    },
                                });
                            }}
                        />
                        <Label className="text-muted-foreground">Flex</Label>
                    </div>
                    <div>
                        <Label className="text-muted-foreground"> Direction</Label>
                        <Input
                            placeholder="px"
                            id="flexDirection"
                            onChange={handleOnChanges}
                            value={state.selectedElement.styles.flexDirection}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="Dimesions" className="px-6 py-0 ">
                <AccordionTrigger className="!no-underline">Dimensions</AccordionTrigger>
                <AccordionContent className="px-2 flex flex-col gap-2">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center border border-neutral-200 rounded-md px-2">
                            <Label className="text-muted-foreground font-normal">W</Label>
                            <Input
                                placeholder="px %"
                                id="width"
                                onChange={handleOnChanges}
                                value={state.selectedElement.styles.width}
                                className="grow border-none shadow-none focus-visible:ring-0"
                            />
                        </div>
                        <div className="flex items-center border border-neutral-200 rounded-md px-1">
                            <Label className="text-muted-foreground font-normal">H</Label>
                            <Input
                                placeholder="px %"
                                id="height"
                                onChange={handleOnChanges}
                                className="grow  border-none shadow-none focus-visible:ring-0"
                            />
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default SettingsTab;
