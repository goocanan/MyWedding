import { Router } from "express";
import { ConfigService } from "../services/config.service";

const router = Router();

// Public: Get dynamic wedding config
router.get("/:key", async (req, res) => {
	try {
		const config = await ConfigService.get(req.params.key);
		res.json(config);
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Admin: Update config (Should be protected in main index.ts)
router.put("/:key", async (req, res) => {
	try {
		const result = await ConfigService.set(req.params.key, req.body);
		res.json({ success: true, data: result });
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message });
	}
});

export default router;
