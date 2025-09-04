const express = require('express');
const Post = require('../models/Post');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { _id, nickname } = req.user;
    if (!title || !content) {
      return res
        .status(400)
        .json({ status: 'error', message: '제목과 내용을 모두 입력해주세요.' });
    }

    const latestPost = await Post.findOne().sort({ number: -1 });
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const post = new Post({
      number: nextNumber,
      title,
      content,
      authorId: _id,
      authorNickname: nickname,
    });

    const savedPost = await post.save();
    res.status(201).json({ status: 'success', result: savedPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
