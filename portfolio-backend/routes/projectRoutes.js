const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { Project } = require('../models/projects/project');

// Get all projects
router.get('/', (req, res) => {
  Project.find()
    .then(projects => {
      res.json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Add a new project
router.post('/', (req, res) => {
  const { name, description, techStack } = req.body;
  const project = new Project({ name, description, techStack });

  project.save()
    .then(newProject => {
      res.status(201).json(newProject);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
});

// Update a project
router.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// Delete a project
router.delete('/:id', (req, res) => {
  // Delete project
  Project.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
