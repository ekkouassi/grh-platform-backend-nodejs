const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const userRoleController = require('../controllers/userRole.controller');

router.post('/register', authController.signUp);
router.get('/logout', authController.logOut);

// UPDATING
router.put('/update-email/:id', userController.updateEmail);
router.put('/update-password/:id', userController.updatePassword);
router.put('/edit-profile/:id', userController.updateProfile);
router.put('/update-avatar/:id', userController.updateAvatar);

// MANAGE USER ROLE & CLEARANCES
router.put('/role/:userId', userRoleController.addOrUpdateRrole);
router.delete('/role/:userId', userRoleController.removeClearance);

module.exports = router;
