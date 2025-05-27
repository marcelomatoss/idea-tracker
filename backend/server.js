
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'ideas.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Helper functions
const readIdeas = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading ideas:', error);
    return [];
  }
};

const writeIdeas = (ideas) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(ideas, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing ideas:', error);
    return false;
  }
};

// Routes

// GET /api/ideas - Get all ideas
app.get('/api/ideas', (req, res) => {
  console.log('GET /api/ideas - Fetching all ideas');
  const ideas = readIdeas();
  res.json(ideas);
});

// POST /api/ideas - Create a new idea
app.post('/api/ideas', (req, res) => {
  console.log('POST /api/ideas - Creating new idea:', req.body);
  
  const { title, description, tags, category } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ 
      error: 'Title, description, and category are required' 
    });
  }

  const ideas = readIdeas();
  const newIdea = {
    id: uuidv4(),
    title,
    description,
    tags: tags || [],
    category,
    createdAt: new Date().toISOString()
  };

  ideas.unshift(newIdea);
  
  if (writeIdeas(ideas)) {
    res.status(201).json(newIdea);
  } else {
    res.status(500).json({ error: 'Failed to save idea' });
  }
});

// PUT /api/ideas/:id - Update an idea
app.put('/api/ideas/:id', (req, res) => {
  console.log('PUT /api/ideas/:id - Updating idea:', req.params.id, req.body);
  
  const { id } = req.params;
  const { title, description, tags, category } = req.body;
  
  if (!title || !description || !category) {
    return res.status(400).json({ 
      error: 'Title, description, and category are required' 
    });
  }

  const ideas = readIdeas();
  const ideaIndex = ideas.findIndex(idea => idea.id === id);
  
  if (ideaIndex === -1) {
    return res.status(404).json({ error: 'Idea not found' });
  }

  ideas[ideaIndex] = {
    ...ideas[ideaIndex],
    title,
    description,
    tags: tags || [],
    category
  };

  if (writeIdeas(ideas)) {
    res.json(ideas[ideaIndex]);
  } else {
    res.status(500).json({ error: 'Failed to update idea' });
  }
});

// DELETE /api/ideas/:id - Delete an idea
app.delete('/api/ideas/:id', (req, res) => {
  console.log('DELETE /api/ideas/:id - Deleting idea:', req.params.id);
  
  const { id } = req.params;
  const ideas = readIdeas();
  const ideaIndex = ideas.findIndex(idea => idea.id === id);
  
  if (ideaIndex === -1) {
    return res.status(404).json({ error: 'Idea not found' });
  }

  ideas.splice(ideaIndex, 1);

  if (writeIdeas(ideas)) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Failed to delete idea' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Idea Tracker Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💡 Ideas API: http://localhost:${PORT}/api/ideas`);
});
