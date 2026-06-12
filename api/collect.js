export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwBoxyNMLbWCcXQogSH_PpizTml1HFAK_VmF0JqlJuTzCWW-_KS7A6ik6YuENSSM42l/exec';
  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(response.status).json(data);
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: err.message });
  }
}
