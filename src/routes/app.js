const router = require('express').Router();
const passport = require('passport');
const Comment = require('../models/comment');


//RUTAS

router.get('/', (req, res, next) => {
  res.redirect('/signin');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/blog',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/blog',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/blog', isAuthenticated, async (req, res, next) => {
    try {
      const comments = await Comment.find();
      console.log(comments);
      res.render('blog', { comments });
    } catch (error) {
      console.error(error);
      next(error);
    }
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        // Maneja el error si ocurre
        console.log(err);
        return res.redirect('/blog');
      }
      
      // Redirigir al usuario después de hacer logout a signin
      res.redirect('/signin');
    });
});

router.post('/comments', (req, res) => {
    // Obtener el email del usuario logeado
    const email = req.user.email;
  
    // Se guarda los comentarios en la base de datos
    const {message, fecha } = req.body;
    const newComment = new Comment();
    newComment.email = email;
    newComment.message = message;
    newComment.fecha = fecha;
    newComment.save();
  
    res.send('¡Comentario recibido!');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/signin')
}

module.exports = router;
