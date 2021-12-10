const wageController = require('../controllers/wage.controller');
const router = require('express').Router();

router.get('/', wageController.list);
router.post('/', wageController.create);
router.get('/:id', wageController.read);
router.put('/:id', wageController.update);
router.delete('/:id', wageController.delete);

module.exports = router;