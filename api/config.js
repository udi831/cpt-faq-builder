/**
 * api/config.js — Vercel Serverless Function
 * Central Park Tours · FAQ Builder
 *
 * Returns runtime configuration to the browser.
 * Set N8N_WEBHOOK_URL in your Vercel project environment variables.
 *
 * Environment Variables (set in Vercel Dashboard → Settings → Environment Variables):
 *   N8N_WEBHOOK_URL   The public base URL of your n8n instance, e.g.
 *                     https://your-n8n-domain.com
 *                     The FAQ Builder will append /webhook/cpt-faq-api automatically.
 */
export default function handler(req, res) {
  const n8nBase = process.env.N8N_WEBHOOK_URL || '';

  // Validate that the env var is set in production
  if (!n8nBase && process.env.VERCEL_ENV === 'production') {
    return res.status(500).json({
      error: 'N8N_WEBHOOK_URL environment variable is not set. ' +
             'Go to Vercel Dashboard → Your Project → Settings → Environment Variables and add it.'
    });
  }

  // Strip trailing slash, then append the webhook path
  const apiUrl = n8nBase.replace(/\/$/, '') + '/webhook/cpt-faq-api';

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ apiUrl });
}
