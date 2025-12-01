import React from 'react';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Precision Fertilizers for Modern Agriculture</h1>

          <p>
            Farmtech delivers efficient nutrient programs, optimized fertilization
            strategies, and agronomy-backed insights to help growers maximize yield
            while preserving long-term soil health.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => scrollTo('onboarding')}>
              Get Started
            </button>

            <button className="btn btn-ghost" onClick={() => scrollTo('products')}>
              View Products
            </button>
          </div>

          <p className="hero-subnote">
            Supporting row crop, specialty, and greenhouse farms across the region.
          </p>
        </div>

        <div className="hero-visual">
          <div className="hero-placeholder">
            <span>Farm imagery / drone map placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};
