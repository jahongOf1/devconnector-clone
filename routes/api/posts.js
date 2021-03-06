const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route    POSt api/posts
// @desc   create a post
// @access  Private
router.post('/', 
    [ 
        auth, 
        [
            check('text', 'Text is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() })
        } 

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post ({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();
            res.json( post );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    
    }
);

// @route    GET api/posts
// @desc   Get all posts
// @access  Private // make into public

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

// @route    GET api/posts/:id
// @desc   Get all posts by ID
// @access  Private // make into public

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json( post );
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send('Server Error');
    }
} );


// @route  Delete api/posts/:id
// @desc   Delete a post
// @access  Private // make into public

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        

        if(!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        if(post.user.toString() !== req.user.id) {
            return  res.status(401).json({msg: 'User not authorized'});
        }
        
        await post.remove();
        res.json({msg: 'Post removed'});

    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send('Server Error');
    }
} );


// @route   Put api/posts/like/:id
// @desc    :ike aPost
// @access  Private // make into public

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // check if the post has been liked

        if(post.likes.filter(like => like.user.toString())) {
            return res.json(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });

        await post.save()

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
} );

// @route   Put api/posts/like/:id
// @desc   Like apost
// @access  Private // make into public
router.put('/like/:id', auth, async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.json(400).json({msg: 'Post already liked'})
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Send Error')
    }
});
module.exports = router;