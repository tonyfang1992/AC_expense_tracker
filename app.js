const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
  require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const Record = require('./models/record')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')

// 引用 body-parser
const bodyParser = require('body-parser')
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: 'your secret key',   // secret: 定義一組屬於你的字串做為私鑰
  resave: false,
  saveUninitialized: true,
}))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

//使用passport
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)
// 登入後可以取得使用者的資訊方便我們在 view 裡面直接使用
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})
app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()      // 辨識使用者是否已經登入的變數，讓 view 可以使用
  next()
})


app.use('/', require('./routes/home'))
app.use('/users', require('./routes/user'))
app.use('/records', require('./routes/record'))
app.use('/auth', require('./routes/auths'))

app.listen(port, () => {
  console.log(`the web is running on http://localhost:${port}`)
})
