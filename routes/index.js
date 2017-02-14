var express = require('express');
var router = express.Router();

module.exports = router;

var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log('GET home page SUCCESFUL!');
});

/* GET all posts */
router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }

    res.json(posts);
    console.log('GET all posts SUCCESFUL!');
  });
});

/* GET a single post */
router.get('/posts/:post', function(req, res) {
  res.json(req.post);
  console.log('GET single post SUCCESFUL!');
});

/* POST new post */
router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
    console.log('POST new post SUCCESFUL!');
  });
});

/* Upvote a post */
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) {return next(err); }

    res.json(post);
    console.log('Upvote post SUCCESFUL');
  });
});

/* Downvote a post */
router.put('/posts/:post/downvote', function(req, res, next) {
  req.post.downvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
    console.log('Downvote post SUCCESFUL');
  });
});


router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});
