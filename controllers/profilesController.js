var Profile = require( '../models/profile' );
var fs = require('fs')
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// const ImageSchema = new mongoose.Schema({
//   image: {
//     data: Buffer,
//     contentType: String
//   }
// });
// var A = mongoose.model('A', ImageSchema);

/* VIEWS */
// Index
exports.index = function( req, res, next ) {
  // create our locals parameter
  let locals = {
    title: 'Members'
  };

  Profile.find()
  .then( function ( profiles ) {
    // add the profiles to our locals
    locals.profiles = profiles;

    // render our view
    res.render( 'profiles/index', locals )
  })
  .catch( function ( err ) {
    next( err )
  });

    console.log(__dirname);
};

// Show
exports.show = function ( req, res, next ) {

  Profile.findById({
    _id: req.params.id
  })
  .then( function ( profile ) {
    // add the profiles to our locals
    locals.profile = profile;

    // render our view
    res.render( 'profiles/show', locals )
  })
  .catch( function ( err ) {
    next( err )
  })

  // locals
  let locals = {
    title: 'Member Details'
  };
};

// New
exports.new = function ( req, res ) {
  // locals
  let locals = {
    title: 'New Profile'
  };

  res.render( 'profiles/new', locals )
};

// Edit
exports.edit = function ( req, res, next ) {
  // locals
  let locals = {
    title: 'Edit profile',
  };

  Profile.findById({
    _id: req.params.id
  })
  .then( function ( profile ) {
    // add the profiles to our locals
    locals.profile = profile;

    // render our view
    res.render( 'profiles/edit', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
};

/* ACTIONS */
// Create
exports.create = function ( req, res, next ) {
  // var x = {data:'',
  //         contentType: ''};

  // image
  // if ( req.files && req.files.image ) {
    // let image = req.files.image
    // image.mv(`${__dirname}/public/images/${image.name}`)
    // imageName = image.name;
    // console.log(req.file.path);
  //   x.data = req.files.image.toString('base64');
  //   x.contentType = 'image/' + req.files.image.name.split('.').pop();
  //
  // } else {
  //   x = null;
  // }
  let details = null
  if (req.body['detail[key]'] && req.body['detail[value]']) {
    // assign an empty array to specfications
    details =[]
    let detail_keys = req.body['detail[key]']
    let detail_values = req.body['detail[value]']
   
    // populate if an array
    if ( detail_keys && Array.isArray( detail_keys ) ) {
      for (let i = 0; i < detail_keys.length; i++) {
        details.push( { key: detail_keys[i], value: detail_values[i] } )
      }
    } else {
      // populate is a string
      details.push( { key: detail_keys, value: detail_values } )
    }
  }


  Profile.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    program: req.body.program,
    autobiography: req.body.autobiography,
    details: details
    // image: x
  })
  .then( function () {
    x = null;
    res.redirect( '/profiles' )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// Update
exports.update = function ( req, res, next ) {
  // images
//works in local but not online
  // image
  // if ( req.files && req.files.image ) {
  //   let image = req.files.image
  //   image.mv( `${__dirname}/public/images/${image.name}`)
  //   imageName = image.name;
  // } else {
  //   imageName = null;
  // }

  // if ( req.files && req.files.image ) {
  //   var x = {
  //     data: '',
  //     contentType: ''
  //   }
  //
  //   x.data = req.files.image.toString('base64');
  //   x.contentType = 'image/' + req.files.image.name.split('.').pop();
  //
  // } else {
  //   x = null;
  // }
  let details = null
  if (req.body['detail[key]'] && req.body['detail[value]']) {
    // assign an empty array to specfications
    details =[]
    let detail_keys = req.body['detail[key]']
    let detail_values = req.body['detail[value]']
   
    // populate if an array
    if ( detail_keys && Array.isArray( detail_keys ) ) {
      for (let i = 0; i < detail_keys.length; i++) {
        details.push( { key: detail_keys[i], value: detail_values[i] } )
      }
    } else {
      // populate is a string
      details.push( { key: detail_keys, value: detail_values } )
    }
  }


  Profile.findById( req.params.id )
  .then(function ( profile ) {
    profile.name = req.body.name
    profile.description = req.body.description
    profile.price = req.body.price
    profile.autobiography = req.body.autobiography
    profile.details = details
    // profile.image = x

    profile.save()
    .then(  function () {
      x = null;
      res.redirect( '/profiles' )
    })
    .catch( function ( err ) {
      next( err )
    })
  })
  .catch(function ( err ) {
    next( err )
  })
};

// Delete
exports.delete = function ( req, res ) {
  Profile.remove({
    _id: req.body.id
  })
  .then( function () {
    res.redirect( '/profiles' )
  })
  .catch( function ( err ) {
    next( err )
  })
};
