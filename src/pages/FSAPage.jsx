import React, { useState } from 'react';
import { simulateDFA } from '../components/core/fsa/dfaSimulator';
import { simulateMealyMoore } from '../components/core/fsa/mealyMooreSimulator';

export default function FSAPage() {
  // ==========================================
  // KODE ASLI / BAWAAN KAMU (JANGAN DIUBAH)
  // ==========================================
  const [inputString, setInputString] = useState('1011');
  
  const [machineDef, setMachineDef] = useState({
    states: ['q0', 'q1'],
    alphabet: ['0', '1'],
    initialState: 'q0',
    finalStates: ['q1'],
    transitions: {
      q0: { '0': 'q0', '1': 'q1' },
      q1: { '0': 'q0', '1': 'q1' }
    }
  });

  const [result, setResult] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const res = simulateDFA(inputString, machineDef);
    setResult(res);
  };

  // ==========================================
  // STATE BARU UNTUK MOORE & MEALY (CPMK2)
  // ==========================================
  const [machineType, setMachineType] = useState('moore');
  const [mmInput, setMmInput] = useState('101');
  const [mmResult, setMmResult] = useState(null);

  const handleMMTest = (e) => {
    e.preventDefault();
    const res = simulateMealyMoore(machineType, mmInput);
    setMmResult(res);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', color: '#334155' }}>
      {/* SECTION 1: DFA SIMULATOR (Tampilan Asli Kamu) */}
      <h2 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', color: '#1e293b' }}>
        Modul 1: Finite State Automata Simulator (DFA)
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Kolom Kiri: Form & Definisi Mesin */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569' }}>Definisi Formal Mesin (M)</h3>
          
          <div style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5rem' }}>
            <div><strong>States (Q):</strong> {machineDef.states.join(', ')}</div>
            <div><strong>Alphabet (Σ):</strong> {machineDef.alphabet.join(', ')}</div>
            <div><strong>Initial State (q0):</strong> {machineDef.initialState}</div>
            <div><strong>Final States (F):</strong> {machineDef.finalStates.join(', ')}</div>
          </div>

          <form onSubmit={handleSimulate}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Masukkan String Uji:
              </label>
              <input 
                type="text" 
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.6rem', 
                  borderRadius: '4px', 
                  border: '1px solid #cbd5e1',
                  boxSizing: 'border-box'
                }}
                placeholder="Contoh: 1010"
              />
            </div>
            <button 
              type="submit"
              style={{
                width: '100%',
                padding: '0.7rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Jalankan Simulasi
            </button>
          </form>
        </div>

        {/* Kolom Kanan: Output Hasil & Trace */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569' }}>Hasil Pengujian</h3>
          
          {result ? (
            <div>
              <div style={{ 
                padding: '0.8rem', 
                borderRadius: '4px', 
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '1.5rem',
                backgroundColor: result.error ? '#fee2e2' : (result.accepted ? '#dcfce7' : '#fee2e2'),
                color: result.error ? '#991b1b' : (result.accepted ? '#166534' : '#991b1b')
              }}>
                {result.error ? result.error : (result.accepted ? 'ACCEPTED (String Diterima)' : 'REJECTED (String Ditolak)')}
              </div>

              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>Trace Lintasan State:</h4>
              <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.5rem' }}>
                <ol style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.4rem' }}>
                  {result.trace.map((t, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
                      {t.description}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ) : (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginTop: '3rem' }}>
              Silakan klik tombol "Jalankan Simulasi" untuk melihat hasil.
            </p>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* SECTION 2: TAMBAHAN BARU UNTUK MOORE & MEALY MACHINE (MEMENUHI CPMK2) */}
      {/* ======================================================================= */}
      <div style={{ marginTop: '3.5rem', borderTop: '2px dashed #cbd5e1', paddingTop: '2rem' }}>
        <h3 style={{ color: '#1e293b', marginTop: 0, marginBottom: '0.25rem' }}>
          Sub-Modul CPMK2: Moore & Mealy Machine Simulator
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: 0, marginBottom: '1.5rem' }}>
          Simulasi Finite State Automata dengan Output (Karakter tercetak berdasarkan State atau Transisi).
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Form Kontrol Input */}
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ marginTop: 0, fontSize: '1rem', color: '#475569', marginBottom: '1rem' }}>Konfigurasi & Input</h4>
            
            <form onSubmit={handleMMTest}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Pilih Jenis Mesin Otomata:
                </label>
                <select 
                  value={machineType} 
                  onChange={(e) => setMachineType(e.target.value)} 
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '4px', border: '1px solid #cbd5e1', backgroundColor: '#fff' }}
                >
                  <option value="moore">Moore Machine (Output terikat pada State)</option>
                  <option value="mealy">Mealy Machine (Output terikat pada Transisi)</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Masukkan String Uji Biner (0 / 1):
                </label>
                <input 
                  type="text" 
                  value={mmInput} 
                  onChange={(e) => setMmInput(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'monospace' }} 
                  placeholder="Contoh: 1101"
                />
              </div>

              <button 
                type="submit" 
                style={{ width: '100%', padding: '0.7rem', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Hitung Output Mesin
              </button>
            </form>
          </div>

          {/* Tampilan Hasil Cetakan & Lintasan */}
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h4 style={{ marginTop: 0, fontSize: '1rem', color: '#475569', marginBottom: '1rem' }}>Hasil Cetakan Output</h4>
            
            {mmResult ? (
              <div>
                {/* Tampilan Output String Akhir */}
                <div style={{ 
                  padding: '0.8rem', 
                  backgroundColor: '#f0fdf4', 
                  border: '1px solid #bbf7d0', 
                  color: '#166534', 
                  borderRadius: '4px', 
                  fontFamily: 'monospace', 
                  fontWeight: 'bold', 
                  fontSize: '1.1rem', 
                  marginBottom: '1.2rem', 
                  textAlign: 'center' 
                }}>
                  Output String: "{mmResult.outputResult}"
                </div>

                {/* Log Lintasan Langkah Demi Langkah */}
                <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#1e293b' }}>Lintasan Transisi Mesin:</h5>
                <div style={{ 
                  backgroundColor: '#1e293b', 
                  color: '#38bdf8', 
                  padding: '0.75rem', 
                  borderRadius: '4px', 
                  fontFamily: 'monospace', 
                  fontSize: '0.8rem', 
                  maxHeight: '130px', 
                  overflowY: 'auto',
                  lineHeight: '1.4rem'
                }}>
                  {mmResult.transitions.map((t, i) => (
                    <div key={i} style={{ borderBottom: '1px dashed #334155', paddingBottom: '2px', marginBottom: '2px' }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70%', color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center' }}>
                Silakan isi string biner lalu klik tombol "Hitung Output Mesin" untuk melihat hasil seketika.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}