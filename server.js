const express = require('express');
const cors = require('cors');
const multer = require('multer');
const winston = require('winston');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const path = require('path');

const app = express();

// Configure logging with Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Configure Multer for file uploads (e.g., for audio files)
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON bodies
app.use(express.static(path.join(__dirname, 'dist'))); // Serve frontend static files

// Example API route: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API route: Fetch data from Supabase
app.get('/api/data', async (req, res) => {
  try {
    const { data, error } = await supabase.from('your_table').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// API route: AI transcription (e.g., using xAI's Grok API)
app.post('/api/ai/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioFile = req.file; // Uploaded audio file
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }
    // Example: Call xAI's Grok API for transcription (adjust based on actual API)
    const response = await axios.post('https://api.x.ai/grok/transcribe', {
      audio: audioFile.path, // Note: You may need to read the file or use a different format depending on the API
      api_key: process.env.GROK_API_KEY,
    });
    res.json({ transcription: response.data.transcription });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Fallback: Serve frontend for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
