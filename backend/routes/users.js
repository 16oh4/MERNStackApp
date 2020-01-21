const router = require('express').Router();
//this is the export as defined in user.model.js
let User = require('../models/user.model');


//TODO HAVE ENTIRE CRUD DEFINED
//Create and Read done
//Update and delete missing

//handles incoming HTTP requests on the /users URL path
router.route('/').get( (req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch( err => res.status(400).json('Error: ' + err) );
});

//ADD USER
router.route('/add').post( (req, res) => {
    const username = req.body.username;         //get from the request!
    const newUser = new User( {username} );

    newUser.save()  //user saved to the database
    .then( () => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;