/**
 * Simulator Pushdown Automata (PDA) Sederhana
 * Menerima string, melakukan push/pop pada stack
 */
export function simulatePDA(inputString) {
  // Kita simulasikan mesin PDA untuk bahasa L = {a^n b^n | n >= 0}
  // Stack dimulai dengan simbol awal '#'
  const stack = ['#'];
  let currentState = 'q0';
  const transitions = [];

  transitions.push(`[Start] State: ${currentState}, Stack: [${stack.join(', ')}]`);

  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];
    
    if (currentState === 'q0' && char === 'a') {
      // Baca 'a', push ke stack
      stack.push('A');
      transitions.push(`Baca '${char}': Push 'A'. State: q0, Stack: [${stack.join(', ')}]`);
    } else if (currentState === 'q0' && char === 'b') {
      // Mulai baca 'b', ganti state ke q1, pop 'A'
      currentState = 'q1';
      if (stack[stack.length - 1] === 'A') {
        stack.pop();
        transitions.push(`Baca '${char}': Pindah ke q1, Pop 'A'. Stack: [${stack.join(', ')}]`);
      } else {
        transitions.push(`Baca '${char}': Error! Stack top bukan 'A'.`);
        return { accepted: false, transitions, reason: "Crash: Deteksi 'b' tanpa ada 'a' yang sesuai di stack." };
      }
    } else if (currentState === 'q1' && char === 'b') {
      // Lanjut baca 'b' di q1, pop 'A'
      if (stack[stack.length - 1] === 'A') {
        stack.pop();
        transitions.push(`Baca '${char}': Pop 'A'. State: q1, Stack: [${stack.join(', ')}]`);
      } else {
        transitions.push(`Baca '${char}': Error! Stack kosong dari 'A'.`);
        return { accepted: false, transitions, reason: "Ditolak: Jumlah 'b' lebih banyak daripada 'a'." };
      }
    } else {
      return { accepted: false, transitions, reason: `Ditolak: Karakter '${char}' tidak valid untuk mesin ini.` };
    }
  }

  // Cek transisi ε (kosong) ke status akhir jika stack menyisakan simbol awal '#'
  if (stack.length === 1 && stack[0] === '#') {
    stack.pop(); // Pop '#' untuk mengosongkan stack
    currentState = 'q2'; // State Final
    transitions.push(`[ε-Transition]: Pop '#'. State Akhir: ${currentState} (ACCEPT), Stack: Empty`);
    return { accepted: true, transitions, reason: "Diterima: Seluruh string habis terproses dan Stack kosong sempurna!" };
  } else {
    transitions.push(`[End]: String habis tapi Stack masih berisi [${stack.join(', ')}]`);
    return { accepted: false, transitions, reason: "Ditolak: Jumlah 'a' lebih banyak daripada 'b' (Stack tidak kosong)." };
  }
}