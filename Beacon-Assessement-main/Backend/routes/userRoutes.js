const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

const { protect } = require('../middleWare/authMiddleware');

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login', authUser).post(authUser);
module.exports = router;
