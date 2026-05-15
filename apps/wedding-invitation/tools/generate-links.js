import fs from 'fs';
import path from 'path';

// KONFIGURASI
const BASE_URL = 'https://undangan-kamu.vercel.app'; // Ganti dengan URL website Anda setelah deploy
const CSV_FILE = 'daftar_tamu.csv'; // Nama file input
const OUTPUT_FILE = 'links_undangan.txt'; // Nama file output

function generateLinks() {
  try {
    const csvPath = path.resolve(CSV_FILE);
    
    if (!fs.existsSync(csvPath)) {
      console.error(`❌ File ${CSV_FILE} tidak ditemukan!`);
      console.log('Silakan buat file daftar_tamu.csv terlebih dahulu.');
      return;
    }

    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split('\n');
    const results = [];

    lines.forEach((line) => {
      const name = line.trim();
      if (name) {
        // Encode nama agar aman di URL (spasi jadi %20, dll)
        const encodedName = encodeURIComponent(name);
        const link = `${BASE_URL}?to=${encodedName}`;
        results.push(`${name}: ${link}`);
      }
    });

    fs.writeFileSync(OUTPUT_FILE, results.join('\n'));
    console.log(`✅ Berhasil! ${results.length} link telah dibuat di ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ Terjadi kesalahan:', error.message);
  }
}

generateLinks();
