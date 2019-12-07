const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { authenticated } = require('../config/auth')


router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})
//新增
router.post('/', authenticated, (req, res) => {
  let icon = ''
  let monthofdate = ''
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
  monthofdate += req.body.date[0] + req.body.date[1]
  const record = new Record({
    name: req.body.name,
    category: icon,
    date: req.body.date,
    amount: req.body.amount,
    userId: req.user._id,
    month: monthofdate,
    merchant: req.body.merchant
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})
//分類
router.get('/search', authenticated, (req, res) => {
  let totalAmount = Number(0)
  console.log(req.query.Month)
  console.log(req.query.classification)
  if (req.query.Month === 'all') {
    Record.find({ category: `${req.query.classification}`, userId: req.user._id }, (err, records) => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        console.log(totalAmount)
      }
      return res.render('index', { records: records, totalAmount: totalAmount })
    })
  }
  else {
    Record.find({ month: `${req.query.Month}`, category: `${req.query.classification}`, userId: req.user._id }, (err, records) => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += Number(records[i].amount)
        console.log(totalAmount)
      }
      return res.render('index', { records: records, totalAmount: totalAmount })
    })
  }
})

//修改
router.put('/:id/edit', authenticated, (req, res) => {
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
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
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

router.get('/:id/edit', authenticated, (req, res) => {

  let select = ({
    home: '',
    van: '',
    grin: '',
    utensils: '',
    pen: ''
  })

  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
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

router.delete('/:id/delete', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router