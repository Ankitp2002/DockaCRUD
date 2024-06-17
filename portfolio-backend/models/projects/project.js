const mongoose = require('mongoose');

// Define the schema
const Project = mongoose.model('Projects', {
  name: {
    type: String,
    required: true
  },
  techStack: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = {Project};
