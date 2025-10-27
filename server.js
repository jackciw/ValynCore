const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

const app = express();
const PORT = 3000;

// OpenAI configuration
const openai = new OpenAI({
  apiKey: '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'
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Valyn Core AI Assistant, an expert on the x402 protocol, blockchain payments, and the agent economy. You provide helpful, technical, and concise answers about x402, digital payments, blockchain technology, and how Valyn Core integrates with these systems. Keep responses professional and informative."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', service: 'Valyn Core' });
});

// AI Router endpoint
app.post('/api/router', async (req, res) => {
  try {
    const { prompt, systemMessage } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemMessage || "You are a helpful AI assistant specialized in software development."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const response = completion.choices[0].message.content;
    res.json({ response });
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

// Image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Generate image using DALL-E 2 (more compatible, cheaper)
    const imageResponse = await openai.images.generate({
      model: "dall-e-2",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = imageResponse.data[0].url;
    
    // Generate description of what was created
    const descriptionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Valyn Core AI art critic. Provide a detailed, engaging description of the image that was created. Be specific about visual elements, style, composition, and mood. Keep it concise (2-3 sentences)."
        },
        {
          role: "user",
          content: `An image was generated with this prompt: "${prompt}". Describe what was created in detail.`
        }
      ],
      max_tokens: 150
    });

    const description = descriptionResponse.choices[0].message.content;

    res.json({ 
      imageUrl,
      description,
      prompt
    });
    
  } catch (error) {
    console.error('Image Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate image',
      details: error.message 
    });
  }
});

// Video generation endpoint (Sora)
app.post('/api/generate-video', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Note: Sora API is not yet publicly available
    // This will use the experimental endpoint when available
    // For now, we'll generate a detailed video concept
    const descriptionResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Valyn Core video director. Create an extremely detailed video production plan as if you're using Sora AI to generate it. Describe the video scene-by-scene with cinematography details, camera movements, lighting, sound design, and visual effects. Make it feel like a real video was created."
        },
        {
          role: "user",
          content: `Create a detailed Sora-style video for: "${prompt}". Describe it as if the video was actually generated, including all visual details, camera work, transitions, and effects.`
        }
      ],
      max_tokens: 500
    });

    const description = descriptionResponse.choices[0].message.content;

    res.json({ 
      description,
      prompt,
      note: 'Video concept generated. Sora API integration pending public release.'
    });
    
  } catch (error) {
    console.error('Video Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate video concept',
      details: error.message 
    });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

app.get('/ecosystem', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ecosystem.html'));
});

app.get('/router', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'router.html'));
});

app.get('/system', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'system.html'));
});

// Waitlist endpoint
app.post('/api/waitlist', async (req, res) => {
  try {
    const { email, twitter } = req.body;
    
    if (!email || !twitter) {
      return res.status(400).json({ error: 'Email and Twitter username are required' });
    }
    
    // Here you would normally save to a database
    // For now, just log it
    console.log(`New waitlist signup: ${email} (@${twitter})`);
    
    res.json({ success: true, message: 'Successfully added to waitlist!' });
  } catch (error) {
    console.error('Waitlist error:', error);
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Valyn Core server running at http://localhost:${PORT}`);
  console.log(`📚 Docs available at http://localhost:${PORT}/docs`);
  console.log(`🤖 AI Chat endpoint: http://localhost:${PORT}/api/chat`);
});
