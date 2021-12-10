const router = require('express').Router();
const specialityController = require('../controllers/speciality.controller');

router.get('/', specialityController.list);
router.post('/', specialityController.create);
router.get('/:id', specialityController.read);
router.put('/:id', specialityController.update);
router.delete('/:id', specialityController.delete);

module.exports = router;