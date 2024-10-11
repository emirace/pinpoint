import { Router } from "express";
import {
  addNoteToLead,
  approveOrDeclineLead,
  createLead,
  getPartnerLeads,
} from "../controllers/lead";
import { leadValidation } from "../utils/validations";
import { auth } from "../middleware/auth";
import { check } from "express-validator";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Multer config
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.get("/partner", auth(), getPartnerLeads);

router.post("/", auth(), leadValidation, upload.array("media"), createLead);

router.put(
  "/:leadId/note",
  auth(),
  [check("note").notEmpty().withMessage("Note is required")],
  addNoteToLead
);

// Route to approve or decline a lead by partner
router.put(
  "/:leadId/status",
  auth(),
  [
    check("status")
      .isIn(["approved", "declined"])
      .withMessage("Status must be either 'approved' or 'declined'"),
  ],
  approveOrDeclineLead
);

export default router;
