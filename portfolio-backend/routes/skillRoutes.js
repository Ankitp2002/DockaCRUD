const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { Skill } = require('../models/skills/skill'); 
const { mongo } = require('mongoose');

// Get all skills
router.get('/', (req, res) => {
  Skill.find({}, { __v: 0 })
    .then(skills => {
      res.json(skills);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Add a new skill
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const skill = new Skill({ name, description });

  skill.save()
    .then(newSkill => {
      res.status(201).json(newSkill);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
});

// Update a skill
router.put('/:id', (req, res) => {
  Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete a skill
router.delete('/:id', (req, res) => {
  // Delete skill
  Skill.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
