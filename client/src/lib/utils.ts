import { EditorElement } from "@/providers/editor/provider";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const isJsonString = (str: string) => {
    try {
        const parsed = JSON.parse(str);

        return typeof parsed === "object" && parsed !== null;
    } catch (e) {
        return false;
    }
};

// Convert Html back to State
// export const parseHtmlToState = (html: string): EditorElement[] => {

//     const parseElement = (element: HTMLElement): EditorElement => {
//         const styles: React.CSSProperties = {};
//         for (const style of element.style) {
//             styles[style] = element.style[style as any];
//         }

//         const editorElement: EditorElement = {
//             id: element.id || `id-${Math.random().toString(36).substr(2, 9)}`,
//             type: element.tagName.toLowerCase(),
//             styles,
//             name: element.tagName,
//             content: [],
//         };

//         if (element.children.length > 0) {
//             editorElement.content = Array.from(element.children).map((child) =>
//                 parseElement(child as HTMLElement)
//             );
//         } else {
//             editorElement.content = {
//                 innerText: element.textContent || "",
//                 href: element.getAttribute("href") || undefined,
//                 src: element.getAttribute("src") || undefined,
//             };
//         }

//         return editorElement;
//     };

//     return Array.from().map((child) => parseElement(child as HTMLElement));
// }

// Convert Editor state to HTML
export const generateHtmlFromState = (elements: EditorElement[]): string => {
    return elements
        .map((el) => {
            if (Array.isArray(el.content)) {
                return `<div
                    id=${el.id}
                style="${inlineStyles(el.styles)}">${generateHtmlFromState(el.content)}</div>`;
            } else if (el.type === "link") {
                return `<a id=${el.id} href="${el.content.href}" style="${inlineStyles(
                    el.styles
                )}">${el.content.innerText}</a>`;
            } else if (el.type === "text") {
                return `<p  id=${el.id}   style="${inlineStyles(el.styles)}">${
                    el.content.innerText
                }</p>`;
            }
            return `<div id=${el.id} style="${inlineStyles(el.styles)}">${el.name}</div>`;
        })
        .join("");
};

export const inlineStyles = (styles: React.CSSProperties): string => {
    return Object.entries(styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}:${value}`)
        .join(";");
};

// Function to convert HTML string back to editor state
// export const generateStateFromHtml = (htmlString: string): EditorElement[] => {
//     // Clean the HTML string
//     const cleanHtml = htmlString.replace(/[\n\r]/g, "").trim();

//     // If empty, return initial state structure
//     if (!cleanHtml) {
//         return [
//             {
//                 content: [],
//                 id: "__body",
//                 name: "Body",
//                 styles: {},
//                 type: "__body",
//             },
//         ];
//     }

//     // Parse the HTML string into elements
//     const parseContent = (content: string): EditorElement[] => {
//         const elements: EditorElement[] = [];
// // Need to work on this
//         const segments = content.split(/(<[^>]+>|[^<]+)/g).filter(Boolean);

//         for (const segment of segments) {
//             if (segment.trim()) {
//                 if (segment.startsWith("<")) {
//                     elements.push({
//                         id: v4(),
//                         type: "container", // You might want to determine the actual type
//                         styles: {},
//                         name: segment.replace(/<|>/g, "").trim(),
//                         content: [], // You might want to parse nested content here
//                     });
//                 } else {
//                     elements.push({
//                         id: v4(),
//                         type: "text",
//                         styles: {},
//                         name: "Text",
//                         content: {
//                             innerText: segment.trim(),
//                         },
//                     });
//                 }
//             }
//         }

//         return elements;
//     };

//     // Start with the body element
//     const bodyElement: EditorElement = {
//         content: parseContent(cleanHtml),
//         id: "__body",
//         name: "Body",
//         styles: {},
//         type: "__body",
//     };

//     return [bodyElement];
// };

export const downloadHtml = (htmlContent: string) => {
    // Create full HTML document
    const fullHtml = createFullHtmlDocument(htmlContent);

    // Create a blob with the complete HTML document
    const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.download = "email-template.html"; // Name of the downloaded file

    // Programmatically click the link to trigger download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const createFullHtmlDocument = (contentHtml: string): string => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    ${contentHtml}
</body>
</html>`;
};
