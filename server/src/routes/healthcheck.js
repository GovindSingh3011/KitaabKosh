import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/").get(upload.single('avatarnpm i cloudinary'),healthcheck);

export default router;