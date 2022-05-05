const express = require('express')

const db = require('../db/db')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(`router.get for getHabits was called`)
  db.getHabits()
    .then((habits) => {
      return res.json({habits: habits})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch habits TT_TT'})
    })
})

router.post('/', (req, res) => {
  const habit = req.body.habit
    db.addHabits(habit)
  .then((habit) => {
    return res.json(habit)
  })   
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: 'Failed to add habit DX' })
  })
})

// router.patch('/:id', (req, res) => {
  
//   const id = req.params.id
//   const updatedHabit = req

// })
module.exports = router