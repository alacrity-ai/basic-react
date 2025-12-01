import React from 'react';

const BENEFITS = [
  {
    title: 'Higher, More Stable Yields',
    body: 'Optimize nutrient delivery throughout the season with data-driven fertilizer programs.',
  },
  {
    title: 'Soil Health & Sustainability',
    body: 'Balanced blends and soil-enhancing formulations for enduring productivity.',
  },
  {
    title: 'Reliable Supply & Logistics',
    body: 'Dependable inventory and delivery aligned with your operation’s schedule.',
  },
  {
    title: 'Agronomy Support',
    body: 'Guidance from specialists who help tailor each program to crop and field conditions.',
  },
];

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="section">
      <div className="container">
        <h2>Why growers choose Farmtech</h2>

        <div className="grid benefits-grid">
          {BENEFITS.map((benefit) => (
            <article key={benefit.title} className="card benefit-card">
              <div className="icon-placeholder">🌱</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
