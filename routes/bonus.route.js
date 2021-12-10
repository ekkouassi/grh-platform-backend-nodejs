const bonusController = require('../controllers/bonus.controller');
const router = require('express').Router();

router.get('/', bonusController.list);
router.post('/', bonusController.create);
router.get('/:id', bonusController.read);
router.put('/:id', bonusController.update);
router.delete('/:id', bonusController.delete);

module.exports = router;