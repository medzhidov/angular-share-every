/**
 * SHARE-JS: plugin for angular.
 */

angular.module('share-every', []);

angular.module('share-every', []).directive('share', ['$sce', function($sce){
    return {
        restrict: 'A',
        template: '<div ng-class="key" ng-repeat="(key, item) in icons track by $index" ng-bind-html="item" ng-click="openLink(key)"></div>',
        scope: {
            url: "@share",
            title: "@shareTitle",
            subtitle: "@shareSubtitle",
            text: "@shareText",
            image: "@shareImage",
            tag: "@shareTag",
            custom_icons: "=shareIcons"
        },
        link: function ($scope){
            var _ = function(selector){return document.querySelector(selector)};

            var options_default = {
                url: location.href,
                title: document.querySelector('title').innerHTML || '',
                subtitle: '',
                image: ( _('meta[name="description"]') != null ) ? _('meta[name="description"]').getAttribute('content') : '',
                text: ( _('meta[property="og:image]') != null ) ? _('meta[property="og:image"]').getAttribute('content') : '',
                tag: ''
            };

            var socials = {
                vk: 'https://vk.com/share.php?url=$URL$&title=$TITLE$&description=$TEXT$&image=$IMAGE$',
                facebook: 'https://www.facebook.com/dialog/feed?app_id=1514286898864851&link=$URL$&name=$TITLE$&caption=$SUBTITLE$&description=$TEXT$&picture=$IMAGE$&display=popup',
                twitter: 'https://twitter.com/intent/tweet?url=$URL$&text=$TEXT$&hashtags=$TAG$',
                telegram: 'https://telegram.me/share/url?url=$URL$&text=$TEXT$',
                evernote: 'http://www.evernote.com/clip.action?url=$URL$&title=$TITLE$',
                odnoklassniki: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments=$TEXT$&st._surl=$URL$',
            };


            $scope.icons = $scope.custom_icons || {
                vk: '<span class="fa fa-vk"></span>',
                facebook: '<span class="fa fa-facebook"></span>',
                twitter: '<span class="fa fa-twitter"></span>',
                telegram: '<span class="fa fa-paper-plane"></span>',
                evernote: '<svg width="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-miterlimit="1.414" viewBox="0 0 16 16" clip-rule="evenodd" stroke-linejoin="round"><path fill-rule="nonzero" d="M11.277 7.568c-.216-.007-.424.006-.618.037.05-.44.23-.98.88-.96.71.026.81.7.81 1.157-.3-.134-.68-.22-1.08-.234m3.05-4.784c-.12-.64-.5-.953-.84-1.077-.37-.134-1.12-.273-2.07-.384-.76-.09-1.65-.082-2.19-.065C9.16.815 8.85.41 8.5.27 7.58-.103 6.15-.013 5.782.09c-.29.082-.613.25-.793.507-.12.172-.2.392-.2.7 0 .175 0 .586.01.95l.01.697c0 .326-.27.59-.598.59h-1.5c-.32 0-.566.055-.753.14-.187.085-.32.2-.42.335-.2.26-.236.6-.235.94 0 0 .002.27.07.81.054.41.504 3.31.932 4.19.17.34.28.48.6.63.73.31 2.39.655 3.16.754.78.1 1.27.306 1.56-.3 0-.004.056-.153.134-.373.25-.762.28-1.44.28-1.93 0-.05.076-.05.076 0 0 .347-.07 1.57.856 1.9.364.13 1.12.245 1.89.336.696.08 1.2.352 1.2 2.14 0 1.082-.228 1.23-1.42 1.23-.966 0-1.335.025-1.335-.742 0-.62.615-.555 1.07-.555.2 0 .056-.15.056-.535 0-.38.237-.6.012-.605-1.576-.043-2.5 0-2.5 1.966 0 1.784.682 2.12 2.914 2.12 1.75 0 2.367-.06 3.09-2.3.143-.446.49-1.797.7-4.06.132-1.44-.125-5.768-.33-6.86m-11.68.33h1.51c.084 0 .154-.07.154-.157 0 0-.018-1.29-.018-1.648V1.29c0-.294.06-.55.17-.765l.05-.1c-.006 0-.01 0-.017.01L1.57 3.33c-.006.005-.01.01-.012.017l.155-.074c.254-.114.562-.177.93-.177"/></svg>',
                odnoklassniki: '<span class="fa fa-odnoklassniki"></span>',
            };

            // trust all icons
            for ( var icon in $scope.icons ){
                $scope.icons[icon] = $sce.trustAsHtml( $scope.icons[icon] );
            }


            $scope.openLink = function(social){
                var link = socials[social];
                
                var image = ( $scope.image[0] == '/' ) ? location.origin + $scope.image : location.href.split('#')[0] + $scope.image;

                link = link.replace('$URL$', encodeURIComponent($scope.url || options_default.url));
                link = link.replace('$TITLE$', encodeURIComponent($scope.title || options_default.title));
                link = link.replace('$SUBTITLE$', encodeURIComponent($scope.subtitle || options_default.subtitle));
                link = link.replace('$TEXT$', encodeURIComponent($scope.text || options_default.text));
                link = link.replace('$IMAGE$', encodeURIComponent(image || options_default.image));
                link = link.replace('$TAG$', encodeURIComponent($scope.tag || options_default.tag));

                window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
            };
        }
    };
}]);
