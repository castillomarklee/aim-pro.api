const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/roles.controller');

router.get('/', rolesController.findAll);
router.post('/', rolesController.create);
router.get('/:id', rolesController.findById);
router.put('/:id', rolesController.update);
router.delete('/:id', rolesController.delete);

module.exports = router;