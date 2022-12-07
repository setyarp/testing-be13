const router = require('express').Router();
const {register} = require('../controllers/authController');

router.post('/auth/register', register);

module.exports = router;