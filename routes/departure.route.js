const departureController = require('../controllers/departure.controller');
const router = require('express').Router();

router.get('/', departureController.list);
router.post('/', departureController.create);
router.get('/:id', departureController.read);
router.put('/:id', departureController.update);
router.delete('/:id', departureController.delete);

module.exports = router;