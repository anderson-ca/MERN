const express = require('express');
const router = express.Router();

// @route    GET api/posts/posts
// @desc     Test get request
// @access   Public
router.get('/test', (req, res) => res.json({msg: "Posts page"}));

module.exports = router;