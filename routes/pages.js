const express   = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.redirect('/login');
  }, (req, res) => {
    res.render('index');
  });
  
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register');
});



module.exports = router;