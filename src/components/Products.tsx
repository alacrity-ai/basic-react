import React from 'react';

const PRODUCTS = [
  {
    name: 'Nitrogen+ Series',
    description:
      'Stabilized nitrogen solutions designed for flexible application timing and efficient uptake.',
    tags: ['Row Crops', 'Corn', 'Wheat'],
  },
  {
    name: 'Balanced NPK Blends',
    description:
      'Custom-formulated blends aligned with soil tests, yield targets, and localized agronomy conditions.',
    tags: ['Row Crops', 'Specialty', 'Vegetables'],
  },
  {
    name: 'Soil Health & Microbial Boosters',
    description:
      'Biologically active inputs to improve microbial activity, root development, and long-term soil structure.',
    tags: ['Vegetables', 'Greenhouse', 'Specialty'],
  },
];

export const Products: React.FC = () => {
  return (
    <section id="products" className="section section-alt">
      <div className="container">
        <h2>Our product families</h2>

        <div className="grid products-grid">
          {PRODUCTS.map((product) => (
            <article key={product.name} className="card product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <div className="tag-row">
                {product.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
