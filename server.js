const express = require('express');
const mongoose = require('mongoose');
// start server
const app = express();

// DB config
const db = require('./config/keys').mongoURI;
const users = require('./routes/API/users');
const posts = require('./routes/API/posts');
const profile = require('./routes/API/profile');
// connect to mongodb
mongoose.connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
app.get('/', (req, res) => res.send('hello'));

// Use routes
app.use('/routes/API/users', users);
app.use('/routes/API/posts', posts);
app.use('/routes/API/profile', profile);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app running on port ${port}`));