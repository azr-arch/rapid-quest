import path from "path";
import { Request, Response } from "express";

function getLayout(req: Request, res: Response) {
    const layoutPath = path.resolve(__dirname, "../template-layout/layout.html");
    res.sendFile(layoutPath);
}

export { getLayout };
