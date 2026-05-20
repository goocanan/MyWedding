import fs from "fs";
import path from "path";
import { db } from "./src/db/index";
import { rsvps } from "./src/db/schema";

async function importGuests() {
  const csvPath = path.resolve(__dirname, "../../apps/wedding-invitation/daftar_tamu.csv");
  const data = fs.readFileSync(csvPath, "utf-8");
  
  // Parse CSV (just reading line by line since it's a simple list of names)
  const names = data.split("\n").map(n => n.trim()).filter(n => n.length > 0);
  
  console.log(`Found ${names.length} guests in daftar_tamu.csv.`);
  
  let imported = 0;
  for (const name of names) {
    try {
      await db.insert(rsvps).values({
        name: name,
        pax: 1,
        attendance: "ragu", // default status for unconfirmed
      });
      console.log(`✅ Imported: ${name}`);
      imported++;
    } catch (err) {
      console.error(`❌ Failed to import ${name}:`, err);
    }
  }
  
  console.log(`\nDone! Successfully imported ${imported} guests.`);
  process.exit(0);
}

importGuests().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
