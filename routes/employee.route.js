const router = require('express').Router();
const employeeController = require('../controllers/employee.controller');

router.get('/', employeeController.list);
router.post('/', employeeController.create);
router.get('/:id', employeeController.read);
router.put('/:id', employeeController.update)
router.delete('/:id', employeeController.delete);
router.put('/:id/docs', employeeController.setDocument);

module.exports = router;