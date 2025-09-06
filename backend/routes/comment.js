const express = require('express');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    return res.json({ status: 'success', result: comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.post('/:id', authenticateToken, async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const { _id, nickname } = req.user;
  if (!content) {
    return res
      .status(400)
      .json({ status: 'error', message: '내용을 입력해주세요.' });
  }

  try {
    const newComment = new Comment({
      postId,
      content,
      authorId: _id,
      authorNickname: nickname,
    });
    await newComment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $inc: { commentsCount: 1 } },
      { new: true }
    );

    if (!updatedPost) {
      console.warn(
        '게시글을 찾을 수 없어 commentsCount를 업데이트하지 못했습니다.'
      );
    }

    res.status(201).json({ status: 'success', result: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.patch('/:commentId', authenticateToken, async (req, res) => {
  const commentId = req.params.commentId;
  const { content } = req.body;
  const userId = req.user._id;

  if (!content || content.trim() === '') {
    return res
      .status(400)
      .json({ status: 'error', message: '댓글 내용을 입력해주세요.' });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ status: 'error', message: '댓글을 찾을 수 없습니다.' });
    }

    if (comment.authorId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'error',
        message: '작성자가 아니므로 수정할 수 없습니다.',
      });
    }

    comment.content = content;
    comment.updatedAt = Date.now();
    await comment.save();

    res.json({ status: 'success', result: comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (comment.authorId.toString() !== userId.toString()) {
      return res.status(403).json({
        status: 'error',
        message: '작성자가 아니므로 권한이 없습니다.',
      });
    }

    await comment.deleteOne();

    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentsCount: -1 },
    });

    res.json({ status: 'success', message: '댓글이 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

module.exports = router;
