const express = require('express');
const cors = require('cors');
const multer = require('multer');
const winston = require('winston');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

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

// API route: AI transcription using Open AI's Whisper API
app.post('/api/ai/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const audioFile = req.file; // Uploaded audio file
    if (!audioFile) {
      return res.status(400).json({ error: 'No audio file uploaded' });
    }

    // Read the audio file as a stream
    const audioStream = fs.createReadStream(audioFile.path);

    // Call Open AI's Whisper API for transcription
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        file: audioStream,
        model: 'whisper-1',
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Clean up: Delete the temporary file
    fs.unlinkSync(audioFile.path);

    res.json({ transcription: response.data.text });
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
