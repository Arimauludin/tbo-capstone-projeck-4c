/**
 * Evaluator dan Generator Grammar untuk Regular Expression
 * 
 * @param {string} regexPattern - Pola regex dari user (misal: "a*b")
 * @param {string} testString - String yang akan diuji (misal: "aaab")
 * @returns {Object} Hasil evaluasi match dan aturan produksi grammar reguler
 */
export function evaluateRegex(regexPattern, testString) {
  try {
    // 1. Validasi dan compile pola Regex menggunakan Regex bawaan JavaScript
    // Kita tambahkan flag '^' dan '$' agar pencocokan bersifat strict dari awal sampai akhir string
    const cleanPattern = regexPattern.startsWith('^') ? regexPattern : `^${regexPattern}`;
    const finalPattern = cleanPattern.endsWith('$') ? cleanPattern : `${cleanPattern}$`;
    
    const rx = new RegExp(finalPattern);
    const isMatch = rx.test(testString);

    // 2. Generate Aturan Produksi Grammar Reguler Setara (Spesifikasi Wajib Modul)
    // Kita buat generator representasi grammar berbasis pola sederhana untuk visualisasi ilmiah
    const grammarProductions = generateRegularGrammar(regexPattern);

    return {
      success: true,
      matched: isMatch,
      grammar: grammarProductions,
      error: null
    };
  } catch (err) {
    return {
      success: false,
      matched: false,
      grammar: [],
      error: `Pola Regex tidak valid: ${err.message}`
    };
  }
}

/**
 * Helper untuk men-generate aturan produksi Grammar Reguler (Tipe 3 Chomsky)
 * Berdasarkan pola regex dasar yang dimasukkan user
 */
function generateRegularGrammar(pattern) {
  const productions = [];

  // Contoh visualisasi aturan produksi untuk pola umum biner/karakter standar
  if (pattern.includes('*')) {
    const char = pattern.replace('*', '') || 'a';
    productions.push(`S ➔ ${char}S | ε (Aturan Loop/Bintang Kleene)`);
  } else if (pattern.includes('+')) {
    const char = pattern.replace('+', '') || 'a';
    productions.push(`S ➔ ${char}A`);
    productions.push(`A ➔ ${char}A | ε`);
  } else if (pattern.includes('|')) {
    const parts = pattern.split('|');
    productions.push(`S ➔ ${parts[0]} | ${parts[1]} (Aturan Percabangan/Union)`);
  } else {
    // Default grammar linear
    productions.push(`S ➔ ${pattern ? pattern : 'ε'}`);
  }

  return productions;
}