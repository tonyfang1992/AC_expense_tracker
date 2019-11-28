const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const exphbs = require('express-handlebars')
const Record = require('./models/record')
// 引用 body-parser
const bodyParser = require('body-parser')
// 設定 bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })
  })
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})
app.get('/records/fa-home', (req, res) => {
  Record.find({ category: 'fa-home' }, (err, records) => {
    return res.render('fa-home', { records: records })
  })
})
app.get('/records/fa-shuttle-van', (req, res) => {
  Record.find({ category: 'fa-shuttle-van' }, (err, records) => {
    return res.render('fa-shuttle-van', { records: records })
  })
})
app.get('/records/fa-grin-beam', (req, res) => {
  Record.find({ category: 'fa-grin-beam' }, (err, records) => {
    return res.render('fa-grin-beam', { records: records })
  })
})
app.get('/records/fa-utensils', (req, res) => {
  Record.find({ category: 'fa-utensils' }, (err, records) => {
    return res.render('fa-utensils', { records: records })
  })
})
app.get('/records/fa-pen', (req, res) => {
  Record.find({ category: 'fa-pen' }, (err, records) => {
    return res.render('fa-pen', { records: records })
  })
})

app.post('/records/:id/edit', (req, res) => {
  let icon = ''
  if (req.body.category === '家居物業') {
    icon += 'fa-home'
  }
  if (req.body.category === '交通出行') {
    icon += 'fa-shuttle-van'
  }
  if (req.body.category === '休閒娛樂') {
    icon += 'fa-grin-beam'
  }
  if (req.body.category === '餐飲食品') {
    icon += 'fa-utensils'
  }
  if (req.body.category === '其他') {
    icon += 'fa-pen'
  }
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name
    record.category = icon
    record.date = req.body.date
    record.amount = req.body.amount
    record.save(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/records/:id/edit', (req, res) => {

  let select = ({
    home: '',
    van: '',
    grin: '',
    utensils: '',
    pen: ''
  })

  Record.findById(req.params.id, (err, record) => {
    if (record.category === 'fa-home') {
      select.home += 'select'
    }
    if (record.category === 'fa-shuttle-van') {
      select.van += 'select'
    }
    if (record.category === 'fa-grin-beam') {
      select.grin += 'select'
    }
    if (record.category === 'fa-utensils') {
      select.utensils += 'select'
    }
    if (record.category === 'fa-pen') {
      select.pen += 'select'
    }
    if (err) return console.error(err)
    return res.render('edit', { record: record, select: select })
  })
})

app.listen(port, () => {
  console.log(`the web is running on http://localhost:${port}`)
})
