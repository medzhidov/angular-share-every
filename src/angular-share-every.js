/**
 * @name: Angular Share-every
 * @description: module for angular. 
 * @license: MIT
 * @author: https://github.com/dslpp056193
 */

angular.module('share-every', []);


angular.module('share-every', [])
.service('Share', function(){
	var _el = function(selector){return document.querySelector(selector);};

	this.shares = {
		vkontakte: 'https://vk.com/share.php?url={url}&title={title}&description={description}&image={image}',
		facebook: 'https://www.facebook.com/dialog/feed?app_id=1514286898864851&link={url}&name={title}&caption={subtitle}&description={description}&picture={image}&display=popup',
		twitter: 'https://twitter.com/intent/tweet?url={url}&text={description}&hashtags={tag}',
		telegram: 'https://telegram.me/share/url?url={url}&text={description}',
		evernote: 'http://www.evernote.com/clip.action?url={url}&title={title}',
		odnoklassniki: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments={description}&st._surl={url}'
	};

	this.default = {
		url: location.href,
		title:  _el('meta[property="og:title"]') ? _el('meta[property="og:title"]').getAttribute('content') : '',
		subtitle: '',
		image: _el('meta[property="og:image"]') ? _el('meta[property="og:image"]').getAttribute('content') : '',
		text: _el('meta[property="og:description"]') ? _el('meta[property="og:description"]').getAttribute('content') : '',
		tag: ''
	};

	this.call = function(social, meta){
		/**
		 * @param meta.url => Url
		 * @param meta.title => Title
		 * @param meta.subtitle => Subtitle
		 * @param meta.text => Text
		 * @param meta.image => Image
		 * @param meta.tag => Tag
		 */

		var link = this.shares[social];

		// check link for image (absolute or relative)
		if ( meta.image.includes('http') ){
			var image = meta.image;
		} else {
			// create absolute link by relative
			var image = ( meta.image && meta.image[0] == '/' ) ? location.origin + meta.image : location.href.split('#')[0] + meta.image;
		}

		link = link.replace('{url}', encodeURIComponent(meta.url || this.default.url));
		link = link.replace('{title}', encodeURIComponent(meta.title || this.default.title));
		link = link.replace('{subtitle}', encodeURIComponent(meta.subtitle || this.default.subtitle));
		link = link.replace('{description}', encodeURIComponent(meta.text || this.default.text));
		link = link.replace('{image}', encodeURIComponent(image || this.default.image));
		link = link.replace('{tag}', encodeURIComponent(meta.tag || this.default.tag));

		window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600');
	};
})
/**
 * create list of share elements
 */
.directive('share', ['$sce', '$http', 'Share', function($sce, $http, Share){
	return {
		restrict: 'A',
		template: ''+
			'<div ng-class="key" ng-repeat="(key, item) in socials track by $index" ng-if="item.active" ng-click="share(key)" class="share--element">'+
				'<div class="share--icon" ng-bind-html="item.icon"></div>'+
				'<span class="share--count" ng-if="counter != false && item.counter > 0" ng-bind="item.counter"></span>'+
		   '</div>'
		,
		scope: {
			meta_url: "@shareUrl",
			meta_title: "@shareTitle",
			meta_subtitle: "@shareSubtitle",
			meta_text: "@shareText",
			meta_image: "@shareImage",
			meta_tag: "@shareTag",
			user_socials: "=shareSocials",
			/**
			 * 	@param user_socials
			 *	@example
			 	[
					 'vkontakte', 
					 'facebook'
				]
			 */
			user_icons: "=shareIcons",
			/**
			 * 	@param user_icons
			 *	@example
			 	{
					vkontakte: '<span class="fa fa-vkontakte"></span>',
					twitter: '<img src="twitter.png">'
				}
			 */
			user_counter: "=shareCounter",
			/**
			 * 	@param user_counter
			 *	@example
			 	{
					twitter: 3,
					facebook: 15
				}
			 */
		},
		link: function ($scope){
			var _ = function(selector){return document.querySelector(selector)};

			var options_default = {
				user_socials: $scope.user_socials || false,
				user_icons: $scope.user_icons || false,
				user_counter_enable: $scope.user_counter || false,
			};

			$scope.socials = {
				vkontakte: {
					icon: '<span class="fa fa-vk"></span>',
					counter: 0,
					active: true,
				},
				facebook: {
					icon: '<span class="fa fa-facebook"></span>',
					counter: 0,
					active: true,
				},
				twitter: {
					icon: '<span class="fa fa-twitter"></span>',
					counter: 0,
					active: true,
				},
				telegram: {
					icon: '<svg width="24" height="21" viewBox="0 0 24 21" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M7.75 11.04l10.807-6.687c.195-.12.394.144.228.3l-8.92 8.328c-.313.294-.516.686-.573 1.112l-.304 2.262c-.04.302-.462.332-.545.04l-1.17-4.125c-.133-.47.062-.974.477-1.23z" fill="#E1E1E1"/><path d="M.424 10.07l5.53 2.073 2.14 6.915c.137.442.677.606 1.034.312l3.083-2.524c.324-.264.784-.278 1.122-.03l5.56 4.053c.383.28.925.068 1.02-.397L23.987.793c.105-.506-.392-.93-.873-.743L.417 8.845c-.56.217-.555 1.013.007 1.225zm7.326.97l10.807-6.687c.195-.12.394.144.228.3l-8.92 8.328c-.313.294-.516.686-.573 1.112l-.304 2.262c-.04.302-.462.332-.545.04l-1.17-4.125c-.133-.47.062-.974.477-1.23z" fill="#FFF"/></g></svg>',
					counter: 0,
					active: true,
				},
				evernote: {
					icon: '<svg width="20" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-miterlimit="1.414" viewBox="0 0 16 16" clip-rule="evenodd" stroke-linejoin="round"><path fill-rule="nonzero" d="M11.277 7.568c-.216-.007-.424.006-.618.037.05-.44.23-.98.88-.96.71.026.81.7.81 1.157-.3-.134-.68-.22-1.08-.234m3.05-4.784c-.12-.64-.5-.953-.84-1.077-.37-.134-1.12-.273-2.07-.384-.76-.09-1.65-.082-2.19-.065C9.16.815 8.85.41 8.5.27 7.58-.103 6.15-.013 5.782.09c-.29.082-.613.25-.793.507-.12.172-.2.392-.2.7 0 .175 0 .586.01.95l.01.697c0 .326-.27.59-.598.59h-1.5c-.32 0-.566.055-.753.14-.187.085-.32.2-.42.335-.2.26-.236.6-.235.94 0 0 .002.27.07.81.054.41.504 3.31.932 4.19.17.34.28.48.6.63.73.31 2.39.655 3.16.754.78.1 1.27.306 1.56-.3 0-.004.056-.153.134-.373.25-.762.28-1.44.28-1.93 0-.05.076-.05.076 0 0 .347-.07 1.57.856 1.9.364.13 1.12.245 1.89.336.696.08 1.2.352 1.2 2.14 0 1.082-.228 1.23-1.42 1.23-.966 0-1.335.025-1.335-.742 0-.62.615-.555 1.07-.555.2 0 .056-.15.056-.535 0-.38.237-.6.012-.605-1.576-.043-2.5 0-2.5 1.966 0 1.784.682 2.12 2.914 2.12 1.75 0 2.367-.06 3.09-2.3.143-.446.49-1.797.7-4.06.132-1.44-.125-5.768-.33-6.86m-11.68.33h1.51c.084 0 .154-.07.154-.157 0 0-.018-1.29-.018-1.648V1.29c0-.294.06-.55.17-.765l.05-.1c-.006 0-.01 0-.017.01L1.57 3.33c-.006.005-.01.01-.012.017l.155-.074c.254-.114.562-.177.93-.177"/></svg>',
					counter: 0,
					active: true,
				},
				odnoklassniki: {
					icon: '<span class="fa fa-odnoklassniki"></span>',
					counter: 0,
					active: true,
				}
			};

			// trust all icons
			for ( var key in $scope.socials ){
				$scope.socials[key].icon = $sce.trustAsHtml( $scope.socials[key].icon );
			}
			
			// enable\disable socials by user settings
			if( options_default.user_socials != false ){
				for ( var key in $scope.socials ){
					if( options_default.user_socials.includes(key) ){
						$scope.socials[key].active = true;
					} else {
						$scope.socials[key].active = false;                        
					}
				}
			}

			// add custom user icons
			if( options_default.user_icons != false ){
				for ( var key in $scope.socials ){
					var icon = options_default.user_icons[key];
					
					if( icon ){
						$scope.socials[key].icon = $sce.trustAsHtml( icon );
					}
				}
			}

			$scope.share = function(social){
				if ( options_default.user_counter_enable != false ){
					$scope.socials[social].counter += 1;
				}

				Share.call(social, {
					url: $scope.meta_url,
					title: $scope.meta_title,
					subtitle: $scope.meta_subtitle,
					text: $scope.meta_text,
					image: $scope.meta_image,
					tag: $scope.meta_tag
				});
			};

			$scope.$watch('user_counter', function(newval){
				for( var key in newval ){
					$scope.socials[key].counter = newval[key];
				}
			});
		}
	};
}])
/**
 * for single element
 */
.directive('shareSingle', ['Share', '$http', function(Share, $http){
	return {
		restrict: 'A',
		scope: {
			social: "@shareSingle",
			meta_url: "@shareUrl",
			meta_title: "@shareTitle",
			meta_subtitle: "@shareSubtitle",
			meta_text: "@shareText",
			meta_image: "@shareImage",
			meta_tag: "@shareTag",
			user_counter: "=shareCounter"
		},
		link: function ($scope, $element){
			angular.element($element).bind('click', function(){
				if ( $scope.user_counter ){
					$scope.user_counter += 1;
				}

				$scope.$apply();

				Share.call($scope.social, {
					url: $scope.meta_url,
					title: $scope.meta_title,
					subtitle: $scope.meta_subtitle,
					text: $scope.meta_text,
					image: $scope.meta_image,
					tag: $scope.meta_tag
				});
			});

			if ( $scope.user_counter ){
				$scope.$watch('user_counter', function(newval){
					if ( newval ){
						$scope.counter = newval;
					}
				});
			}
		}
	};
}]);