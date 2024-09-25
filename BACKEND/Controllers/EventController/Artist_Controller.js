const Artist = require('../../Models/EventModels/Artist_model');

// Register a new artist
const registerArtist = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name, !email, !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new artist document
    const newArtist = new Artist({ name, email, password }); // Hash password in production

    // Save the new artist to the database
    await newArtist.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering artist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login an artist
const loginArtist = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the artist exists
    const artist = await Artist.findOne({ email });
    if (!artist) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches (plain text comparison)
    if (password !== artist.password) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Include the artist's name in the response
    res.json({ success: true, message: 'Login successful', artist: { name: artist.name, email: artist.email } });
  } catch (error) {
    console.error('Error logging in artist:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Export functions
exports.registerArtist = registerArtist;
exports.loginArtist = loginArtist;
