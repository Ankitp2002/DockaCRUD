const mongoose = require('mongoose');

const Skill = mongoose.model('Skills', {
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = {Skill};
