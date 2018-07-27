var express = require('express');
var router = express.Router();

// create a link to our drink model
var profilesController = require('../controllers/profilesController');

// index (http://my-app.com/profiles)
router.get( '/', profilesController.index );

// new (http://my-app.com/profiles/new)
router.get( '/new', profilesController.new );

// show (http://my-app.com/profiles/12345)
router.get( '/:id', profilesController.show );

// edit (http://my-app.com/profiles/12345/edit)
router.get( '/:id/edit', profilesController.edit );

// create (http://my-app.com/profiles)
router.post( '/', profilesController.create );

// update (http://my-app.com/profiles/12345)
router.post( '/:id', profilesController.update );

// delete (http://my-app.com/profiles/12345/delete)
router.post( '/:id/delete', profilesController.delete );

// makes our file public to the application
module.exports = router;
