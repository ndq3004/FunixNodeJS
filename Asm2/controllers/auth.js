const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    console.log(req.session)
    res.render('login/formLogin', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: req.session.isLoggedIn
    })
}

exports.postLogin = (req, res, next) => {
    User.findById('5baa2528563f16379fc8a610')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user
            res.redirect('/')
        })
        .catch(err => console.log(err));
}

exports.getLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login')
    })
}