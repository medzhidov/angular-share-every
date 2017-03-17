# Share-every - javascript angular module, for share everything
``custom share plugin``

See doc. for other languages: [RUS](README_RU.md)

Supported social nets:

-  Vk
-  Facebook
-  Odnoklassniki
-  Twitter
-  Telegram
-  Evernote

## Installation

### NPM
If you want to use this plugin locally, install it by npm command:

```
npm install angular-share-every
```
or
```
yarn add angular-share-every
```

### CDN
You can just add a script from CDN:

```
<script src="https://cdn.rawgit.com/dslpp056193/angular-share-every/4d4d1c62/src/angular-share-every.js"></script>
```

### Add module
Don't forgot to add this module in your app:
```
var yourApp = angular.module('yourApp', [ /*...other modules...*/, 'share-every']);
```

## Usage

This module has two directives, whose activates by attributes `share` and `share-single`.

### Share directive

Creates list of social nets inside element. By click on social net will open small window for share in this social net.

> *share* - add directive to this element  
**Required** Yes  
**Values:** No  

> *share-title* - title for share  
**Required** No    
**Values:** String  

> *share-subtitle* - subtitle for share
**Required** No    
**Values:** String  

> *share-text* - text for share  
**Required** No    
**Values:** String  

> *share-image* - image for share  
**Required** No    
**Values:** absolute or relative link  

> *share-tag* - tag for share   
**Required** No    
**Values:** String  

> *share-icons* - custom icons
**Required** No    
**Values:** object, (_key_ - name of social net, _value_ - any html code)  
**Example of value:**
```javascript
{
    vkontakte: 'share in vk',
    facebook: '<img src="img/facebook.png">',
}
```

> *share-counter* - count of shares in each social nets  
**Required** No    
**Values:** controller variable, that have object, (_key_ - name of social net, _value_ - count of shares)  
**Note:** can be empty  
**Example of value:**
```javascript
{
    vkontakte: 17,
    facebook: 4,
    twitter: 6
}
```

## Working example

```html
<div 
    share
    share-url="https://github.com/dslpp056193/angular-share-every"
    share-title="Module share-every for Angular" 
    share-description="Module share-every for Angular" 
    share-image="https://cdn4.iconfinder.com/data/icons/mayssam/512/share-128.png" 
    share-tag="Share-plugin"
    share-icons="icons"
    share-counter="counters">
</div>
```

### Share-single directive

Creates a click event on element, which will open small window for share in given social net.

> *share-single* - add directive for element and set social net for share
**Required** Yes  
**Values:** name of social net  
**Example of values:**   
-  vkontakte
-  facebook
-  odnoklassniki
-  twitter
-  telegram
-  evernote

> *share-title* - title for share  
**Required** No    
**Values:** String  

> *share-subtitle* - subtitle for share  
**Required** No    
**Values:** String  

> *share-text* - text for share  
**Required** No    
**Values:** String  

> *share-image* - image for share  
**Required** No    
**Values:** absolute or relative link  

> *share-tag* - tag for share  
**Required** No    
**Values:** String  


> *share-counter* - count of shares in this social net  
**Required** No    
**Values:** controller variable, that has a integer  

## Working example

```Html
<div 
    share-single="facebook"
    share-url="https://github.com/dslpp056193/angular-share-every"
    share-title="Module share-every for Angular" 
    share-description="Module share-every for Angular" 
    share-image="https://cdn4.iconfinder.com/data/icons/mayssam/512/share-128.png" 
    share-tag="Share-plugin"
    share-counter="facebook_counts">
    Click me, please, i love it
</div>
```

## Advantages
You need't create OpenGraph meta tags, you can add any data in attributes, like a:
- title
- subtitle
- text
- image
- tags

## Optional depending
``font-awesome``

## Help with module
I will pleased, if you will send pull-requests with a new functional or with fixes!

## License
This work is licensed under [The MIT License](https://opensource.org/licenses/MIT)

## Donate
You can help me and support this project with  [PayPal](https://www.paypal.me/IlyaMedzhidov) or Bitcoin  `33yhTK5BnKj6MZ3wf4GFEQgCtmWtqNwJHU`
