const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://yash:<password>@note69.jsbkedx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema and model for notes
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Routes
// Define routes for CRUD operations

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// Create a note
app.post('/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Implement other CRUD routes (GET, PUT, DELETE)
