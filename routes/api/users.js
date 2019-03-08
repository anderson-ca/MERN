const express = require('express');
const passport = require('passport');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const router = express.Router();

// Load User model
const User = require('../../models/User');

// @route    GET api/users/test
// @desc     Test get request
// @access   Public
router.get('/test', (req, res) => res.json({msg: "Users page"}));

// @route    GET api/users/register
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
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log('Error:', err));
                });
            });

        }
    });
});

// @route    GET api/users/login
// @desc     Get JWT token
// @access   Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email}).then(user => {

        // Check if user exist
        if (!user) {
            res.status(404).json({email: "User not found"});
        }

        //  Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // Generate jwt payload
                    const payload = {id: user.id, name: user.name, avatar: user.avatar};

                    // Sign jwt token
                    jwt.sign(
                        payload,
                        keys.secret,
                        {expiresIn: 3600},
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });
                } else {
                    return res.status(400).json({password: "Password Incorrect"});
                }
            }).catch(err => console.log(err));
    });
});

// @route    GET api/users/current
// @desc     Return current user
// @access   Private
router.get('/current', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        });
    });

module.exports = router;