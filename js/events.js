/* global Fluid */

HTMLElement.prototype.wrap = function(wrapper) {
    this.parentNode.insertBefore(wrapper, this);
    this.parentNode.removeChild(this);
    wrapper.appendChild(this);
};

Fluid.events = {

    registerNavbarEvent: function() {
        var navbar = jQuery('#navbar');
        if (navbar.length === 0) {
            return;
        }
        var submenu = jQuery('#navbar .dropdown-menu');
        if (navbar.offset().top > 0) {
            navbar.removeClass('navbar-dark');
            submenu.removeClass('navbar-dark');
        }
        Fluid.utils.listenScroll(function() {
            navbar[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('top-nav-collapse');
            submenu[navbar.offset().top > 50 ? 'addClass' : 'removeClass']('dropdown-collapse');
            if (navbar.offset().top > 0) {
                navbar.removeClass('navbar-dark');
                submenu.removeClass('navbar-dark');
            } else {
                navbar.addClass('navbar-dark');
                submenu.removeClass('navbar-dark');
            }
        });
        jQuery('#navbar-toggler-btn').on('click', function() {
            jQuery('.animated-icon').toggleClass('open');
            jQuery('#navbar').toggleClass('navbar-col-show');
        });
    },

    registerParallaxEvent: function() {
        var ph = jQuery('#banner[parallax="true"]');
        if (ph.length === 0) {
            return;
        }
        var board = jQuery('#board');
        if (board.length === 0) {
            return;
        }
        var parallax = function() {
            var pxv = jQuery(window).scrollTop() / 5;
            var offset = parseInt(board.css('margin-top'), 10);
            var max = 96 + offset;
            if (pxv > max) {
                pxv = max;
            }
            ph.css({
                transform: 'translate3d(0,' + pxv + 'px,0)'
            });
            var sideCol = jQuery('.side-col');
            if (sideCol) {
                sideCol.css({
                    'padding-top': pxv + 'px'
                });
            }
        };
        Fluid.utils.listenScroll(parallax);
    },

    registerScrollDownArrowEvent: function() {
        var scrollbar = jQuery('.scroll-down-bar');
        if (scrollbar.length === 0) {
            return;
        }
        scrollbar.on('click', function() {
            Fluid.utils.scrollToElement('#board', -jQuery('#navbar').height());
        });
    },

    registerScrollTopArrowEvent: function() {
        var topArrow = jQuery('#scroll-top-button');
        if (topArrow.length === 0) {
            return;
        }
        var board = jQuery('#board');
        if (board.length === 0) {
            return;
        }
        var posDisplay = false;
        var scrollDisplay = false;
        // Position
        var setTopArrowPos = function() {
            var boardRight = board[0].getClientRects()[0].right;
            var bodyWidth = document.body.offsetWidth;
            var right = bodyWidth - boardRight;
            posDisplay = right >= 50;
            topArrow.css({
                'bottom': posDisplay && scrollDisplay ? '20px' : '-60px',
                'right': right - 64 + 'px'
            });
        };
        setTopArrowPos();
        jQuery(window).resize(setTopArrowPos);
        // Display
        var headerHeight = board.offset().top;
        Fluid.utils.listenScroll(function() {
            var scrollHeight = document.body.scrollTop + document.documentElement.scrollTop;
            scrollDisplay = scrollHeight >= headerHeight;
            topArrow.css({
                'bottom': posDisplay && scrollDisplay ? '20px' : '-60px'
            });
        });
        // Click
        topArrow.on('click', function() {
            jQuery('body,html').animate({
                scrollTop: 0,
                easing: 'swing'
            });
        });
    },

    registerImageLoadedEvent: function() {
        if (!('NProgress' in window)) { return; }

        var bg = document.getElementById('banner');
        if (bg) {
            var src = bg.style.backgroundImage;
            var url = src.match(/\((.*?)\)/)[1].replace(/(['"])/g, '');
            var img = new Image();
            img.onload = function() {
                window.NProgress && window.NProgress.inc(0.2);
            };
            img.src = url;
            if (img.complete) { img.onload(); }
        }

        var notLazyImages = jQuery('main img:not([lazyload])');
        var total = notLazyImages.length;
        for (const img of notLazyImages) {
            const old = img.onload;
            img.onload = function() {
                old && old();
                window.NProgress && window.NProgress.inc(0.5 / total);
            };
            if (img.complete) { img.onload(); }
        }
    },

    billboard: function() {
        if (!('console' in window)) {
            return;
        }
        // eslint-disable-next-line no-console
        console.log(`
-----------------------------------------------------------------------------------
|   _________                __  .__                      __         .__          |
|   \\_   ___ \\  ____   _____/  |_|__| ____   ____   _____/  |______  |  |         |
|   /    \\  \\/ /  _ \\ /    \\   __\\  |/    \\_/ __ \\ /    \\   __\\__  \\ |  |         |  
|   \\     \\___(  <_> )   |  \\  | |  |   |  \\  ___/|   |  \\  |  / __ \\|  |__       |
|    \\______  /\\____/|___|  /__| |__|___|  /\\___  >___|  /__| (____  /____/       |
|           \\/            \\/             \\/     \\/     \\/          \\/             |
|        _________                                                                |
|        \\_   ___ \\  ____   ____    ___________   ____   ______ ______            |
|        /    \\  \\/ /  _ \\ /    \\  / ___\\_  __ \\_/ __ \\ /  ___//  ___/            |
|        \\     \\___(  <_> )   |  \\/ /_/  >  | \\/\\  ___/ \\___ \\ \\___ \\             |
|         \\______  /\\____/|___|  /\\___  /|__|    \\___  >____  >____  >            |
|                \\/            \\//_____/             \\/     \\/     \\/             |
|                   __      __            .__       .___                          |
|                  /  \\    /  \\___________|  |    __| _/                          |
|                  \\   \\/\\/   /  _ \\_  __ \\  |   / __ |                           |
|                   \\        (  <_> )  | \\/  |__/ /_/ |                           |
|                    \\__/\\  / \\____/|__|  |____/\\____ |                           |
|                         \\/                         \\/                           |
|                                                                                 |   
|                             歡迎訪問大陸會議企劃                                |
|                 Welcome to the Continental Conference Project                   |
|                      网址: https://world.utopian.ml                               |
|                                                                                 |
-----------------------------------------------------------------------------------        
    `);
    }
};