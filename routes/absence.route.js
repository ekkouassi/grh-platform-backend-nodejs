const absenceController = require('../controllers/absence.controller');
const router = require('express').Router();

router.get('/', absenceController.list);
router.post('/', absenceController.create);
router.get('/:id', absenceController.read);
router.put('/:id', absenceController.update);
router.delete('/:id', absenceController.delete);

module.exports = router;