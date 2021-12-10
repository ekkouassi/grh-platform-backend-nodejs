const displacementController = require('../controllers/displacement.controller');
const router = require('express').Router();

router.get('/', displacementController.list);
router.post('/', displacementController.create);
router.get('/:id', displacementController.read);
router.put('/:id', displacementController.update);
router.delete('/:id', displacementController.delete);

module.exports = router;