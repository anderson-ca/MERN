const express = require('express');
const gravatar = require('gravatar');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route    GET api/users/users
// @desc     Test get request
// @access   Public
router.get('/test', (req, res) => res.json({msg: "Users page"}));

// @route    GET api/users/users
// @desc     Register user
// @access   Public
router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            const newUser = new User({
                name: res.body.name,
                email: res.body.email,
                password: req.body.password,
                avatar: avatar
            });
        }
    });
});


module.exports = router;