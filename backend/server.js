const express = require('express');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/bookRoutes');
const sequelize = require('./config/database');
const fileUpload = require('express-fileupload');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  abortOnLimit: true,
  responseOnLimit: 'File size limit has been reached',
}));
app.use(cors());

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
  next();
});

// Routes
app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Sync database and start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });
