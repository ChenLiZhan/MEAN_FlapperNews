var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'MainCtrl'
        })
        .state('posts', {
            url: '/posts/{id}',
            templateUrl: '/posts.html',
            controller: 'PostsCtrl'
        });

    $urlRouterProvider.otherwise('home');
}]);

app.factory('posts', [function() {
    var o = {
        posts: []
    };

    return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
    $scope.test = 'Hello Wolrd!';
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if (!$scope.title) {
            return;
        }
        $scope.posts.push({
            title: $scope.title,
            link: $scope.link,
            upvotes: 0,
            comments: [{
                author: 'Nina',
                body: 'Cool Post',
                upvotes: 0
            }, {
                author: 'Lee',
                body: 'Greatest Post',
                upvotes: 0
            }]
        });

        $scope.title = '';
        $scope.link = '';
    };

    $scope.incrementUpvotes = function(post) {
        post.upvotes += 1;
    };

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];

    $scope.incrementUpvotes = function(comment) {
        comment.upvotes += 1;
    };

    $scope.addComment = function() {
        if (!$scope.body) {
            return;
        }

        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });

        $scope.body = '';
    };

}]);