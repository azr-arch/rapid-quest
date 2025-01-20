import { EditorElement } from "@/providers/editor/provider";
import { LinkComponent } from "./element-types/link";
import { TextComponent } from "./element-types/text";
import { ContainerComponent } from "./element-types/container";

export const Recursive = ({ element }: { element: EditorElement }) => {
    const typeToComponent: Record<string, React.FC<{ element: EditorElement }>> = {
        text: TextComponent,
        link: LinkComponent,
        container: ContainerComponent,
        __body: ContainerComponent,
        // image: ImageComponent, // Add the ImageComponent here
    };

    // Getting the component based upon type
    const Component = element.type && typeToComponent[element.type];

    if (!Component) {
        return null;
    }

    // Rendering the component with its props
    return <Component element={element} />;
};
