import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import ContainerPlaceholder from "./components-placeholder/container-placeholder";
import LinkPlaceholder from "./components-placeholder/link-placeholder";
import TextPlaceholder from "./components-placeholder/text-placeholder";
import ImagePlaceholder from "./components-placeholder/image-placeholder";

const elements = [
    {
        Component: <TextPlaceholder />,
        label: "Text",
        id: "text",
        group: "elements",
    },
    {
        Component: <ContainerPlaceholder />,
        label: "Container",
        id: "container",
        group: "layout",
    },
    {
        Component: <LinkPlaceholder />,
        label: "Link",
        id: "link",
        group: "elements",
    },
    {
        Component: <ImagePlaceholder />,
        label: "Image",
        id: "image",
        group: "elements",
    },
];
const ComponentsTab = () => {
    return (
        <Accordion type="multiple" className="w-full" defaultValue={["Layout", "Elements"]}>
            <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
                <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2 ">
                    {elements
                        .filter((element) => element.group === "layout")
                        .map((element) => (
                            <div
                                key={element.id}
                                className="flex-col items-center justify-center flex"
                            >
                                {element.Component}
                                <span className="text-muted-foreground">{element.label}</span>
                            </div>
                        ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="Elements" className="px-6 py-0 ">
                <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2 ">
                    {elements
                        .filter((element) => element.group === "elements")
                        .map((element) => (
                            <div
                                key={element.id}
                                className="flex-col items-center justify-center flex"
                            >
                                {element.Component}
                                <span className="text-muted-foreground">{element.label}</span>
                            </div>
                        ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

export default ComponentsTab;
