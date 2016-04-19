# share-everithing
    custom share plugin

Supported:

-  Vk
-  Facebook
-  Odnoclassniki
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

## How to use
Add next attributes for element in order to create share on click for this element:

> *share* - name of social network  
**values**: vk, twitter, facebook, ondoclassniki, telegram, evernote

> *share-url* - link of page for share  
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
<button share="vk" share-title="Just" share-text="SHARE IT!" share-url="https://github.com/dslpp056193/share-everithing">Share!</button>
```
