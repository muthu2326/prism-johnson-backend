/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Article = require('../controllers/articles.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data


/* BEANS code generated for CRR*UD. */

/*Create articles record*/
router.post('/', upload.array(), /*auth.isAuthenticated,*/ Article.createArticle);

/*Get single articles*/
router.get('/:slug' , Article.getArticle);

/*Get all Articles.*/
router.get('/' , Article.getAllArticles);

/*Update an articles record*/
router.post('/:articles_id', upload.array(), /*auth.isAuthenticated,*/ Article.updateArticle);

/*Delete articles */
router.delete('/:articles_id', /*auth.isAuthenticated,*/ Article.deleteArticle);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Article.getAllArticlesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Article.getAllArticlesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Article.getAllArticlesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Article.getAllArticlesBySearchText);



module.exports = router;
