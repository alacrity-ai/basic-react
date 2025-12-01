import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { Products } from './components/Products';
import { OnboardingSection } from './components/OnboardingSection';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />

      <main>
        <Hero />
        <Benefits />
        <Products />
        <OnboardingSection />
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} Farmtech. All rights reserved.</p>
          <nav className="footer-nav">
            <a href="#!">Privacy</a>
            <a href="#!">Terms</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
