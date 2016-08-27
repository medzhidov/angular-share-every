# Share-every - javascript angular module, for share everything
``custom share plugin``

Supported:

-  Vk
-  Facebook
-  Odnoklassniki
-  Twitter
-  Telegram
-  Evernote

## Advantages
For share each element has unique:
- title
- subtitle
- text
- image
- tags

## Optional depending
``font-awesome``

## How to use
Include this module in your project by NPM:

``npm install --save-dev angular-share-every``

Just add this module (src/share-every.js) in your angular-application:

``<script src="./node_modules/src/share-every.js"></script>``

Then add next attributes for element in order to create sharing:

> *share* - link of page for share  
**values**: link

> *share-title* - title for share  
**values:** string

> *share-subtitle* - subtitle _for some social networks_  
**values:** string

> *share-text* - short text for share  
**values:** string

> *share-image* - image for share  
**values:** full link with domain

> *share-tag* - tag for share _in some socials_  
**values:** string


## Example

```Html
<div share="https://github.com/dslpp056193/angular-share-every" share-title="Share-every" share-description="Module share-every for Angular" share-image="https://cdn4.iconfinder.com/data/icons/mayssam/512/share-128.png" share-tag="Share-plugin"></div>
```
