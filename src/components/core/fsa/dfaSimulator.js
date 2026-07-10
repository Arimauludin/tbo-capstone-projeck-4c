/**
 * Simulator DFA (Deterministic Finite Automata)
 * 
 * @param {string} inputString - String masukan yang akan diuji (misal: "1010")
 * @param {Object} machineDef - Definisi formal mesin DFA
 * @param {Array<string>} machineDef.states - Kumpulan state (Q), misal: ['q0', 'q1', 'q2']
 * @param {Array<string>} machineDef.alphabet - Alfabet (Sigma), misal: ['0', '1']
 * @param {Object} machineDef.transitions - Fungsi transisi (Delta) berbentuk objek bersarang
 *                                          misal: { q0: { '0': 'q0', '1': 'q1' }, q1: { ... } }
 * @param {string} machineDef.initialState - State awal (q0), misal: 'q0'
 * @param {Array<string>} machineDef.finalStates - Kumpulan state akhir (F), misal: ['q1']
 * 
 * @returns {Object} Hasil simulasi berupa status kelulusan dan alur trace transisi
 */
export function simulateDFA(inputString, machineDef) {
  const { initialState, transitions, finalStates, alphabet } = machineDef;
  
  let currentState = initialState;
  const trace = []; // Menyimpan riwayat transisi untuk visualisasi halaman web

  // Masukkan state awal ke dalam trace sebelum membaca string
  trace.push({
    step: 0,
    char: null,
    fromState: null,
    toState: currentState,
    description: `Mulai dari state awal: ${currentState}`
  });

  // Melakukan perulangan untuk setiap karakter pada string masukan
  for (let i = 0; i < inputString.length; i++) {
    const char = inputString[i];

    // Validasi apakah karakter ada di dalam daftar alfabet resmi mesin
    if (!alphabet.includes(char)) {
      return {
        accepted: false,
        error: `Karakter '${char}' tidak dikenali dalam alfabet mesin!`,
        trace
      };
    }

    const fromState = currentState;
    
    // Ambil state tujuan berdasarkan state saat ini dan karakter pembaca
    if (transitions[currentState] && transitions[currentState][char] !== undefined) {
      currentState = transitions[currentState][char];
    } else {
      // Jika tidak ada transisi yang terdefinisi (DFA mengalami jebakan/dead state tak resmi)
      return {
        accepted: false,
        error: `Tidak ada transisi yang valid dari state ${currentState} dengan input '${char}'`,
        trace
      };
    }

    // Catat langkah transisinya ke dalam trace
    trace.push({
      step: i + 1,
      char: char,
      fromState: fromState,
      toState: currentState,
      description: `State ${fromState} membaca '${char}' ➔ berpindah ke State ${currentState}`
    });
  }

  // Cek apakah state akhir penjelajahan termasuk ke dalam himpunan Final States (F)
  const isAccepted = finalStates.includes(currentState);

  return {
    accepted: isAccepted,
    finalState: currentState,
    error: null,
    trace: trace
  };
}