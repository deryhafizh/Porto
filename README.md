# Dery Hafizh Latief — Developer Portfolio 🚀

[![Live on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://speedy-piano-0gn4hrk.tmp.now)
[![React 19](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-FF4154?style=for-the-badge&logo=tanstack)](https://tanstack.com/start)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Tests](https://img.shields.io/badge/Tests-100%25%20Passing-success?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> Website portofolio personal **Dery Hafizh Latief (Znt)** — Mahasiswa Informatika Universitas Gunadarma angkatan 2025. Dibangun dengan fokus estetika *warm artisanal coffee*, performa tinggi 60 FPS, serta interaktivitas *3D Isometric Exploded Showcase*.

---

## 🌟 Fitur Utama

- **3D Isometric Exploded Showcase:**
  - Tampilan mockup antarmuka bertingkat di sumbu Z (*exploded depth layers*): Runtime Terminal, GitHub Live Pulse, Web Audio Engine, dan Badge Stack.
  - Interaksi *cursor parallax tilt* responsif dengan interpolasi pegas (*spring-lerp*).
  - Efek pencahayaan lembut *gobo lighting* dan *contact drop shadows*.
  - Tombol pengalih mode: **3D Exploded View** $\leftrightarrow$ **2D Flat Layout**.
- **Real-Time GitHub Activity Pulse:**
  - Mengintegrasikan GitHub REST API publik (`@deryhafizh`) untuk menampilkan aktivitas commit dan repositori terbaru secara langsung dengan auto-cache 10 menit.
- **Procedural Web Audio Engine:**
  - Efek suara interaktif (*micro-interaction hover blips* & audio waveform visualizer) tanpa file MP3/WAV eksternal (0 KB asset size).
- **Smooth Inertia Scrolling:**
  - Pengalaman navigasi mulus menggunakan Lenis momentum scrolling.
- **Artisanal Coffee & Terracotta Aesthetic:**
  - Skema warna hangat (#C25E30 Terracotta, #E09F3E Warm Honey, #FAF8F5 Cream Canvas).

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TanStack Start](https://tanstack.com/start) |
| **Routing & Data** | [TanStack Router](https://tanstack.com/router) & [TanStack Query](https://tanstack.com/query) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Tw-Animate-CSS |
| **Icons & UI** | [Lucide React](https://lucide.dev/) + Radix UI Primitives |
| **Audio** | Procedural Web Audio API |
| **Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Testing** | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| **Deployment Engine** | [Nitro](https://nitro.build/) (Preset: `vercel`) |

---

## 📁 Struktur Direktori

```text
├── src/
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── IsometricShowcase.tsx   # Komponen panggung 3D Isometric Exploded
│   │   │   ├── Navbar.tsx              # Navigasi & audio toggle
│   │   │   ├── Hero.tsx                # Hero section & profile intro
│   │   │   ├── Sections.tsx            # About, Skills, Projects, & Contact
│   │   │   └── GitHubSections.tsx      # Real-time commit & repo timeline
│   │   └── ui/                         # Reusable UI primitives (Radix UI)
│   ├── data/
│   │   └── portfolio.ts                # Sumber data profil, teks, bio, & skills
│   ├── services/
│   │   └── github.ts                   # GitHub REST API client & cache logic
│   ├── test/                           # Vitest unit test suites
│   ├── routes/                         # TanStack Start file-based routing
│   └── styles.css                      # Global styles & keyframe animations
├── vite.config.ts                      # Konfigurasi Vite & TanStack Start
└── package.json
```

---

## 💻 Panduan Instalasi Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/deryhafizh/Porto.git
   cd Porto
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` pada browser Anda.

4. **Jalankan pengujian unit:**
   ```bash
   npm test
   ```

5. **Build produksi:**
   ```bash
   npm run build
   ```

---

## ☁️ Panduan Deploy ke Vercel

### Metode 1: Hubungkan Repositori GitHub ke Vercel (Rekomendasi)
1. Push proyek ke akun GitHub Anda:
   ```bash
   git add .
   git commit -m "feat: complete portfolio with 3D isometric showcase & vercel deploy"
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com/new).
3. Pilih **Add New Project** $\rightarrow$ **Import Git Repository** (`Porto`).
4. Pada bagian **Build Settings**:
   - Framework Preset: **Other** / Auto-detected
   - Build Command: `NITRO_PRESET=vercel npm run build` (atau `npm run build`)
   - Output Directory: `.vercel/output`
5. Klik **Deploy**. Setiap kali Anda melakukan `git push`, Vercel akan otomatis membangun dan merilis versi terbaru.

### Metode 2: Deploy Cepat via Vercel CLI
```bash
$env:NITRO_PRESET="vercel"
npm run build
npx vercel deploy --prebuilt --prod
```

---

## 📬 Kontak

- **Nama:** Dery Hafizh Latief (Znt)
- **Email:** [derycikampek@gmail.com](mailto:derycikampek@gmail.com)
- **GitHub:** [@deryhafizh](https://github.com/deryhafizh)
- **LinkedIn:** [linkedin.com/in/deryhafizh](https://www.linkedin.com/in/deryhafizh/)

---
*Dibuat dengan kopi hangat, baris kode, dan eksplorasi tiada henti.*
