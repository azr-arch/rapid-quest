import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const uploadRouter = {
    imageUploader: f(
        {
            image: {
                maxFileSize: "4MB",
                maxFileCount: 1,
            },
        },
        {
            awaitServerData: true,
        }
    )
        .onUploadError(({ error, fileKey }) => {
            console.log("upload error", { message: error.message, fileKey });
            throw error;
        })
        .onUploadComplete(async ({ file }) => {
            console.log("Upload complete for userId:", file);
            console.log("file url", file.url);

            return { uploadedBy: "1234" };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
