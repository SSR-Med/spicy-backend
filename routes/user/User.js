// Dependencies
const express = require('express')
// Services
const { getUsers,deleteUser,createUser,modifyUser, changePassword } = require('../../services/user/UserService')
// Modules
const {sequelize} = require('../../config/Database')
// Helpers
const { verifyToken } = require('../../helpers/user/Token')
const { checkAdmin } = require('../../helpers/user/CheckAdmin')

const router = express.Router()
router.use(express.json())

// Routes
// GET /user : Get all users (Only admin)
router.get('/', verifyToken, checkAdmin, async (req, res) => {
    try{
        const users = await getUsers()
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
});
// Delete /user : Delete a user (Only admin)
router.delete('/:id', verifyToken, checkAdmin, async (req, res) => {
    try{
        const user = await deleteUser(req.params.id)
        if (user) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
// Put /user : Modify a user (Only admin)
router.put('/:id', verifyToken, checkAdmin, async (req, res) => {
    try{
        const user = await modifyUser(req.params.id,req.body.username,req.body.password,req.body.admin,req.body.objects)
        if (user) {
            return res.status(200).json({ message: 'User updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
// Delete self user
router.delete('/', verifyToken, async (req, res) => {
    try{
        const user = await deleteUser(req.id)
        if (user) {
            return res.status(200).json({ message: 'User deleted successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({message: 'Internal server error'})
    }
})
// POST /user : Register a new user
router.post('/', async (req, res) => {
    try{
        const newUser = await createUser(req.body.username, req.body.password, false, {})
        if (!newUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
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