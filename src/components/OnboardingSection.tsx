import React from 'react';
import { ContactForm } from './ContactForm';

export const OnboardingSection: React.FC = () => {
  return (
    <section id="onboarding" className="section">
      <div className="container onboarding-grid">
        <div className="onboarding-copy">
          <h2>Get started with Farmtech</h2>

          <p>
            Share your operation’s details, and our agronomy team will provide a
            tailored fertility plan, product recommendations, and pricing options
            designed for your crop mix and field conditions.
          </p>

          <ul className="onboarding-steps">
            <li>1. Tell us about your fields and crops.</li>
            <li>2. We analyze soil, crop needs, and application timing.</li>
            <li>3. Receive a custom program proposal and product plan.</li>
          </ul>
        </div>

        <div className="onboarding-form-wrapper">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
