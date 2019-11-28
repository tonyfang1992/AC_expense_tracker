const express = require('express')
const router = express.Router()
const Record = require('../models/record')


router.get('/new', (req, res) => {
  return res.render('new')
})
//新增
router.post('/', (req, res) => {
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
  const record = new Record({
    name: req.body.name,
    category: icon,
    date: req.body.date,
    amount: req.body.amount
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

router.get('/fa-home', (req, res) => {
  let totalAmount = Number(0)
  Record.find({ category: 'fa-home' }, (err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    return res.render('fa-home', { records: records, totalAmount: totalAmount })
  })
})
router.get('/fa-shuttle-van', (req, res) => {
  let totalAmount = Number(0)
  Record.find({ category: 'fa-shuttle-van' }, (err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    return res.render('fa-shuttle-van', { records: records, totalAmount: totalAmount })
  })
})
router.get('/fa-grin-beam', (req, res) => {
  let totalAmount = Number(0)
  Record.find({ category: 'fa-grin-beam' }, (err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    return res.render('fa-grin-beam', { records: records, totalAmount: totalAmount })
  })
})
router.get('/fa-utensils', (req, res) => {
  let totalAmount = Number(0)
  Record.find({ category: 'fa-utensils' }, (err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    return res.render('fa-utensils', { records: records, totalAmount: totalAmount })
  })
})
router.get('/fa-pen', (req, res) => {
  let totalAmount = Number(0)
  Record.find({ category: 'fa-pen' }, (err, records) => {
    for (let i = 0; i < records.length; i++) {
      totalAmount += Number(records[i].amount)
      console.log(totalAmount)
    }
    return res.render('fa-pen', { records: records, totalAmount: totalAmount })
  })
})

router.put('/:id/edit', (req, res) => {
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

router.get('/:id/edit', (req, res) => {

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

router.delete('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})


module.exports = router