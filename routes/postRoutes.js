const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router.post('/', postController.createNewPost);
router.delete('/:id', postController.deletePost);

module.exports = router;