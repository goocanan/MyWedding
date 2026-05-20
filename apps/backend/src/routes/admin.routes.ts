import { Router } from "express";
import { db } from "../db";
import { rsvps } from "../db/schema";
import { desc, eq } from "drizzle-orm";

const router = Router();

// Get all RSVPs (the complete manifest)
router.get("/rsvp", async (req, res) => {
	try {
		const results = await db
			.select()
			.from(rsvps)
			.orderBy(desc(rsvps.createdAt));
		res.json({ success: true, data: results });
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get RSVP stats summary
router.get("/stats", async (req, res) => {
	try {
		const results = await db.select().from(rsvps);
		
		let totalSubmissions = results.length;
		let totalAttendingPax = 0;
		let attendingCount = 0;
		let absentCount = 0;
		let maybeCount = 0;

		results.forEach(rsvp => {
			if (rsvp.attendance === "hadir") {
				attendingCount++;
				totalAttendingPax += rsvp.pax || 1;
			} else if (rsvp.attendance === "tidak_hadir") {
				absentCount++;
			} else if (rsvp.attendance === "ragu") {
				maybeCount++;
			}
		});

		res.json({
			success: true,
			data: {
				totalSubmissions,
				totalAttendingPax,
				attendingCount,
				absentCount,
				maybeCount
			}
		});
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Delete RSVP entry from manifest
router.delete("/rsvp/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await db.delete(rsvps).where(eq(rsvps.id, id));
		res.json({ success: true, message: "RSVP successfully removed from manifest" });
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

export default router;
