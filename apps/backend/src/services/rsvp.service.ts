import { db } from "../db";
import { rsvps } from "../db/schema";
import { desc } from "drizzle-orm";

export type CreateRsvpDTO = {
	name: string;
	pax: number;
	attendance: "hadir" | "tidak_hadir" | "ragu";
	message?: string | undefined;
};

export class RSVPService {
	static async create(data: CreateRsvpDTO) {
		const [result] = await db.insert(rsvps).values(data).returning();
		return result;
	}

	static async getAllPublic() {
		const results = await db
			.select({
				id: rsvps.id,
				name: rsvps.name,
				message: rsvps.message,
				attendance: rsvps.attendance,
				createdAt: rsvps.createdAt,
			})
			.from(rsvps)
			.orderBy(desc(rsvps.createdAt));
		return results;
	}
}
