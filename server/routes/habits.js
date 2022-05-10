const express = require('express')

const { authCheck } = require('../authCheck')
const db = require('../db/db')

const router = express.Router()

router.get('/', authCheck, async (req, res) => {
  const auth0Id = req.auth.sub
  const userId = auth0Id.split('|')[1]
  db.getHabits(userId)
    .then((habits) => {
      return res.json({ habits: habits })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch habits TT_TT' })
    })
})

router.post('/', authCheck, async (req, res) => {
  const auth0Id = req.auth.sub
  const { newHabit } = req.body
  const userId = auth0Id?.split('|')[1]

  if (!newHabit) {
    return res.status(400).send({ message: 'No habit provided' })
  }

  if (!userId) {
    return res.status(401).send({ message: 'Unauthorised' })
  }

  db.addHabit({ ...newHabit, userID: userId })
    .then((habit) => {
      return res.json(habit)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to add habit DX' })
    })
})

router.patch('/', authCheck, async (req, res) => {
  const auth0Id = req.auth.sub
  const updatedHabit = req.body
  const userId = auth0Id?.split('|')[1]

  if (!updatedHabit) {
    return res.status(400).send({ message: 'No habit provided' })
  }

  if (!userId) {
    return res.status(401).send({ message: 'Unauthorised' })
  }

  db.updateHabit({ ...updatedHabit, userID: userId })
    .then(() => {
      return res.json(1)
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
