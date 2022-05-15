const express = require('express')
const { authCheck } = require('../authCheck')

const db = require('../db/db')

const router = express.Router()

router.get('/', authCheck, (req, res) => {
  const auth0Id = req.auth.sub
  const auth0 = auth0Id?.split('|')[1]
  db.getUser(auth0)
    .then((user) => {
      const userToSend = {
        ...user,
        badges: user.badges ?? [],
      }
      return res.json(userToSend)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch users (ಠ︹ಠ)' })
    })
})

router.post('/', authCheck, async (req, res) => {
  const auth0 = req.auth.sub?.split('|')[1]

  const userToSave = {
    ...req.body.user,
    auth0,
  }

  try {
    const isInDb = await db.isInDb(auth0)
    console.log(isInDb)
    if (isInDb) return res.sendStatus(200)

    const newUser = await db.addUser(userToSave)
    return res.status(201).json(newUser)
  } catch (err) {
    console.error(err)
    res.status(500).send({ message: 'Failed to sign in/sign up (ಠ︹ಠ)' })
  }
})

router.patch('/', authCheck, async (req, res) => {
  const auth0Id = req.auth.sub
  const updatedProfile = req.body
  const userId = auth0Id?.split('|')[1]

  if (!updatedProfile) {
    return res.status(400).send({ message: 'No profile provided' })
  }

  if (!userId) {
    return res.status(401).send({ message: 'Unauthorised' })
  }

  db.updateProfile({ ...updatedProfile, id: userId })
    .then(() => {
      return res.json(1)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to add habit DX' })
    })
})

router.patch('/', authCheck, (req, res) => {
  const user = req.body.user
  db.updateUserById(user)
    .then((user) => {
      return res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to update users ╰(•́ ꞈ •̀)╯' })
    })
})

module.exports = router