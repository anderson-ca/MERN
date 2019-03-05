const express = require('express');
const router = express.Router();

// @route    GET api/profile/users
// @desc     Test get request
// @access   Public
router.get('/test', (req, res) => res.json({msg: "Users page"}));

module.exports = router;