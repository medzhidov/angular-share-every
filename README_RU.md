# Share-every
``Share-every плагин создан с целью сделать кнопки "поделиться" за минуту и без ненужных (обязательных) завимостей, полностью кастомизируемый.``

Поддерживаемые социальные сети:

-  Вконтакте
-  Facebook
-  Одноклассники
-  Twitter
-  Telegram
-  Evernote

## Преимущества
Для любого элемента можно создать "расшаривание" при нажатии на него, при этом для каждого индивидуально можно указать:
- заголовок
- подзаголовок
- анонс
- картинку
- теги

## Не бязательные зависимости
``font-awesome``

## Как пользоваться
Добавьте данный модуль в свой проект при помощи NPM:

``npm install --save-dev angular-share-every``

Просто добавьте этот модуль (./node_modules/src/share-every.js) в свое angular-приложение:

``<script src="./node_modules/src/share-every.js"></script>``

Для работы плагина добавить следующие атрибуты элементу:

> *share* - ссылка на страницу, с которой происходит "расшаривание"  
**Значения**: ссылка

> *share-title* - заголовок для данного "расшаривания"  
**Значения:** строка

> *share-subtitle* - подзаголовок  _для некоторых соц. сетей_    
**Значения:** строка

> *share-text* - short text for share    
**Значения:** строка

> *share-image* - картинка для расшаривания  
**Значения:** полная ссылка на картинку вместе с доменом

> *share-tag* - тег _для некоторых соц. сетей_    
**Значения:** строка

## Пример

```Html
<div share="https://github.com/dslpp056193/angular-share-every" share-title="Share-every" share-description="Module share-every for Angular" share-image="https://cdn4.iconfinder.com/data/icons/mayssam/512/share-128.png" share-tag="Share-plugin"></div>
```
