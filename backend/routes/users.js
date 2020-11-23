const router = require('express').Router();
let User = require('../models/user.model'); // use mongoose user model

// handles http get requests at localhost/add/
router.route('/').get((req, res) => {
    // mongoose method that gets all users.  Returns a promise
    User.find()
        .then(users => res.json(users)) // return the users in json format
        .catch(err => res.status(400).json('Error: ' + err));
});

// handles http post requests at localhost/add/
router.route('/add').post((req, res) => {
    const username = req.body.username;
    
    const newUser = new User({username});

    // User is saved to the db
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;