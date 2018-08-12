const mongoose = require( 'mongoose' );

// all model classes will inherit from
// the mongoose.Schema class
const DetailSchema = new mongoose.Schema({
  key: {
    type: String,
    required: 'You must have a key.'
  },
  value: {
    type: String,
    required: 'You must have a value.'
  }
});

const ImageSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String
  }
});

const ProfileSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: 'Please enter the first name.'
  },
  last_name: {
    type: String,
    required: 'Please enter the last name.'
  },
  age: {
    type: Number,
    required: 'Please enter the age.'
  },
  program: {
    type: String,
    required: 'Please enter the college program.'
  },
  autobiography: {
    type: String
  },
  details: [DetailSchema]
});




// make this class public
module.exports = mongoose.model( 'Profile', ProfileSchema );
