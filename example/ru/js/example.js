'use strict';

var app = angular.module('app', ['share-every']);

app.controller('appCtrl', function($scope){
    $scope.icons = {
        vkontakte: 'репост в вк',
        facebook: '<img src="img/fb.png">'
    };

    $scope.social_counts = {
        twitter: 3,
        facebook: 15
    };

    $scope.vkontakte_counts = 999;
});