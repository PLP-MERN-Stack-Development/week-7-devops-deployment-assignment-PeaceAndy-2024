const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(helmet()); // Secure HTTP headers
app.use(morgan('combined')); // Logging

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Connection pooling
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
