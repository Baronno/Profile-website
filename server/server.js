require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const RATE_FILE = path.join(__dirname, 'rate_limits.json');
let rateLimits = {};
try {
  rateLimits = JSON.parse(fs.readFileSync(RATE_FILE, 'utf8') || '{}');
} catch (e) {
  rateLimits = {};
}

function save() {
  try {
    fs.writeFileSync(RATE_FILE, JSON.stringify(rateLimits, null, 2));
  } catch (e) {
    console.error('Failed to save rate limits:', e);
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

app.post('/api/chat', async (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || req.ip || '').toString().split(',')[0].trim();
  const message = req.body?.message;
  if (!message) return res.status(400).json({ error: 'Missing message' });

  const date = today();
  if (!rateLimits[ip] || rateLimits[ip].date !== date) {
    rateLimits[ip] = { date, count: 0 };
  }

  if (rateLimits[ip].count >= 3) {
    return res.status(429).json({ error: 'It reach the daily limit to answer' });
  }

  // Increment early to avoid race small window; for production use Redis with atomic counters
  rateLimits[ip].count += 1;
  save();

  try {
    // Load content.json from client src so the assistant only answers from that data
    const contentPath = path.join(__dirname, '..', 'src', 'content.json');
    let content = {};
    try {
      content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    } catch (e) {
      content = {};
    }

    const systemPrompt = `You are a strict personal assistant for ${content.header?.name || 'the person'}. Only answer questions about ${content.header?.name || 'the person'} using ONLY the facts provided in the JSON below. Do NOT invent facts or speculate. If asked something outside of this person's profile, reply exactly: "I can only answer questions about ${content.header?.name || 'the person'}. Please ask about their background, skills, experience, projects, or contact info."\n\nFacts JSON:\n${JSON.stringify(content)}`;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.2
    };

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(text || `${resp.status} ${resp.statusText}`);
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || '';
    return res.json({ reply });
  } catch (err) {
    console.error('Assistant error:', err);
    return res.status(500).json({ error: 'Assistant error', detail: err.message });
  }
});

app.get('/api/limits', (req, res) => {
  res.json(rateLimits);
});

const port = process.env.PORT || 5174;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
