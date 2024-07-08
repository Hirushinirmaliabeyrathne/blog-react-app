const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Ensure the correct path

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        console.error('Error saving post:', err.message);
        res.status(500).json({ error: 'An error occurred while saving the post.', details: err.message });
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    { $set: req.body },
                    { new: true }
                );
                res.status(200).json(updatedPost);
            } catch (err) {
                console.error('Error updating post:', err.message);
                res.status(500).json({ error: 'An error occurred while updating the post.', details: err.message });
            }
        } else {
            res.status(401).json({ error: 'You can update only your post!' });
        }
    } catch (err) {
        console.error('Error finding post:', err.message);
        res.status(500).json({ error: 'Error updating post', details: err.message });
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("Post has been deleted...");
            } catch (err) {
                console.error('Error deleting post:', err.message);
                res.status(500).json({ error: 'An error occurred while deleting the post.', details: err.message });
            }
        } else {
            res.status(401).json({ error: 'You can delete only your post!' });
        }
    } catch (err) {
        console.error('Error finding post:', err.message);
        res.status(500).json({ error: 'Error deleting post', details: err.message });
    }
});

// GET SINGLE POST
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        console.error('Error getting post:', err.message);
        res.status(500).json({ error: 'Error getting post', details: err.message });
    }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
    const username = req.query.user;
    const catname = req.query.cat;
    try {
        let posts;
        if (username) {
            posts = await Post.find({ username });
        } else if (catname) {
            posts = await Post.find({ categories: { $in: [catname] } });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        console.error('Error getting posts:', err.message);
        res.status(500).json({ error: 'Error getting posts', details: err.message });
    }
});

module.exports = router;
