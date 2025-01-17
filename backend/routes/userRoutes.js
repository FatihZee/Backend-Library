const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rute untuk menambahkan user baru
router.post('/users', userController.createUser);

// Rute lainnya
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
