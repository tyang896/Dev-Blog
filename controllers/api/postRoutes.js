const router = require('express').Router();
const {Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//ROUTE: api/posts

//TODO: Create comment database model
//TODO: Have the comments have a foreign key to the post model. 
//TODO: Have the comment model contain: id, description, date_created, user_id, post_id
//TODO: Create a new comment data
//TODO: Have the comment display itself onto the post with the date created, and the user who created it

router.post('/comment', withAuth, async (req, res) => {
    try{
        //Create the comment data
        const commentData = await Comment.create({
            description: req.body.comment,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        }); 
        
        //TODO:Get list of all the comments associated with the specific post
        //TODO:render all the posts to a new handlebar file that shows all posts

        res.status(200).json(commentData);
        // res.render('blogpost');
        //TODO: create a new handlebar that shows the comments. 
        //TODO: How do I get the original post and also show all the comments?

    }catch (err)  {
        res.status(500).json(err);
    }
})

module.exports = router;