const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Import routes
const routes = require('./routes');

// Middleware
app.use(cors());
app.use(express.json());

// Serve the uploads folder as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount the routes at /api
app.use('/api', routes);

// Simple route
app.get('/', (req, res) => {
  res.send('Express server is running');
});

// Start the server after database synchronization
const db = require('./models'); // Import Sequelize instance and models

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');
    return db.sequelize.sync({});
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });