import { Router } from "express";
import { auth } from "../middleware/auth";
import { createStory, getAllStoriesGroupedByUser } from "../controllers/story";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the "uploads/" folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Save file with a unique name
  },
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 5MB
});

const router = Router();

router.post("/", auth(), upload.array("media"), createStory);

router.get("/", getAllStoriesGroupedByUser);

export default router;
