const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

// start server
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);

// Listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app running on port ${port}`));