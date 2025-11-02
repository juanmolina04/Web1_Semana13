const express = require('express');
const router = express.Router();
const controller = require('../controllers/tasksController');

// Endpoints según el documento
router.get('/', controller.getAll);
router.get('/summary', controller.getSummary);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id/status', controller.updateStatus);
router.delete('/:id', controller.remove);

module.exports = router;
