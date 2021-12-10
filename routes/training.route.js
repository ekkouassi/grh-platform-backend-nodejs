const router = require('express').Router();
const trainingController = require('../controllers/training.controller');

router.get('/', trainingController.list);
router.post('/', trainingController.create);
router.get('/:id', trainingController.read);
router.put('/:id', trainingController.update);
router.delete('/:id', trainingController.delete);

module.exports = router;