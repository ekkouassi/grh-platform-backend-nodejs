const leaveController = require('../controllers/leave.controller');
const router = require('express').Router();

router.get('/', leaveController.list);
router.post('/', leaveController.create);
router.get('/:id', leaveController.read);
router.put('/:id', leaveController.update);
router.delete('/:id', leaveController.delete);

module.exports = router;