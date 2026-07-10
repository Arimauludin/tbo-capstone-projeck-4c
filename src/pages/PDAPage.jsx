import React, { useState } from 'react';
import { simulatePDA } from '../components/core/pda/pdaSimulator';

export default function PDAPage() {
  const [inputString, setInputString] = useState('aaabbb');
  const [result, setResult] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const res = simulatePDA(inputString);
    setResult(res);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#334155' }}>
      <h2 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', color: '#1e293b' }}>
        Modul 3: Pushdown Automata Simulator & CFG
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
        Mesin mengenali Bahasa Bebas Konteks (CFG): <strong>L = aⁿbⁿ</strong> (Jumlah 'a' harus sama dengan 'b').
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Kontrol Input */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569' }}>Definisi Mesin PDA</h3>
          <div style={{ fontSize: '0.9rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem', lineHeight: '1.6' }}>
            <div>• <strong>States:</strong> q0 (push), q1 (pop), q2 (final)</div>
            <div>• <strong>Simbol Stack:</strong> A, # (simbol awal)</div>
          </div>

          <form onSubmit={handleSimulate}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Masukkan String Uji:
              </label>
              <input 
                type="text" 
                value={inputString}
                onChange={(e) => setInputString(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontFamily: 'monospace' }}
                placeholder="Contoh: aabb atau aaabbb"
              />
            </div>
            <button 
              type="submit"
              style={{ width: '100%', padding: '0.7rem', backgroundColor: '#0284c7', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Proses Stack PDA
            </button>
          </form>
        </div>

        {/* Trace Transisi Stack */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569' }}>Hasil & State Trace</h3>
          
          {result ? (
            <div>
              <div style={{ 
                padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem',
                backgroundColor: result.accepted ? '#dcfce7' : '#fee2e2',
                color: result.accepted ? '#166534' : '#991b1b',
                border: result.accepted ? '1px solid #86efac' : '1px solid #fca5a5'
              }}>
                {result.accepted ? '✔ ACCEPTED (String Valid)' : '❌ REJECTED (String Ditolak)'}
              </div>
              
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: '0 0 0.5rem 0' }}>{result.reason}</p>

              <h4 style={{ margin: '1rem 0 0.5rem 0', fontSize: '0.9rem' }}>Log Perubahan Stack:</h4>
              <div style={{ backgroundColor: '#1e293b', color: '#38bdf8', borderRadius: '4px', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.85rem', maxHeight: '200px', overflowY: 'auto' }}>
                {result.transitions.map((t, idx) => (
                  <div key={idx} style={{ padding: '2px 0' }}>{t}</div>
                ))}
              </div>
            </div>
          ) : (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem' }}>
              Masukkan string (misal: aaabbb) dan klik tombol untuk melihat cara kerja *Pushdown Automata*.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}