var express = require('express');
var router = express.Router();
var articlesController = require('../controllers/articles');

/* GET all articles */
router.get('/', articlesController.getAllArticles);

/* GET details of an article */
router.get('/:id', articlesController.getOneArticle);

/* Add an article */
router.post('/', articlesController.createArticle);

/* Add multiple articles */
router.post('/bulk-insert', articlesController.bulkInsertArticles);

/* Update an article */
router.put('/:id', articlesController.updateArticle);

/* Delete a article */
router.delete('/:id', articlesController.deleteArticle);

module.exports = router;
