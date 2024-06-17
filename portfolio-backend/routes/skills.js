const express = require('express');
const router = express.Router();
const { Skill } = require('../models/skills/skill'); // Assuming Skill model is defined in models/Skill.js

// GET all skills
router.get('/', (req, res) => {
  Skill.find({}, { __v: 0 })
    .then(skills => {
      res.render('skills/skill', { skills });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// GET form to create a new skill
router.get('/new', (req, res) => {
  res.render('skills/new');
});

// POST a new skill
router.post('/', (req, res) => {
  const newSkill = new Skill(req.body);
  newSkill.save()
    .then(() => {
      res.redirect('/skills');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// PUT to update a skill
router.put('/:id', (req, res) => {
  Skill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// DELETE a skill
router.post('/:id', (req, res) => {
  Skill.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/skills');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
