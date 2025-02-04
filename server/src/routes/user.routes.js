import { Router } from 'express';
import { registerUser } from '../controllers/user.controllers.js';
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.post("/register",
    (req, res, next) => {
        upload.fields([
            { name: 'avatar', maxCount: 1 },
            { name: 'coverImage', maxCount: 1 }
        ])(req, res, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            }
            next();
        });
    },
    registerUser
);

export default router;