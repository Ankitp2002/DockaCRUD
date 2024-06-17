const express = require('express');
const router = express.Router();
const { Project } = require('../models/projects/project'); // Assuming Project model is defined in models/Project.js

// GET all projects
router.get('/', (req, res) => {
  Project.find()
    .then(projects => {
      res.render('projects/project', { projects });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// GET form to create a new project
router.get('/new', (req, res) => {
  res.render('projects/new');
});

// POST a new project
router.post('/', (req, res) => {
  const newProject = new Project(req.body);
  newProject.save()
    .then(() => {
      return Project.find({}, { __v: 0 });
    })
    .then(projects => {
      res.render('projects/project', { projects });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


// PUT to update a project
router.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// DELETE a project
router.post('/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/projects');
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
