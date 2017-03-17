'use strict';

var app = angular.module('app', ['share-every']);

app.controller('appCtrl', function($scope){
    $scope.icons = {
        vkontakte: 'share in vk',
        facebook: '<img src="img/fb.png">'
    };

    $scope.social_counts = {
        twitter: 3,
        facebook: 15
    };

    $scope.facebook_counts = 999;
});