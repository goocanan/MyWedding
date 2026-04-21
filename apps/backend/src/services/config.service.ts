import { db } from "../db";
import { appConfigs } from "../db/schema";
import { eq } from "drizzle-orm";

export class ConfigService {
	static async set(key: string, value: any) {
		const existingRows = await db.select().from(appConfigs).where(eq(appConfigs.key, key)).limit(1);
		const existing = existingRows[0];

		if (existing) {
			const [result] = await db
				.update(appConfigs)
				.set({ value, updatedAt: new Date() })
				.where(eq(appConfigs.key, key))
				.returning();
			return result;
		}

		const [result] = await db
			.insert(appConfigs)
			.values({ key, value })
			.returning();
		return result;
	}

	static async get(key: string) {
		const result = await db.select().from(appConfigs).where(eq(appConfigs.key, key)).limit(1);
		return result[0]?.value || null;
	}

	static async getAll() {
		return db.select().from(appConfigs);
	}
}
