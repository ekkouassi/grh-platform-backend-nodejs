const router = require('express').Router();
const roleControler = require('../controllers/role.controller');

router.get('/', roleControler.showRoles);
router.post('/', roleControler.createRole);
router.put('/:id', roleControler.updateRole)
router.get('/:id', roleControler.showRole);
router.delete('/:id', roleControler.deleteRole);

module.exports = router;
