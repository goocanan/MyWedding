import { Router } from "express";
import { RSVPService } from "../services/rsvp.service";
import { z } from "zod";

const router = Router();

const rsvpSchema = z.object({
	name: z.string().min(2),
	pax: z.number().min(1).max(10),
	attendance: z.enum(["hadir", "tidak_hadir", "ragu"]),
	message: z.string().optional(),
});

// Public: Submit RSVP
router.post("/", async (req, res) => {
	try {
		const validated = rsvpSchema.parse(req.body);
		const result = await RSVPService.create(validated);
		res.status(201).json({ success: true, data: result });
	} catch (error: any) {
		res.status(400).json({ success: false, error: error.message });
	}
});

// Public: Get Guestbook (Publicly visible RSVPs)
router.get("/guestbook", async (req, res) => {
	try {
		const messages = await RSVPService.getAllPublic();
		res.json(messages);
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

export default router;
