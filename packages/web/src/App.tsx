import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import { HamburgerButton } from './components/HamburgerButton';
import { Sidebar } from './components/Sidebar';
import { AboutPage } from './pages/About';
import { LandingPage } from './pages/LandingPage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <HamburgerButton onClick={toggleSidebar} isOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} />
      <main style={{
        padding: '20px',
        marginLeft: '20px',
        marginTop: '60px'
      }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
