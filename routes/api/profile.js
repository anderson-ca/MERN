const express = require('express');
const router = express.Router();

// @route    GET api/profile/profile
// @desc     Test get request
// @access   Public
router.get('/test', (req, res) => res.json({msg: "Profile page"}));

module.exports = router;