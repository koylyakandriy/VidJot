const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

// Load IdeaModel
require('./../models/idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', ensureAuthenticated, (req, res) => {
  Idea.find({user: req.user.id})
    .sort({date:'desc'})
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
});

// Add Ideas Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});

// Edit Ideas Form
router.get('/edit/:id',ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      if(idea.user != req.user.id) {
        req.flash('error_msq', 'Not Authorized');
        res.redirect('ideas');
      } else {
          res.render('ideas/edit', {
          idea: idea
        });
      }
    });
});

// Process form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];

  if(!req.body.title) {
    errors.push({text: 'Please add a title'});
  }
  if(!req.body.detail) {
    errors.push({text: 'Please add detail'})
  }

  if(errors.length > 0) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.parser,
      detail: req.body.detail
    });
  } else {
    const newUser = {
      title: req.body.title,
      detail: req.body.detail,
      user: req.user.id
    };
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', "New videos is created");
        res.redirect('/ideas');
      });
    }
});

// Edit Form process
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
  .then(idea => {
    // new value
    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Video idea update');
        res.redirect('/ideas');
      });
  });
});

// Delete Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({
    _id: req.params.id
  })
    .then(() => {
      req.flash('success_msg', 'Video idea remove');
      res.redirect('/ideas');
    });
});

module.exports = router;