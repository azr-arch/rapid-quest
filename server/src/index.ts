import express from "express";
import path from "path";

import { router as templateRoutes } from "./routes/template.routes";

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

// Routes
app.use("/api", templateRoutes);

app.get("/", (req, res) => {
    res.send({ ping: "pong" });
});

app.listen(5000, () => {
    console.log("App is running on server 5000");
});
