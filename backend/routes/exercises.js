//Router instance is a complete middleware routing system!
//Creates a modular, mountable route handler
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//this timeLog middleware function is specific to this router for the exercises!
router.use( function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

//HTTP GET ENDPOINT
//READ
router.route('/').get( (req, res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

//HTTP POST
//CREATE
router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);     //cast to Number for the SchemaType
    const date = Date.parse(req.body.date);         //returns number of ms since jan  1, 1970

    //Have to instantiate a new Exercise to save to MongoDB
    const newExercise = new Exercise( {
        username,
        description,
        duration,
        date,
    });

    //Save exercise in mongoDB
    newExercise.save()
    .then( () => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete( (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
    .then( () => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Updates an exercise by HTTP POST
router.route('/update/:id').post( (req, res) => {
    Exercise.findById(req.params.id)
    .then(exercise => { //exercise is the document from the MongoDB
        //req.body is the data passed in from the POST
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then( () => res.json('Exercise updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;