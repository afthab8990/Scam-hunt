// api/collect.js
export default async function handler(req, res) {
  // Handle CORS preflight (OPTIONS request)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Your Google Apps Script URL (keep this secret – it's okay in serverless)
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwBoxyNMLbWCcXQogSH_PpizTml1HFAK_VmF0JqlJuTzCWW-_KS7A6ik6YuENSSM42l/exec';

  try {
    // Forward the request to Google Apps Script
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Add CORS headers to the response back to your frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: err.message });
  }
}
