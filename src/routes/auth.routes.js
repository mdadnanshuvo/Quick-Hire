const router = require('express').Router();
const { login, getMe } = require('../controllers/auth.controller');
const { loginRules } = require('../validators/auth.validator');
const validate = require('../middlewares/validate');
const { protect } = require('../middlewares/auth.middleware');

router.post('/login', loginRules, validate, login);
router.get('/me', protect, getMe);

module.exports = router;