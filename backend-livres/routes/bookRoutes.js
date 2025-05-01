const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcontroller');
const authController = require('../controllers/authcontroller');

// Protection globale
router.use(authController.authMiddleware);

router.get('/', bookController.getBooks);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;