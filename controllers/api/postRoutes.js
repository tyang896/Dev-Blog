//imports
const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//ROUTE: api/posts
//Add a new user post
router.post('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.create({
            title: req.body.title,
            description: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err);
    }

})

//ROUTE: api/posts/comment
//Add a new comment
router.post('/comment', withAuth, async (req, res) => {
    try{
        //Create the comment data
        const commentData = await Comment.create({
            description: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        }); 
        res.status(200).json(commentData);
    }catch (err)  {
        res.status(500).json(err);
    }
})

// //ROUTE: api/posts/:id
// router.put('/:id', (req, res) => {

// })

module.exports = router;