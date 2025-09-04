const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const postId = req.query.postId;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return res.json({ status: 'success', result: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
