/**
 * Simulator Mesin Mealy & Moore
 */
export function simulateMealyMoore(type, inputString) {
  let currentState = 'q0';
  let outputResult = '';
  const transitions = [];

  if (type === 'moore') {
    // Mesin Moore: Output ditentukan oleh STATE saat itu
    // Definisi output state: q0 -> 0, q1 -> 1
    const mooreOutput = { q0: '0', q1: '1' };
    outputResult += mooreOutput[currentState];
    transitions.push(`[Start] State awal: ${currentState}, Output State: ${mooreOutput[currentState]}`);

    for (let char of inputString) {
      let nextState = currentState;
      if (currentState === 'q0' && char === '1') nextState = 'q1';
      else if (currentState === 'q1' && char === '0') nextState = 'q0';
      
      currentState = nextState;
      outputResult += mooreOutput[currentState];
      transitions.push(`Baca '${char}' ➔ Pindah ke ${currentState}, Output State: ${mooreOutput[currentState]}`);
    }
  } else {
    // Mesin Mealy: Output ditentukan oleh TRANSISI (State + Input)
    transitions.push(`[Start] State awal: ${currentState}`);
    
    for (let char of inputString) {
      let nextState = currentState;
      let out = '0';

      if (currentState === 'q0') {
        if (char === '1') { nextState = 'q1'; out = 'A'; }
        else { nextState = 'q0'; out = 'B'; }
      } else if (currentState === 'q1') {
        if (char === '0') { nextState = 'q0'; out = 'A'; }
        else { nextState = 'q1'; out = 'B'; }
      }

      transitions.push(`Baca '${char}' ➔ Pindah ke ${nextState}, Output Transisi: ${out}`);
      currentState = nextState;
      outputResult += out;
    }
  }

  return { outputResult, transitions };
}