import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Founder } from './components/Founder';
import { Categories } from './components/Categories';
import { Brands } from './components/Brands';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { PipelineCatalogueView } from './components/PipelineCatalogueView';
import { BathroomCatalogueView } from './components/BathroomCatalogueView';

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem('scrollTarget');
    if (scrollTarget) {
      sessionStorage.removeItem('scrollTarget');
      // Delay slightly to ensure elements are mounted and styled
      setTimeout(() => {
        const id = scrollTarget.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <Founder />
      <Categories />
      <Brands />
      <Contact />
    </>
  );
};

function App() {
  const navigate = useNavigate();

  const handleCatalogueBack = () => {
    sessionStorage.setItem('scrollTarget', '#products');
    navigate('/');
  };

  return (
    <div className="w-full min-h-screen bg-white text-neutral-dark selection:bg-accent/25 selection:text-primary">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pipeline-catalogue" element={<PipelineCatalogueView onBack={handleCatalogueBack} />} />
          <Route path="/bathroom-catalogue" element={<BathroomCatalogueView onBack={handleCatalogueBack} />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

export default App;


