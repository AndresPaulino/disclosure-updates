const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authenticateToken, isAdmin, authController.register);
router.put('/update', authenticateToken, isAdmin, authController.updateUser);
router.get('/users', authenticateToken, isAdmin, authController.getUsers);

module.exports = router;