export const weddingConfig = {
  couple: {
    groom: {
      name: "James",
      fullName: "James William Jokanan, S.T.",
      birthDate: "04.10.1998",
      parents: "Bpk. Hendra & Ibu Debora",
      photo: "/assets/GROOM.JPG",
      label: "GROOM",
    },
    bride: {
      name: "Krisda",
      fullName: "Krisda Yanti Ndruru, S.Ak.",
      birthDate: "08.06.1998",
      parents: "Alm. Bpk. Minta Syukur Ndruru & Ibu Feniman Zai",
      photo: "/assets/BRIDE.JPG",
      label: "BRIDE",
    },
  },

  events: [
    {
      title: "Pemberkatan",
      icon: "⚓",
      date: "2026-08-16",
      displayDate: "Minggu, 16 Agustus 2026",
      time: "09:00 – 10:00 WIB",
      venue: "LEVITICUS 11",
      address: "Jl. Penyelesaian Tomang II No.1, Meruya Utara, Jakarta Barat",
      mapsUrl: "https://maps.google.com/?q=LEVITICUS+11+Meruya+Utara",
      calendarTitle: "Pemberkatan James & Krisda",
    },
    {
      title: "Resepsi",
      icon: "🎉",
      date: "2026-08-16",
      displayDate: "Minggu, 16 Agustus 2026",
      time: "10:00 – 12:00 WIB",
      venue: "LEVITICUS 11",
      address: "Jl. Penyelesaian Tomang II No.1, Meruya Utara, Jakarta Barat",
      mapsUrl: "https://maps.google.com/?q=LEVITICUS+11+Meruya+Utara",
      calendarTitle: "Resepsi Pernikahan James & Krisda",
    },
  ],

  targetDate: "2026-08-16T09:00:00+07:00",

  gift: {
    bank: {
      name: "Bank BCA",
      accountNumber: "4290747444",
      accountHolder: "James William Jokanan",
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
    { id: 1, src: "/assets/LOG1.JPG", alt: "Moment 1" },
    { id: 2, src: "/assets/LOG2.JPG", alt: "Moment 2" },
    { id: 3, src: "/assets/LOG3.JPG", alt: "Moment 3" },
    { id: 4, src: "/assets/LOG4.JPG", alt: "Moment 4" },
    { id: 5, src: "/assets/LOG5.JPG", alt: "Moment 5" },
    { id: 6, src: "/assets/LOG6.JPG", alt: "Moment 6" },
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
