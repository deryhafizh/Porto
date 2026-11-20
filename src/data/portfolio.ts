// Semua isi teks website ada di sini. Ubah file ini untuk memperbarui konten.
// Teksnya mengikuti README profil GitHub Dery (github.com/deryhafizh/deryhafizh).

export const profile = {
  name: "Dery Hafizh Latief",
  nickname: "Znt",
  brand: "DERY.H",
  title: "Informatics Student & Aspiring Developer",
  tagline: "Building Ideas Into Digital Experiences.",
  greeting: "Halo, aku Dery",
  motto: "ngopi dulu, ngoding kemudian",
  university: "Universitas Gunadarma",
  major: "Informatika",
  year: "2025",
  focus: "Programming & software development",
  email: "derycikampek@gmail.com",
  githubUser: "deryhafizh",
  github: "https://github.com/deryhafizh/deryhafizh",
  githubProfile: "https://github.com/deryhafizh",
  linkedin: "https://www.linkedin.com/in/deryhafizh/",
};

// Kalimat pembuka di bagian paling atas, setelah tagline.
export const heroIntro =
  "Mahasiswa Informatika Universitas Gunadarma yang lagi belajar, bereksperimen, dan pelan-pelan mengubah ide jadi aplikasi yang bisa dipakai.";

export const navLinks = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Proyek", href: "#projects" },
  { label: "Update", href: "#github" },
];

export const aboutText =
  "Aku mahasiswa Informatika Universitas Gunadarma angkatan 2025. Aku tertarik pada programming, software development, dan teknologi baru. Masih belajar, tapi senang bereksperimen dan membangun proyek kecil supaya paham cara kerja teknologi.";

// Ditampilkan seperti blok teks di README.
export const aboutFacts = [
  ["Nama", "Dery Hafizh Latief (Znt)"],
  ["Kampus", "Universitas Gunadarma, Informatika '25"],
  ["Status", "Currently learning & building"],
  ["Fokus", "Programming & software development"],
  ["Bahan bakar", "Kopi, lagu santai, dan rasa penasaran"],
] as const;

export const quote = "Setiap baris kode adalah kesempatan untuk belajar sesuatu yang baru.";

// level: "Beginner" | "Learning" | "Exploring" (tanpa persentase)
export const skills = [
  { name: "HTML", level: "Learning", description: "Menyusun halaman web yang rapi dan semantik." },
  { name: "CSS", level: "Learning", description: "Belajar layout responsif dan tampilan modern." },
  { name: "JavaScript", level: "Exploring", description: "Mencoba web interaktif dan logika pemrograman." },
  { name: "Python", level: "Beginner", description: "Dasar pemrograman, problem solving, dan analisis data sederhana." },
] as const;

export const tools = ["Git", "GitHub"];

export const learningPlan = [
  { done: true, text: "Dasar HTML & membuat halaman web" },
  { done: true, text: "Dasar Python & analisis data sederhana" },
  { done: false, text: "CSS responsif & tampilan modern" },
  { done: false, text: "JavaScript untuk web interaktif" },
  { done: false, text: "Algoritma & competitive programming" },
  { done: false, text: "Bikin proyek kolaborasi pertama" },
];

export const beyondCode = [
  { title: "Competitive Programming", text: "melatih logika, algoritma, dan problem solving." },
  { title: "Software Development", text: "mengubah ide jadi produk digital yang berfungsi." },
  { title: "Continuous Learning", text: "belajar lewat praktik dan eksperimen langsung." },
  { title: "Kolaborasi", text: "bertukar ide dan mengerjakan proyek bermakna bersama." },
];

// Catatan proyek dari README. Dipakai kalau repo di GitHub belum punya deskripsi.
export const projectNotes: Record<string, string> = {
  "Project-IMDB-Statistik":
    "Analisis statistik dari dataset IMDB. Isinya app.py, data IMDB.csv, dan requirements.txt supaya mudah dijalankan ulang. Tempat aku latihan mengolah data dan membaca pola dari angka.",
  "Zeta-web-byZnt":
    "Website bertema Vestia Zeta (Hololive ID) yang kubuat dari nol dengan index.html dan style.css. Ada halaman media sosial dan mini game roll (Game.html + game.py) dengan hasil epic, langka, dan gagal.",
};

// Tautan demo dari README GitHub, ketika kolom Website repo belum diisi.
export const projectDemos: Record<string, string> = {
  "Project-IMDB-Statistik": "https://project-imdb-statistik-o67m6svvssvp973uvaqwc6.streamlit.app/",
  "Zeta-web-byZnt": "https://deryhafizh.github.io/Zeta-web-byZnt/",
};

// Proyek nyata dari README yang repositorinya belum publik, jadi hanya ada link demo.
export const extraProjects = [
  {
    name: "The Trust Trap Guardian",
    language: "React",
    description:
      "Detektor heuristik penipuan digital untuk pesan berbahasa Indonesia. Menganalisis pesan atau tautan secara lokal, menjelaskan tanda manipulasi, dan memberikan langkah penyelamatan melalui alur Recognize, Act, Learn.",
    demoUrl: "https://trusttrapguardian.vercel.app/",
    repoUrl: "https://github.com/Micho-Anta/TrustTrapGuardian",
  },
];
