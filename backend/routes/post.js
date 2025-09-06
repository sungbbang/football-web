const express = require('express');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ status: 'success', result: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const myPosts = await Post.find({ authorId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json({ status: 'success', result: myPosts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    res.json({ status: 'success', result: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ status: 'error', message: '게시글이 존재하지 않습니다.' });

    if (post.authorId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'error',
        message: '작성자가 아니므로 권한이 없습니다.',
      });
    }

    if (!title || !content) {
      return res
        .status(400)
        .json({ status: 'error', message: '제목과 내용은 필수입니다.' });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    await post.save();

    res.json({ status: 'success', result: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: 'error', message: '게시글이 존재하지 않습니다.' });
    }

    if (post.authorId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'error',
        message: '작성자가 아니므로 권한이 없습니다.',
      });
    }

    await post.deleteOne();
    await Comment.deleteMany({ postId: postId });

    res.json({ status: 'success', message: '게시글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

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

router.post('/:id/like', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ status: 'error', message: '게시글을 찾을 수 없습니다.' });
    }

    const hasLiked = post.likedUsers.some(id => id.equals(userId));

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      hasLiked
        ? { $pull: { likedUsers: userId }, $inc: { likesCount: -1 } }
        : { $addToSet: { likedUsers: userId }, $inc: { likesCount: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        status: 'error',
        message: '게시글을 찾을 수 없어 좋아요를 처리할 수 없습니다.',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        isLiked: !hasLiked,
        likesCount: updatedPost.likesCount,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
