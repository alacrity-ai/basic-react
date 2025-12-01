import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo">Farmtech</div>

        <nav className="nav">
          <a href="#benefits">Benefits</a>
          <a href="#products">Products</a>
          <a href="#onboarding">Onboarding</a>
        </nav>
      </div>
    </header>
  );
};
