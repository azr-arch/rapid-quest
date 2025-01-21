import express from "express";
import path from "path";
import cors from "cors";

import { router as templateRoutes } from "./routes/template.routes.js";
import { createRouteHandler } from "uploadthing/express";
import { uploadRouter } from "./uploadthings.js";
import dotenv from "dotenv";
import { __dirname } from "./utils/dirname.js";

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(cors());

// Routes
app.use("/api", templateRoutes);
// app.use("/api", uploadRoutes);
app.use(
    "/api/upload",
    createRouteHandler({
        router: uploadRouter,
        config: {
            token: process.env.UPLOADTHING_TOKEN,
            isDev: process.env.NODE_ENV === "development",
        },
    })
);

app.get("/", (_, res) => {
    res.send({ ping: "pong" });
});

app.listen(5000, () => {
    console.log("App is running on server 5000");
});
