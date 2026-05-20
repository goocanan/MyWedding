import { Request, Response, NextFunction } from "express";
import { auth } from "../auth";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const headers = new Headers();
		for (const [key, value] of Object.entries(req.headers)) {
			if (value) {
				if (Array.isArray(value)) {
					value.forEach(v => headers.append(key, v));
				} else {
					headers.set(key, value);
				}
			}
		}

		const session = await auth.api.getSession({
			headers,
		});

		if (!session) {
			return res.status(401).json({ success: false, error: "Unauthorized: No active session found." });
		}

		// Attach user and session context
		(req as any).user = session.user;
		(req as any).session = session.session;

		next();
	} catch (error: any) {
		res.status(500).json({ success: false, error: error.message || "Authentication error" });
	}
};
