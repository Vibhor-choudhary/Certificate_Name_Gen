# CertiFast • Instant Professional Certificate Generator

A production-ready, mobile-first web application designed for non-technical users (yoga instructors, teachers, coaches, training institutes) to generate and download print-ready certificates in **under 30 seconds**.

> **Select Certificate → Enter Name → Select Font → Live Preview → Download High-Quality PDF**

---

## 🌟 Key Features

- **⚡ Under 30 Seconds Workflow**: Pure utility focus without complex drag-and-drop clutter.
- **📜 Official Rising Yoga Template**: Built directly from the official Face Yoga certificate with authentic branding, decorative gold borders, and certification seal.
- **✨ Interactive Name Positioning**:
  - Direct drag-and-drop on the live certificate preview.
  - One-tap repositioning anywhere vertically.
  - Dedicated control panel with slider and precision `▲ Up` / `▼ Down` nudge buttons.
- **📏 Automatic Name Fitting**: Smooth font scaling that guarantees long names never overflow boundaries while keeping short names large and prominent.
- **✒️ Curated Typography**:
  - Magnolia Script & Higuen Elegant Serif
  - Cormorant Garamond, Playfair Display, Cinzel, Montserrat, Libre Baskerville, Great Vibes, Allura, Pinyon Script
  - "★ Recommended" badges for each template.
- **📅 Smart Date Option**: Places date text directly on the designated certificate line, with optional fields defaulting to `NA`.
- **➕ "+ Add Your Certificate"**: Upload any PDF or image (PNG/JPG) with real-time browser conversion via PDF.js and instant alignment tools.
- **🖨️ 300 DPI High-Quality PDF Export**: Generates true A4 Landscape (297 × 210 mm) print-ready vector PDFs via `jsPDF`, plus a 300 DPI PNG export for messaging and social sharing.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **PDF Engine**: `jspdf` + `pdfjs-dist` + HTML5 Canvas (300 DPI Rasterization)
- **Delight**: `canvas-confetti`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```text
src/
├── types/
│   └── certificate.ts         # Data models for Templates, Fields, Fonts, Values
├── templates/
│   ├── templateData.ts        # Data-driven template catalog
│   ├── RisingYogaBackground.tsx # Vector template background
│   ├── ModernGoldBackground.tsx # Modern executive diploma background
│   └── ClassicalAcademyBackground.tsx # Classical academy background
├── fonts/
│   └── fontCatalog.ts         # Curated font definitions & category groupings
├── engine/
│   └── autoFit.ts             # 0ms text auto-fitting & boundary calculation
├── pdf/
│   └── pdfGenerator.ts        # 300 DPI A4 landscape PDF & PNG export pipeline
├── utils/
│   └── pdfToImage.ts          # PDF.js in-browser PDF to high-res image converter
└── components/
    ├── Header.tsx             # Clean minimal header with bulk mode trigger
    ├── CertificatePreview.tsx # Responsive SVG preview with direct dragging
    ├── NameInput.tsx          # Real-time name input with suggested names
    ├── NamePositionControls.tsx # Precision sliders & nudge buttons
    ├── FontPicker.tsx         # Curated font picker with live samples & badges
    ├── TemplatePicker.tsx     # Visual cards + "+ Add Your Certificate"
    ├── UploadTemplateModal.tsx# Custom certificate upload & position adjuster
    ├── BulkModeModal.tsx      # Batch generator preview (names.csv architecture)
    └── DownloadSection.tsx    # One-tap 300 DPI PDF download & status handling
```

---

## 📄 License
MIT License
