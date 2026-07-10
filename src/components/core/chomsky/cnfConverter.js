/**
 * Converter Aturan Produksi CFG ke Chomsky Normal Form (CNF) Sederhana
 * 
 * @param {string} rawProductions - Teks aturan produksi input dari user
 * @returns {Object} Hasil ekstraksi dan konversi CNF
 */
export function convertToCNF(rawProductions) {
  try {
    if (!rawProductions.trim()) {
      return { success: false, original: [], cnf: [], error: 'Aturan produksi tidak boleh kosong!' };
    }

    const lines = rawProductions.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const originalRules = [];
    const cnfRules = [];
    let varCounter = 1;

    for (let line of lines) {
      // Format validasi standar: S -> AB atau S -> a
      if (!line.includes('->')) {
        return { success: false, original: [], cnf: [], error: `Format baris salah: "${line}". Gunakan penanda "->" (Contoh: S -> AB)` };
      }

      const [left, right] = line.split('->').map(s => s.trim());
      originalRules.push(`${left} ➔ ${right}`);

      // Memisahkan opsi union/percabangan (jika memakai tanda '|')
      const options = right.split('|').map(o => o.trim());

      for (let opt of options) {
        if (opt.length === 1) {
          // Rule 1: Sudah berbentuk CNF jika panjangnya 1 terminal/variabel (A -> a)
          cnfRules.push(`${left} ➔ ${opt}`);
        } else if (opt.length === 2 && opt === opt.toUpperCase()) {
          // Rule 2: Sudah berbentuk CNF jika panjangnya tepat 2 variabel kapital (A -> BC)
          cnfRules.push(`${left} ➔ ${opt}`);
        } else {
          // Koreksi & Penyederhanaan Otomatis ke bentuk CNF (Chomsky Tipe 2)
          // Memecah string panjang atau perpaduan terminal-variabel menjadi variabel baru
          let currentLeft = left;
          let remaining = opt;

          while (remaining.length > 2) {
            const newVar = `X${varCounter++}`;
            const firstPart = remaining[0];
            cnfRules.push(`${currentLeft} ➔ ${firstPart}${newVar}`);
            currentLeft = newVar;
            remaining = remaining.substring(1);
          }
          
          cnfRules.push(`${currentLeft} ➔ ${remaining}`);
        }
      }
    }

    // Hilangkan duplikasi aturan produksi di array hasil akhir
    const uniqueCNF = [...new Set(cnfRules)];

    return {
      success: true,
      original: originalRules,
      cnf: uniqueCNF,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      original: [],
      cnf: [],
      error: `Gagal memproses CNF: ${err.message}`
    };
  }
}