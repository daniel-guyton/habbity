const express = require('express')

const { authCheck } = require('../authCheck')
const db = require('../db/db')

const router = express.Router()

router.get('/', authCheck, async (req, res) => {
  const auth0Id = req.auth.sub
  const userId = auth0Id.split('|')[1]
  db.getHabits(userId)
    .then((habits) => {
      return res.json({habits: habits})
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch habits TT_TT'})
    })
})

router.post('/', authCheck, async (req, res) => {
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

// router.get('/:id', authCheck, async (req, res) => {  
//   const id = req.params.id
//   db.getHabits(id)
//   .then((habit) => {
//     return res.json({habits: habit})
//   })   
//   .catch((err) => {
//     console.log(err)
//     res.status(500).send({ message: 'Failed to get one habit DX' })
//   })

// })
module.exports = router



