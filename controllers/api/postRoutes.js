const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//ROUTE: api/posts
router.post('/', withAuth, async (req, res) => {
    try{
        console.log("this try is working for the api/posts/")
        console.log(req.body);
        console.log(req.body.title);
        console.log(req.body.content);
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

module.exports = router;