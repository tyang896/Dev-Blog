//imports
const router = require('express').Router();
const {User} = require('../../models')

//ROUTE: api/users/
//This route adds a new user to the database
router.post('/', async (req, res) => {
    try{
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
    
});

//ROUTE: api/users/login
//This route checks the user's login credentials
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
    
        if (!userData) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
          res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
          return;
        }
        //Assign user_id and logged_in variable here:
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.json({ user: userData, message: 'You are now logged in!' });
        });
    
      } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
});


//api/users/logout
//This route terminates the user's current session
router.post('/logout', (req, res) => {
  //If logged_in = true, end session
    if (req.session.logged_in) {
        req.session.destroy(() => {
          res.status(204).end();
        });
      } else {
        res.status(404).end();
      }
})

module.exports = router;