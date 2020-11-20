/*Beans Copyright info*/
var express = require('express');
var router = express.Router();
var Article = require('../controllers/articles.server.controllers');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
const {
    authenticate,
    authorizeAdmin,
    authorizeTTE,
    authorizeDealer,
    authorizeAll,
    authorizeAdminTTE,
    authorizeAdminDealer,
    authorizeTTEDealer,
} = require('../middleware/middleware');

/* BEANS code generated for CRR*UD. */

/*Create articles record*/
router.post('/', authenticate, upload.array(), Article.createArticle);

/*Get single articles*/
router.get('/:slug' , authenticate, Article.getArticle);

/*Get all Articles.*/
router.get('/' , authenticate, Article.getAllArticles);

/*Update an articles record*/
router.post('/:articles_id', authenticate, upload.array(), Article.updateArticle);

/*Delete articles */
router.delete('/:articles_id', authenticate, Article.deleteArticle);

/*For pagination*/
router.get('/:itemsPerPage/:pageNo' , Article.getAllArticlesForPagination);

/*For sorting*/
router.get('/sort/:itemsPerPage/:pageNo/:colname/:orderBy' , Article.getAllArticlesSortedByColumn);

/*For filtering*/
router.get('/filter/:itemsPerPage/:pageNo/:colname/:filterText' , Article.getAllArticlesFilteredByColumn);

/*For Searching*/
router.get('/search/:itemsPerPage/:pageNo/:colname/:searchText' , Article.getAllArticlesBySearchText);



module.exports = router;
