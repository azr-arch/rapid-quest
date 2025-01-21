import express from "express";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "../uploadthings";

const router = express.Router();

// Currently only assets upload supports not fetching.
router.get(
    "/upload",
    createRouteHandler({
        router: uploadRouter,
    })
);

export { router };
