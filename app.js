var app = angular.module('flapperNews', ['ui.router'])

// 'Posts' Service
app.factory('posts', [function(){
  var o = {
    posts: [
      {title: 'post 1', votes: 25, link: 'http://google.com'},
      {title: 'post 2', votes: 11},
      {title: 'post 3', votes: 15},
      {title: 'post 4', votes: 49},
      {title: 'post 5', votes: 34}
    ]
  };
  return o;
}]);

// UI Router
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

    $stateProvider.state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

// Main Controller
app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts) {

    $scope.posts = posts.posts;

    $scope.addPost = function() {
      if(!$scope.title || $scope.title === '') { return; }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link,
        votes: 0,
        comments: [
          {author: 'Joe', body: 'Cool Posts!', votes: 0},
          {author: 'Bob', body: 'Great idea but that is wrong!', votes: 0}
        ]
      });
      $scope.title = '';
      $scope.link = '';
    };

    $scope.incrementVotes = function(post) {
      post.votes += 1;
    };

    $scope.decrementVotes = function(post) {
      post.votes -= 1;
    };
}]);

// Posts Controller
app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){

}]);
