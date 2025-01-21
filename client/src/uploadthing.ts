// NOt in use

import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
    type GenerateTypedHelpersOptions,
} from "@uploadthing/react";

import type { OurFileRouter } from "../../server/src/uploadthings";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const initOpts = {
    url: `${BACKEND_URL}/api/upload`,
} satisfies GenerateTypedHelpersOptions;

export const UploadButton = generateUploadButton<OurFileRouter>(initOpts);
export const UploadDropzone = generateUploadDropzone<OurFileRouter>(initOpts);

export const { useUploadThing } = generateReactHelpers<OurFileRouter>(initOpts);
