export const weddingConfig = {
  couple: {
    groom: {
      name: "James",
      fullName: "James Goocanan, S.T.",
      parents: "Putra ke-2 dari Bpk. Goocanan & Ibu Goocanan",
      photo: null, // placeholder — set path when ready
      label: "THE GROOM",
    },
    bride: {
      name: "Krisda",
      fullName: "Krisda, S.Pd.",
      parents: "Putri ke-1 dari Bpk. Permata & Ibu Permata",
      photo: null,
      label: "THE BRIDE",
    },
  },

  events: [
    {
      title: "Akad Nikah",
      icon: "⚓",
      date: "2026-07-20",
      displayDate: "Minggu, 20 Juli 2026",
      time: "08:00 – 10:00 WIB",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Merdeka No. 10, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=-6.200,106.800",
      calendarTitle: "Akad Nikah James & Krisda",
    },
    {
      title: "Resepsi",
      icon: "🎉",
      date: "2026-07-20",
      displayDate: "Minggu, 20 Juli 2026",
      time: "11:00 – 14:00 WIB",
      venue: "Gedung Serbaguna Mutiara",
      address: "Jl. Sudirman No. 45, Jakarta Selatan",
      mapsUrl: "https://maps.google.com/?q=-6.210,106.810",
      calendarTitle: "Resepsi Pernikahan James & Krisda",
    },
  ],

  targetDate: "2026-07-20T08:00:00+07:00",

  gift: {
    bank: {
      name: "Bank BCA",
      accountNumber: "1234567890",
      accountHolder: "James Goocanan",
    },
    qris: {
      image: null, // placeholder — set path when ready
    },
  },

  audio: {
    src: "/audio/background-music.mp3",
    enabled: false, // set true when mp3 is ready
  },

  gallery: [
    { id: 1, src: null, alt: "Moment 1" },
    { id: 2, src: null, alt: "Moment 2" },
    { id: 3, src: null, alt: "Moment 3" },
    { id: 4, src: null, alt: "Moment 4" },
    { id: 5, src: null, alt: "Moment 5" },
    { id: 6, src: null, alt: "Moment 6" },
  ],

  quotes: {
    religious: {
      text: "Demikianlah tinggal ketiga hal ini, yaitu iman, pengharapan dan kasih, dan yang paling besar di antaranya ialah kasih.",
      source: "1 Korintus 13:13",
    },
    theme: {
      text: "The sea is vast, but our love is the greatest treasure we've ever found.",
      source: "— Our Grand Adventure —",
    },
  },
};

/**
 * Generate a Google Calendar URL from event data
 */
export function generateCalendarUrl(event) {
  const startDate = event.date.replace(/-/g, '');
  const title = encodeURIComponent(event.calendarTitle);
  const location = encodeURIComponent(`${event.venue}, ${event.address}`);
  const details = encodeURIComponent("Undangan Pernikahan James & Krisda");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${startDate}&location=${location}&details=${details}`;
}
