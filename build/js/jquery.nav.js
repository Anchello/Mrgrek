!function(t,e){var o=function(){this.body=t("body"),this.header=t(".header"),this.nav=t(".mobile-nav"),this.contact=t(".mobile-nav__contact"),this.menu=t(".mobile-menu"),this.hamburger=t(".header__icon-menu"),this.close=t(".mobile-menu__close"),this.scroll_button=t(".scroll-to"),this.mob_next=t(".mobile-nav__next"),this.mob_back=t(".mobile-nav__back"),this.mob_list=t(".mobile-nav__list"),this.mob_sublist=t(".mobile-nav__sublist"),this.defaults={scroll_top:e.scrollTop(),display_cls:"mobile-menu--display",show_cls:"mobile-menu--show"}};o.prototype={init:function(){var o=this;this.defaults;this.header&&this.header.length>0&&(this.nav&&this.nav.length>0&&e.on("resize",function(){setTimeout(function(){o.contactMove.call(o)},100)}),this.hamburger.on("click",function(t){return o.eventShowMenu.call(o),t.preventDefault(),o.contactMove.call(o),!1}),this.close.on("click",function(t){return o.eventCloseMenu.call(o),t.preventDefault(),o.contactMove.call(o),!1}),this.mob_next.on("click",function(e){o.sublistShow.call(o,t(this)),e.preventDefault(),setTimeout(function(){o.contactMove.call(o)},300)}),this.mob_back.on("click",function(e){o.sublistHide.call(o,t(this)),setTimeout(function(){o.contactMove.call(o)},500),e.preventDefault()})),this.scroll_button.length>0&&this.scroll_button.on("click",function(t){return o.eventScrollTo.call(o,this,t),t.preventDefault(),!1})},scrollTo:function(e){var o=t("html, body"),e=t(e);e.length>0&&o.animate({scrollTop:t(e).offset().top},600)},eventShowMenu:function(){var t=this;t.menu.slideDown(300),t.body.addClass("page--overlay"),t.hamburger.fadeOut(),t.close.fadeIn()},eventCloseMenu:function(){var t=this;this.defaults;t.menu.slideUp(300),this.body.removeClass("page--overlay"),t.hamburger.fadeIn(),t.close.fadeOut()},sublistShow:function(e){var o=this,n=e.data("sublist"),s=t(".mobile-nav__sublist--"+n);s.slideDown(300),o.mob_list.slideUp(300)},sublistHide:function(t){var e=this;e.mob_sublist.slideUp(300),e.mob_list.slideDown(300)},contactMove:function(){var t=e.height(),o=this.nav.outerHeight(),n=this.header.outerHeight(),s=(this.mob_sublist.outerHeight(),this.contact.outerHeight());o>t-n-s?this.contact.css("bottom",t-o-n-s):this.contact.css("bottom","0")},eventScrollTo:function(e,o){var n,e=t(e),s=e.attr("href"),i=t("base").attr("href"),l=location.pathname;return"#"!==s.substr(0,1)?(i=i.substr(i.indexOf("/",10)),n=i+s.substr(0,s.lastIndexOf("/")+1),n!==l?location.replace(i+s):(s=s.substr(s.lastIndexOf("/")+1),this.scrollTo(s))):this.scrollTo(s),o.preventDefault(),!1}},t.nav=function(){return(new o).init()}}(jQuery,jQuery(window));