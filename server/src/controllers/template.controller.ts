import path from "path";
import { Request, Response } from "express";
import fs from "fs";

const layoutPath = path.resolve(__dirname, "../template-layout/layout.html");
function getLayout(_: Request, res: Response) {
    // Currently This does not work on client
    fs.readFile(layoutPath, "utf-8", (err, data) => {
        if (err) {
            console.error("Error reading layout file:", err);
            return res.status(500).json({ success: false, message: "Failed to read layout file" });
        }

        res.status(200).json({ success: true, html: data });
    });
}

function uploadLayout(req: Request, res: Response) {
    try {
        const { html } = req.body;

        if (!html) {
            res.status(400).send({ success: false, message: "HTML content is required" });
        }

        fs.writeFile(layoutPath, html, (err) => {
            if (err) {
                console.error("Failed to save layout:", err);
                res.status(500).send({ success: false, message: "Failed to save layout" });
            }

            res.status(201).send({ success: true, message: "Layout saved successfully" });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).send({ success: true, message: "Internal server error " });
    }
}

export { getLayout, uploadLayout };
