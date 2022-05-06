const express = require('express')

const db = require('../db/db')

const router = express.Router()

router.get('/', (req, res) => {
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
  const habit = req.body
    db.addHabits(habit)
  .then((habit) => {
    return res.json({habits: habit})
  })   
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: 'Failed to add habit DX' })
  })
})

router.get('/:id', (req, res) => {  
  const id = req.params.id
  db.getOneHabit(id)
  .then((habit) => {
    return res.json({habits: habit})
  })   
  .catch((err) => {
    console.log(err)
    res.status(500).send({ message: 'Failed to get one habit DX' })
  })

})
module.exports = router



