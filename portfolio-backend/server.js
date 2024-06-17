const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the CORS middleware

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.Promise = global.Promise;

//Docker use
mongoose.connect('mongodb://mongo:27017/USW_project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, 
})
.then(() => {
  console.log("MongoDB is connected");
  app.emit("ready");
})
  .catch(err => console.error('MongoDB connection error:', err));

  // for local use 
// mongoose.connect('mongodb://0.0.0.0:27017/USW_project', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   maxPoolSize: 10, 
// })
// .then(() => {
//   console.log("MongoDB is connected");
//   app.emit("ready");
// })
//   .catch(err => console.error('MongoDB connection error:', err));
  
// Enable CORS middleware
app.use(cors());

// Routes
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve EJS views
app.use('/', require('./routes/index'));
app.use('/skills', require('./routes/skills'));
app.use('/projects', require('./routes/projects'));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
