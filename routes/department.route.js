const router = require('express').Router();
const departmentController = require('../controllers/department.controller');

router.get('/', departmentController.list);
router.post('/', departmentController.create);
router.get('/:id', departmentController.read);
router.put('/:id', departmentController.update);
router.delete('/:id', departmentController.delete);

module.exports = router;