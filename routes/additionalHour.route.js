const additionalHourController = require('../controllers/additionalHour.controller');
const router = require('express').Router();

router.post('/', additionalHourController.create);
router.get('/', additionalHourController.list);
router.get('/:id', additionalHourController.read);
router.put('/:id', additionalHourController.update);
router.delete('/:id', additionalHourController.delete);

module.exports = router;