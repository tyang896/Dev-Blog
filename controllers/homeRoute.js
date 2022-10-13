const router = require('express').Router();
const {User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Post }],
        });
    
        const user = userData.get({ plain: true });
        
        //TODO: Get all the posts created by the user
        const postData = await Post.findAll({//NOTE: might need to change this to include the USER model
          where: {user_id: req.session.user_id}
        })

        const posts = postData.map((post) => post.get({plain: true}));
        //TODO: Allow users to click on exisiting posts in the dashboard to edit or delete them
        //TODO: Have a new javascript eventlistener button to allow users to click on the button
        //TODO: create new handlebar to allow users to post a comment
        //TODO: In the new handlebar page, when users click on the submit button, The post is created and added to their dashboard and homepage
        res.render('dashboard', {
          ...user,
          posts,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
})



//Get the page to create a new post
router.get('/create', withAuth, (req, res) => {
  if(!req.session.logged_in){
    res.render('login')
  }
  res.render('createPost', {logged_in: req.session.logged_in});
})

router.get('/login', (req, res) => {
// If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
})

router.get('/signup', (req, res) => {
    res.render('signup');
})

//Get the post details for a specific post
router.get('/:id',  withAuth, async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        { 
          model: User,
          attributes: ['username'], 
        },
      ],
    })

    const post = postData.get({plain: true});

    const allComments = await Comment.findAll({
      where: {post_id: req.params.id},
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ],
  })

  const comments = allComments.map((comment) => comment.get({plain: true}));
        console.log(comments);
        console.info(comments);
    res.render('blogpost', {
      post,
      comments,
      logged_in: true,
    });
  }catch (err) {
    res.status(400).json(err);
  }
    
})

//ROUTE: dashboard/:id
router.get('/dashboard/:id', async (req, res) => {
  try{
    const postData = await Post.findByPk(req.params.id)
    const post = postData.get({plain: true});
    res.render('editPost', {
      ...post, 
      logged_in: req.session.logged_in
    });
  }catch (err){
    res.status(500).json(err);
  }

})

module.exports = router;