import React, { useState } from 'react';
import { convertToCNF } from '../components/core/chomsky/cnfConverter';

export default function ChomskyPage() {
  const [rawInput, setRawInput] = useState("S -> AB\nA -> aA | a\nB -> bB | b");
  const [result, setResult] = useState(null);

  const handleConvert = (e) => {
    e.preventDefault();
    const res = convertToCNF(rawInput);
    setResult(res);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#334155' }}>
      <h2 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', color: '#1e293b' }}>
        Modul 4: Chomsky Normal Form (CNF) Converter
      </h2>
      <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.5rem' }}>
        Penyederhanaan Tata Bahasa Bebas Konteks (CFG) menjadi bentuk normal dengan batasan ruas kanan berupa tepat 2 variabel atau 1 terminal.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Panel Input */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569', marginBottom: '1rem' }}>Aturan Produksi CFG</h3>
          
          <form onSubmit={handleConvert}>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Masukkan Aturan (Tiap Baris):
              </label>
              <textarea 
                rows="6"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', fontFamily: 'monospace', fontSize: '0.9rem', resize: 'vertical', boxSizing: 'border-box' }}
                placeholder="S -> AB&#10;A -> a&#10;B -> b"
              />
            </div>
            <button 
              type="submit"
              style={{ width: '100%', padding: '0.7rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Konversi ke CNF
            </button>
          </form>
        </div>

        {/* Panel Output */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569', marginBottom: '1rem' }}>Hasil Penyederhanaan</h3>

          {result ? (
            result.success ? (
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#475569' }}>CFG Awal:</h4>
                <div style={{ backgroundColor: '#f8fafc', padding: '0.6rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem', border: '1px solid #e2e8f0' }}>
                  {result.original.map((r, i) => <div key={i}>{r}</div>)}
                </div>

                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#065f46' }}>Bentuk Normal Chomsky (CNF):</h4>
                <div style={{ backgroundColor: '#ecfdf5', padding: '0.75rem', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 'bold', color: '#047857', border: '1px solid #a7f3d0', lineHeight: '1.5' }}>
                  {result.cnf.map((r, i) => <div key={i}>{r}</div>)}
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '0.8rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                ❌ {result.error}
              </div>
            )
          ) : (
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', marginTop: '4rem' }}>
              Klik tombol <strong>"Konversi ke CNF"</strong> untuk mereduksi tata bahasa.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}