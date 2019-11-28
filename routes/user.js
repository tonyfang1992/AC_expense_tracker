const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', (req, res) => {
  passport.authenticate('local', {                        // 使用 passport 認證
    successRedirect: '/',                                         // 登入成功會回到根目錄
    failureRedirect: '/users/login'                        // 失敗會留在登入頁面
  })(req, res, next)
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  User.findOne({ email: email }).then(user => {
    if (user) {                                       // 檢查 email 是否存在
      console.log('User already exists')
      res.render('register', {                // 使用者已經註冊過
        name,
        email,
        password,
        password2
      })
    } else {
      const newUser = new User({    // 如果 email 不存在就直接新增
        name,
        email,
        password
      })
      newUser
        .save()
        .then(user => {
          res.redirect('/')
        })
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router