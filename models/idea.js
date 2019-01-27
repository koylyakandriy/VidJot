const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema
const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: String,
    require: true
  },
  detail:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  }
});

mongoose.model('ideas', IdeaSchema);