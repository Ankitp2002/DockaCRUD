const express = require('express');
const router = express.Router();
const {Project} = require('../models/projects/project'); // Assuming Project model is defined in models/Project.js
const { Skill } = require('../models/skills/skill'); // Assuming Skill model is defined in models/Skill.js

router.get('/', async (req, res) => {
  Promise.all([
    Skill.find({}, { __v: 0 }).lean(),
    Project.find({}, { __v: 0 }).lean()
  ])
  .then(([skills, projects]) => {
    res.render('home', { skills, projects });
  })
  .catch(err => {
    // Handle errors
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  });
});

module.exports = router;
