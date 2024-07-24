import { Router } from "express";
import { formController } from "../controllers/formController";

const router = Router();

router.post("/submit", formController.submit);

export default router;
