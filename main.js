/**
 * SHARE-EVERITHING PLUGIN: MIT LICENSE
 */

window.share = (function(){
    var socials = {
        vk: 'https://vk.com/share.php?url=$URL$&title=$TITLE$&description=$TEXT$&image=$IMAGE$',
        facebook: 'https://www.facebook.com/dialog/feed?app_id=1514286898864851&link=$URL$&name=NAME&caption=$SUBTITLE$&description=$TEXT$&redirect_uri=https://www.facebook.com&display=popup',
        twitter: 'https://twitter.com/intent/tweet?url=$URL$&text=$TEXT$&hashtags=$TAG$',
        telegram: 'https://telegram.me/share/url?url=$URL$&text=$TEXT$',
        evernote: 'http://www.evernote.com/clip.action?url=$URL$&title=$TITLE$',
        odnoklassniki: 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments=$TEXT$&st._surl=$URL$',
    };

    var getLink = function(social, url, title, text, image, tag){
        var link = socials[social];
        if (url != undefined)    link = link.replace('$URL$', url);
        if (title != undefined)  link = link.replace('$TITLE$', title);
        if (text != undefined)   link = link.replace('$TEXT$', text);
        if (image != undefined)  link = link.replace('$IMAGE$', image);
        if (tag != undefined)    link = link.replace('$TAG$', tag);
        console.log(link);
        return link;
    };

    var open = function(link){
        window.open(link,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=600')
    };

    var openLink = function(social, url, title, text, image, tag){
        var link = getLink(social, url, title, text, image, tag);
        open(link);
    }

    return {
        getLink: getLink,
        openLink: openLink,
        open: open
    };
})();


// Add listeners
document.addEventListener("DOMContentLoaded", function(){
    for( let el of document.querySelectorAll('[share]') ){
        el.addEventListener('click', function(){
            var social = this.getAttribute('share'),
            url = this.getAttribute('share-url') ?this.getAttribute('share-url') : '',
            title = this.getAttribute('share-title') ? this.getAttribute('share-title') : '',
            text = this.getAttribute('share-text') ? this.getAttribute('share-text') : '',
            image = this.getAttribute('share-image') ? this.getAttribute('share-image') : '',
            tag = this.getAttribute('share-tag') ? this.getAttribute('share-tag') : '';

            if(social){
                window.share.openLink(social, url, title, text, image, tag);
            }
        });
    }
});
