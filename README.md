# 🎓 Capstone Project: Teori Bahasa dan Automata (TBO) Simulator Web
Aplikasi berbasis web responsive untuk mensimulasikan konsep-konsep utama dalam Teori Bahasa dan Automata, mulai dari Finite State Automata (FSA) hingga Chomsky Normal Form (CNF) beserta visualisasi pohon penurunannya.

---

## 🚀 Anggota Tim & Identitas Proyek
* **Nama Lengkap:** Ari mauludin
* **NIM:** 301240044
* **Kelas:** 4C
* **Tautan Aplikasi Live:** `https://tbo-capstone-projeck-4c-git-main-arimauludins-projects.vercel.app/`
* **Video Demo YouTube:** `https://youtu.be/VF4tf1TMv0w`
* **Link Github** `https://github.com/Arimauludin/tbo-capstone-projeck-4c.git`

---

## 🎯 Pemenuhan Capaian Pembelajaran Mata Kuliah (CPMK)

Aplikasi ini dirancang dan dibangun untuk memenuhi seluruh indikator kompetensi pada silabus CPMK:

### 🧩 [CPMK 1] - Konsep Dasar Bahasa Formal & FSA
* **Implementasi:** Modul 1 menyediakan mesin simulator komputasi grafis berbasis teks untuk menguji string terhadap aturan formal bahasa reguler.
* **Fitur:** Pengecekan status kelulusan string secara sekuensial.

### ⚙️ [CPMK 2] - Perancangan DFA & Mesin Ber-Output (Moore/Mealy)
* **Implementasi:** Ekstensi Modul 1 yang mencakup simulator **Deterministic Finite Automata (DFA)** bawaan serta **Moore Machine** dan **Mealy Machine**.
* **Fitur:** Pelacakan (*Trace*) lintasan perubahan state langkah-demi-langkah beserta string output yang dicetak secara dinamis berdasarkan karakter biner (`0` atau `1`).

### 🌲 [CPMK 3] - Transformasi CFG ke CNF & Derivation Tree
* **Implementasi:** Modul 4 menyediakan pengubah tata bahasa bebas konteks (*Context-Free Grammar*) menjadi **Chomsky Normal Form (CNF)**.
* **Fitur:** Penelusuran otomatis aturan produksi bercabang (`|`) dan penggambaran **Pohon Penurunan (*Derivation Tree*)** hierarkis secara *real-time* menggunakan karakter struktural monospaced (`└──`, `├──`).

### 🌐 [CPMK 4] - Integrasi Web, Repositori Git, & Deployment
* **Implementasi:** Seluruh arsitektur kode diintegrasikan ke dalam ekosistem SPA (*Single Page Application*) menggunakan **React** dan **Vite**, dikelola melalui **GitHub**, dan dideploy secara publik menggunakan domain personal berakhiran `.my.id`.

---

## 📂 Struktur Repositori & Folder Kode

Proyek ini menerapkan prinsip pemisahan fungsional (*Separation of Concerns*) antara antarmuka pengguna (UI) dan mesin logika automata (*Engine Core*):

```text
tbo-capstone-project/
├── src/
│   ├── components/
│   │   └── core/                 <-- [OTAK LOGIKA / ENGINE AUTOMATA]
│   │       ├── fsa/
│   │       │   ├── dfaSimulator.js
│   │       │   └── mealyMooreSimulator.js
│   │       ├── pda/
│   │       │   └── pdaSimulator.js
│   │       └── chomsky/
│   │           └── cnfConverter.js
│   ├── pages/                    <-- [ANTARMUKA PENGGUNA / UI RESPONSIVE]
│   │   ├── FSAPage.jsx           (Modul 1: DFA & Moore/Mealy)
│   │   ├── RegexPage.jsx         (Modul 2: Regular Expression)
│   │   ├── PDAPage.jsx           (Modul 3: Pushdown Automata)
│   │   └── ChomskyPage.jsx       (Modul 4: CNF & Derivation Tree)
│   ├── App.jsx                   (Manajer Tab & Layout Utama)
│   └── main.jsx                  (Entry Point Aplikasi VITE)
├── package.json
└── README.md                     (Dokumentasi Proyek)