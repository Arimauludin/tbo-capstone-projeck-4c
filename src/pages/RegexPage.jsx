import React, { useState } from 'react';
import { evaluateRegex } from '../components/core/regex/regexEvaluator';

export default function RegexPage() {
  const [regexPattern, setRegexPattern] = useState('a*b');
  const [testString, setTestString] = useState('aaab');
  const [result, setResult] = useState(null);

  const handleTest = (e) => {
    e.preventDefault();
    const res = evaluateRegex(regexPattern, testString);
    setResult(res);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#334155' }}>
      <h2 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', color: '#1e293b' }}>
        Modul 2: Regular Expression & Regular Grammar
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
        {/* Kolom Input */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            Pengujian Pola Regex
          </h3>
          
          <form onSubmit={handleTest}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                Pola Regex (Pattern):
              </label>
              <input 
                type="text" 
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'monospace' }}
                placeholder="Contoh: a*b atau [0-1]+"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                String yang Diuji:
              </label>
              <input 
                type="text" 
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontFamily: 'monospace' }}
                placeholder="Contoh: aaab"
              />
            </div>

            <button 
              type="submit"
              style={{ width: '100%', padding: '0.7rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}
            >
              Uji Kecocokan Pola
            </button>
          </form>
        </div>

        {/* Kolom Output */}
        <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: '#475569', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            Hasil & Aturan Grammar
          </h3>
          
          {result ? (
            <div>
              {/* Hasil Match */}
              <div style={{ 
                padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem',
                backgroundColor: result.error ? '#fee2e2' : (result.matched ? '#dcfce7' : '#fee2e2'),
                color: result.error ? '#991b1b' : (result.matched ? '#166534' : '#991b1b'),
                border: result.error ? '1px solid #fca5a5' : (result.matched ? '1px solid #86efac' : '1px solid #fca5a5')
              }}>
                {result.error ? result.error : (result.matched ? '✔ MATCHED (String Valid)' : '❌ NOT MATCHED (String Ditolak)')}
              </div>

              {/* Aturan Produksi Grammar */}
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', color: '#1e293b' }}>
                Aturan Produksi Grammar Reguler Setara:
              </h4>
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {result.grammar.length > 0 ? (
                  result.grammar.map((prod, idx) => (
                    <div key={idx} style={{ padding: '2px 0', borderBottom: idx !== result.grammar.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                      {prod}
                    </div>
                  ))
                ) : (
                  <div style={{ color: '#94a3b8' }}>Tidak ada aturan terbuat.</div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70%', color: '#94a3b8' }}>
              <p style={{ fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>
                Silakan isi data dan klik tombol <strong>"Uji Kecocokan Pola"</strong> untuk melihat hasil evaluasi automata.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}