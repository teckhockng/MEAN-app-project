var Profile = require( '../models/profile' );

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
    title: 'Edit profile'
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
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv(`${__dirname}/public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  Profile.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    age: req.body.age,
    program: req.body.program,
    autobiography: req.body.autobiography,
    image: imageName
  })
  .then( function () {
    res.redirect( '/profiles' )
  })
  .catch( function ( err ) {
    next( err )
  })
};

// Update
exports.update = function ( req, res, next ) {
  // images
  // image
  if ( req.files && req.files.image ) {
    let image = req.files.image
    image.mv( `${__dirname}/public/images/${image.name}`)
    imageName = image.name;
  } else {
    imageName = null;
  }

  Profile.findById( req.params.id )
  .then(function ( profile ) {
    profile.name = req.body.name
    profile.description = req.body.description
    profile.price = req.body.price
    profile.image = imageName

    profile.save()
    .then(  function () {
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
