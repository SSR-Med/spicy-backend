// Dependencies
const express = require('express')
// Services
const { createUser, changePassword } = require('../../services/user/User')
// Modules
const {sequelize} = require('../../config/Database')
// Helpers
const { verifyToken } = require('../../helpers/user/Token')

const router = express.Router()
router.use(express.json())

// Routes
// POST /user : Register a new user
router.post('/', async (req, res) => {
    try{
        const newUser = createUser(req.body.username, req.body.password, false, {})
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
// PATCH /user : Update user password by himself
router.patch('/',verifyToken , async (req, res) => {
    try{
        const user = await changePassword(req.id, req.body.oldPassword, req.body.newPassword)
        if (user) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

module.exports = router