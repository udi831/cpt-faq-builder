/**
 * api/config.js — Vercel Serverless Function
 * Central Park Tours · FAQ Builder
 *
 * Returns the Express backend URL to the browser at runtime.
 * This keeps the backend URL out of the HTML file — set it once
 * in Vercel environment variables and all deploys pick it up automatically.
 *
 * Environment Variable (set in Vercel Dashboard → Settings → Environment Variables):
 *   BACKEND_URL   Full URL of your Express backend, e.g.
 *                 https://cpt-faq-backend.onrender.com
 *                 (do NOT include /api/faqs — that path is appended here)
 */
export default function handler(req, res) {
  const backendBase = process.env.BACKEND_URL || '';

  if (!backendBase && process.env.VERCEL_ENV === 'production') {
    return res.status(500).json({
      error: 'BACKEND_URL environment variable is not set. ' +
             'Go to Vercel Dashboard → Your Project → Settings → Environment Variables and add it.'
    });
  }

  const apiUrl = backendBase.replace(/\/$/, '') + '/api/faqs';

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ apiUrl });
}
