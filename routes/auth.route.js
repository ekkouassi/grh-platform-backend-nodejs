const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authorize = require('../middleware/authorize');
router.post('/login', authController.signIn);
router.post('/refresh-token', authController.refreshToken);
router.get('/me/:id', authorize(), authController.me);
router.post('/revoke-token/:id', authorize(), authController.revokeRefreshToken);
router.get('/:id/refresh-tokens', authorize(), authController.getRefreshTokens);

module.exports = router;