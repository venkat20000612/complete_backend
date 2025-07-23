var express = require('express');
const { render } = require('pug');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next){
  res.render('index',{title: 'hello world'});
});


module.exports = router;
