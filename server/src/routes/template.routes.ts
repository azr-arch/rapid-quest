import express from "express";
import { getLayout } from "../controllers/template.controller";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("router");
    res.status(201).send({ success: true });
});

router.get("/getEmailLayout", getLayout);

export { router };
