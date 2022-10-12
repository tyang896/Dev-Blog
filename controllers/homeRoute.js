const router = require('express').Router();
const {User, Post} = require('../models');
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
    
        res.render('dashboard', {
          ...user,
          logged_in: true
        });
      } catch (err) {
        res.status(500).json(err);
      }
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

    res.render('blogpost', {
      post,
      logged_in: true,
    });
  }catch (err) {
    res.status(400).json(err);
  }
    
})

module.exports = router;