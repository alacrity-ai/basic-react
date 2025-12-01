import React, { useState } from 'react';
import type { OnboardingFormValues } from '../types/forms';

const initialValues: OnboardingFormValues = {
  fullName: '',
  email: '',
  phone: '',
  farmName: '',
  acreage: '',
  crops: '',
  interests: '',
  message: '',
};

export const ContactForm: React.FC = () => {
  const [values, setValues] = useState<OnboardingFormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log('Form submitted:', values);

    // TODO: wire to backend / SendGrid / REST endpoint.
    // Example:
    // await fetch('/api/onboarding', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values),
    // });

    setSubmitted(true);
    setValues(initialValues);
  };

  return (
    <form className="card contact-form" onSubmit={handleSubmit}>
      <h3>Request a consultation</h3>

      <div className="field-row">
        <label>
          Full name
          <input
            required
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="field-row field-row-inline">
        <label>
          Email
          <input
            required
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone (optional)
          <input
            type="tel"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="field-row field-row-inline">
        <label>
          Farm / Business name
          <input
            required
            type="text"
            name="farmName"
            value={values.farmName}
            onChange={handleChange}
          />
        </label>

        <label>
          Acreage / scale
          <input
            type="text"
            name="acreage"
            value={values.acreage}
            onChange={handleChange}
            placeholder="e.g. 1,200 acres"
          />
        </label>
      </div>

      <div className="field-row">
        <label>
          Primary crops
          <input
            type="text"
            name="crops"
            value={values.crops}
            onChange={handleChange}
            placeholder="e.g. corn, soybeans, vegetables"
          />
        </label>
      </div>

      <div className="field-row">
        <label>
          Products or services of interest
          <input
            type="text"
            name="interests"
            value={values.interests}
            onChange={handleChange}
            placeholder="e.g. NPK blends, foliar, soil health"
          />
        </label>
      </div>

      <div className="field-row">
        <label>
          Tell us about your needs
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            rows={4}
            placeholder="Describe your current fertilizer program, goals, or challenges."
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary full-width">
        Request consultation
      </button>

      {submitted && (
        <p className="form-success">
          Thanks — a Farmtech representative will contact you shortly.
        </p>
      )}
    </form>
  );
};
