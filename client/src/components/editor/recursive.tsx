import { EditorElement } from "@/providers/editor/provider";
import { LinkComponent } from "./element-types/link";
import { TextComponent } from "./element-types/text";
import { ContainerComponent } from "./element-types/container";

export const Recursive = ({ element }: { element: EditorElement }) => {
    const typeToComponent: Record<string, React.FC<{ element: EditorElement }>> = {
        text: TextComponent,
        link: LinkComponent,
        container: ContainerComponent,
        // image: ImageComponent, // Add the ImageComponent here
    };

    // Get the component based on the type
    const Component = element.type && typeToComponent[element.type];

    // Handle missing or unknown types
    if (!Component) {
        return null;
    }

    // Render the component
    return <Component element={element} />;
};
