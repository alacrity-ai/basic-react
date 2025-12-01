# Farmtech Landing Page

Farmtech is a simple, static marketing site for an agriculture technology supplier
focused on precision fertilizer programs and agronomy-backed support.

The codebase is a minimal React + Vite + TypeScript single-page application.

---

## 1. Getting Started

### Prerequisites

- Node.js `v24.7.0` (see `package.json` `engines` field)
- npm (`>=10.x` recommended)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`)  
in your browser.

---

## 2. Contact / Onboarding Form Roadmap

Right now, the **Contact / Onboarding** form is purely client-side:  
it updates local React state, logs submissions to the console,  
and shows a simple success message.

The end goal is to wire this into a **separate signup / onboarding worker**  
(e.g., a Cloudflare Worker or similar) that will:

- validate requests
    
- verify bot protection (Turnstile)
    
- fan out to:
    
    - email / marketing system (e.g. SendGrid, MailerLite, etc.)
        
    - internal notifications (Slack / Teams / email)
        
    - data store / CRM (optional)
        

Below is the proposed roadmap, informed by the existing Chemveric signup  
implementation.

---

### Phase 1 – Frontend plumbing

**Objective:** Make the Farmtech form speak a clean, canonical API to a worker.

1. **Introduce a small frontend client library**
    
    Under `src/lib/`, add:
    
    - `src/lib/submit.ts`
        
        - Canonical TypeScript types for Farmtech’s signup payload  
            (e.g. `FarmOnboardingPayload`, `FarmSize`, `CropType`, etc.).
            
        - A `submitToSignupWorker(payload)` function that:
            
            - reads an endpoint from `import.meta.env.VITE_SIGNUP_ENDPOINT`
                
            - POSTs `application/json`
                
            - returns success/failure (e.g. `boolean` or a small result object).
                
    - `src/lib/analytics.ts`
        
        - A minimal `track(event: string, params?: Record<string, any>)` wrapper  
            around `window.gtag("event", ...)`, mirroring the example you provided.
            
    - `src/lib/slack.ts` (optional, but useful)
        
        - A `postToSlack(text: string)` helper that sends a message to a Slack  
            webhook URL from `VITE_SLACK_WEBHOOK`, mirroring your existing pattern.
            
    
    This mirrors the `submit.ts`, `analytics.ts`, and `slack.ts` you already use  
    elsewhere, but specialized for Farmtech’s domain vocabulary.
    
2. **Refine the ContactForm state shape**
    
    - Align `OnboardingFormValues` (in `src/types/forms.ts`) with the canonical  
        payload you intend to send to the worker.
        
    - Add any fields you need for segmentation (e.g. primary crop type, region,  
        preferred contact channel, etc.).
        
3. **Integrate `react-hook-form` (optional, but you already have it installed)**
    
    - Replace the manual `useState` + `<input onChange>` wiring with  
        `react-hook-form`:
        
        - `useForm` for registration and validation
            
        - built-in `errors` for UI feedback
            
    - This keeps the form logic declarative and easier to extend.
        

---

### Phase 2 – Bot protection and tracking

**Objective:** Harden the form and gain observability into usage.

4. **Embed Cloudflare Turnstile**
    
    - Add a `Turnstile` component (via `react-turnstile`, which is already in  
        `package.json`) to the ContactForm.
        
    - Maintain a `turnstileToken` in React state (similar to your `EarlyAccess`  
        example).
        
    - Require a valid `turnstileToken` before submitting to the worker.
        
    - Include `turnstileToken` in the payload sent to the worker.
        
5. **Add frontend analytics events**
    
    Using `src/lib/analytics.ts`:
    
    - Track:
        
        - `form_started` (first interaction)
            
        - `form_field_interaction` (field-level interaction)
            
        - `form_validation_error`
            
        - `form_submission_attempt`
            
        - `form_submission_success`
            
        - `form_submission_error`
            
    
    These mirror the semantics of your existing tracking in the Chemveric early  
    access form and will give you basic funnel metrics without much overhead.
    

---

### Phase 3 – Worker integration

**Objective:** Wire the form to the actual signup / onboarding worker.

6. **Provision a Farmtech signup worker**
    
    - Implement a separate service (e.g. Cloudflare Worker) at a URL like:
        
        `https://signup-worker.farmtech.com`
        
    - Responsibilities:
        
        - Validate required fields and Turnstile token
            
        - Normalize / validate email
            
        - Optionally enrich with IP / geo / user agent
            
        - Forward to:
            
            - Email / ESP (SendGrid, etc.)
                
            - Slack (via webhook)
                
            - Datastore / CRM
                
    - Return a simple JSON response (or an HTTP 204) to keep the frontend logic  
        trivial.
        
7. **Wire the frontend to the worker**
    
    - Set `VITE_SIGNUP_ENDPOINT` in your environment (e.g. `.env`, deploy  
        secrets, etc.).
        
    - In `ContactForm`:
        
        - Replace the console logging with:
            
            `await submitToSignupWorker(payload);`
            
        - On success:
            
            - reset the form
                
            - reset Turnstile
                
            - show a success message (and optionally a `react-toastify` toast).
                
        - On failure:
            
            - surface a clear error message
                
            - emit a `form_submission_error` analytics event.
                

---

### Phase 4 – Operational hardening (optional, future)

8. **Slack notifications (if desired)**
    
    - Use `postToSlack` in the worker or frontend (worker is preferred) to  
        post a formatted notification whenever a new Farmtech onboarding request  
        comes in.
        
9. **Additional validation & segmentation**
    
    - Add client-side validation for phone number format, acreage ranges, etc.
        
    - Add more detailed segmentation fields if needed (e.g. “Primary fertilizer  
        challenge”, “Planned application window”, etc.).
        
10. **A/B tests or multi-step flows**
    
    - If needed, evolve from a single-page form to:
        
        - a stepped wizard (crop details → logistics → contact info), or
            
        - variant forms to test conversion (“short” vs “detailed”).
            

---

## 3. Deployment Notes (High Level)

The project is a static React SPA built with Vite. A typical deployment flow:

`npm run build`

This outputs a production bundle in `dist/`.

The convenience script:

`npm run deploy:prep`

will:

- build the site, and
    
- copy `dist/index.html` to `dist/404.html` (useful for static hosts that fall  
    back to `404.html` for unknown routes).
    

You can host `dist/` on any static hosting provider (Netlify, Vercel, GitHub  
Pages, Cloudflare Pages, S3 + CloudFront, etc.).

For the signup worker, configure:

- `VITE_SIGNUP_ENDPOINT` / `VITE_SLACK_WEBHOOK` in the hosting environment
    
- Turnstile site key / secret in the worker’s configuration
    
- GA / GTM (for `gtag`) on the HTML shell or via your tag manager
