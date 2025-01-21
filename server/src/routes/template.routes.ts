import express from "express";
import { getLayout, uploadLayout } from "../controllers/template.controller";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (_, res) => {
    console.log("router");
    res.status(201).send({ success: true });
});

router.get("/getEmailLayout", getLayout);
router.post("/uploadEmailLayout", uploadLayout);

export { router };
