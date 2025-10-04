
EPICKART - Fullstack demo (Frontend + Backend)

Contents:
- frontend/index.html        => Static frontend (edit CONFIG to set BACKEND_BASE_URL, RAZORPAY_KEY_ID, EMAILJS_PUBLIC_KEY)
- frontend/products.json     => Sample product list (replace with your own)
- backend/server.js          => Node/Express server to create Razorpay orders & verify signatures
- backend/package.json       => npm dependencies
- .env.example               => example env variables (do NOT commit secrets)
- README.md                  => this file

Quick test locally:
1) Frontend: open frontend/index.html in browser (demo works, but online payments require server)
2) Backend:
   - cd backend
   - npm install
   - set env vars RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
   - node server.js (server on http://localhost:3000)

Deploy backend to Vercel/Render/Railway: push backend to GitHub, set env vars on host, deploy.
Deploy frontend on Netlify/Vercel/GitHub Pages.
