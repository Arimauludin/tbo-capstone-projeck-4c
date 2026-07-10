import React, { useState } from 'react';
import FSAPage from './pages/FSAPage';
import RegexPage from './pages/RegexPage';
import PDAPage from './pages/PDAPage';
import ChomskyPage from './pages/ChomskyPage';

function App() {
  const [activeTab, setActiveTab] = useState('fsa');

  const renderPage = () => {
    switch (activeTab) {
      case 'fsa': return <FSAPage />;
      case 'regex': return <RegexPage />;
      case 'pda': return <PDAPage />;
      case 'chomsky': return <ChomskyPage />;
      default: return <FSAPage />;
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar Atas */}
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '1rem 2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>TBO Capstone Project</h1>
        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.9rem', color: '#cbd5e1' }}>Simulasi Otomata & Teori Bahasa</p>
      </header>

      {/* Navigasi Menu/Tab */}
      <nav style={{ display: 'flex', backgroundColor: '#f1f5f9', borderBottom: '1px solid #cbd5e1' }}>
        <button onClick={() => setActiveTab('fsa')} style={tabStyle(activeTab === 'fsa')}>Modul 1: FSA</button>
        <button onClick={() => setActiveTab('regex')} style={tabStyle(activeTab === 'regex')}>Modul 2: Regex</button>
        <button onClick={() => setActiveTab('pda')} style={tabStyle(activeTab === 'pda')}>Modul 3: PDA & CFG</button>
        <button onClick={() => setActiveTab('chomsky')} style={tabStyle(activeTab === 'chomsky')}>Modul 4: Chomsky & CNF</button>
      </nav>

      {/* Konten Halaman */}
      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        {renderPage()}
      </main>
    </div>
  );
}

// Helper style untuk tab aktif/tidak aktif
const tabStyle = (isActive) => ({
  padding: '1rem 1.5rem',
  border: 'none',
  background: isActive ? '#fff' : 'transparent',
  borderBottom: isActive ? '3px solid #3b82f6' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  cursor: 'pointer',
  color: isActive ? '#3b82f6' : '#475569',
});

export default App;