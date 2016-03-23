/*
* Author: Wisely Themes
* Author URI: http://themeforest.net/user/wiselythemes
* Theme Name: Lilac
* Version: 1.0.0
*/

/*jslint browser:true, devel: true, this: true */
/*global google, window, RichMarker, jQuery, mobileMenuTitle, hero100PercentHeight, twitter_username, map_canvases, use_default_map_style, contact_form_success_msg, contact_form_error_msg, c_days, c_hours, c_minutes, c_seconds, countdownEndMsg, Waypoint, Freewall, map_markers  */

var Lilac;

/**
 * Javascript template variables
 */


var mobileMenuTitle = "Menu",                   //The title of the mobile menu
    
    hero100PercentHeight = false,               //If true, the hero section (home) will be set with a minimum height of 100% window height. If false, hero height will be the height of its content.
    
    //TWITTER VARIABLE
    twitter_username = "Envato",                //Replace with your own Twitter username
    
    
    //CONTACT FORM VARIABLES
    contact_form_success_msg = "Your RSVP has been submitted! :)",
    contact_form_error_msg = "Error sending message :(",
    
    
    //COUNTDOWN VARIABLES
    c_days = "DAYS",                            //Countdown "Days" label
    c_hours = "HOURS",                          //Countdown "Hours" label
    c_minutes = "MIN.",                         //Countdown "Minutes" label
    c_seconds = "SEC.",                         //Countdown "Seconds" label
    countdownEndMsg = "Wedding Time!";          //Message to display when the countdown reaches the end

(function ($) {
    "use strict";

    $(document).ready(function () {

        Lilac = {

            initialized: false,
            mobMenuFlag: false,
            wookHandler: null,
            wookOptions: null,
            scrollPos: 0,
            sendingMail: false,
            mobileMenuTitle: mobileMenuTitle,
            hero100PercentHeight: hero100PercentHeight,
            twitter_username: twitter_username,
            contact_form_success_msg: contact_form_success_msg,
            contact_form_error_msg: contact_form_error_msg,
            c_days: c_days,
            c_hours: c_hours,
            c_minutes: c_minutes,
            c_seconds: c_seconds,
            countdownEndMsg: countdownEndMsg,

            init: function () {

                var $tis = this;

                if ($tis.initialized) {
                    return;
                }

                $tis.initialized = true;
                $tis.build();
                $tis.events();
            },

            build: function () {

                var $tis = this;

                /**
                 * Preloader
                 */
                $tis.preloader();

                /**
                 * Navigation
                 */
                $tis.navigation();

                /**
                 * Dinamically create the menu for mobile devices
                 */
                $tis.createMobileMenu();

                /**
                 * Set the hero height to 100% of window height
                 */
                $tis.heroHeight();

                /**
                 * Create curved text
                 */
                $tis.curvedText();

                /**
                 * Activate placeholder in older browsers
                 */
                $('input, textarea').placeholder();

                /**
                 * Create the Hero background image grid
                 */
                $tis.bgImageGrid();

                /**
                 * create Heartbeats
                 */
                $tis.createHeartbeats();

                /**
                 * Create PrettyPhoto links
                 */
                $tis.createPrettyPhoto();

                /**
                 * Create Owl Sliders
                 */
                $tis.createOwlSliders();

                /**
                 * Create Gallery
                 */
                $tis.createGallery();

                 /**
                 * Initiate Parallax
                 */
                $tis.parallaxItems();

                /**
                 * Start NiceScroll
                 */
                $tis.startNiceScroll();

            },

            events: function () {

                var $tis = this;

                /**
                 * Functions called on window resize
                 */
                $tis.windowResize();

                /**
                 * Resize embed videos
                 */
                $tis.resizeVideos();

                /**
                 * Contact form submit
                 */
                //$tis.contactForm();

                /**
                 * Capture buttons click event
                 */
                $tis.buttons();

                /**
                 * Animate elements on scrolling
                 */
                $tis.animateElems();
            },

            preloader: function () {
                var isLoaded = setInterval(function () {
                    if (/loaded|complete/.test(document.readyState)) {
                        clearInterval(isLoaded);
                        $('#preloader').fadeOut(500);
                    }
                }, 10);
            },

            navigation: function () {

                $('.nav li a').on('click', function (event) {
                    var navActive = $(this),
                        scroll = 0;

                    if ($.browser.mobile && (!navActive.closest(".dropdown").hasClass("open") || !navActive.closest(".dropdown-menu").css('display') === 'block' || !navActive.parent().parent().hasClass("nav"))) {
                        event.preventDefault();
                        return false;
                    }

                    if (navActive.attr('href').charAt(0) === "#") {
                        event.preventDefault();

                        if (navActive.attr('href') !== "#home") {
                            scroll = $(navActive.attr('href')).offset().top - 65;
                        }

                        $('html, body').stop().animate({
                            scrollTop: scroll
                        }, 1500, 'easeInOutExpo', function () {
                            navActive.blur();
                        });
                    } else {
                        window.open(navActive.attr('href'), "_self");
                    }
                });

                var sticky = new Waypoint.Sticky({
                    element: $('.nav-section')
                });

                sticky = sticky;

                $("#wrapper > section").waypoint({
                    handler: function (direction) {
                        var tis = $(this),
                            id = tis[0].element.id;

                        if (direction === "up") {
                            id = tis[0].element.previousElementSibling.id;
                        }

                        $(".nav a").removeClass("active");
                        $('nav a[href="#' + id + '"]').addClass("active");
                    },
                    offset: '50%'
                });

                $(window).load(function () {
                    var hash = location.hash.replace('#', '');

                    if (hash !== '') {
                        location.hash = '';
                        $('html, body').stop().animate({
                            scrollTop: $('#' + hash).offset().top - 65
                        }, 1500, 'easeInOutExpo');
                    }

                    sticky = new Waypoint.Sticky({
                        element: $('.nav-section')
                    });
                });
            },

            createMobileMenu: function (w) {

                var $tis = this,
                    $wrapper = $('#wrapper'),
                    $navMobile,
                    etype;

                if ($.browser.mobile) {
                    etype = 'touchstart';
                } else {
                    etype = 'click';
                }

                if (w !== null) {
                    w = $(window).innerWidth();
                }

                if (w <= 975 && !$tis.mobMenuFlag) {

                    $('body').prepend('<nav class="nav-mobile"><i class="fa fa-times"></i><h2><i class="fa fa-bars"></i>' + $tis.mobileMenuTitle + '</h2><ul></ul></nav>');

                    $('.nav-mobile > ul').html($('.nav').html());

                    $('.nav-mobile b').remove();

                    $('.nav-mobile ul.dropdown-menu').removeClass().addClass("dropdown-mobile");

                    $navMobile = $(".nav-mobile");

                    $("#nav-mobile-btn").on(etype, function (e) {
                        e.stopPropagation();
                        e.preventDefault();

                        setTimeout(function () {
                            $wrapper.addClass('open');
                            $navMobile.addClass('open');
                            $navMobile.getNiceScroll().show();
                        }, 25);

                        $(document).on(etype, function (e) {
                            if (!$(e.target).hasClass('nav-mobile') && !$(e.target).parents('.nav-mobile').length) {
                                $wrapper.removeClass('open');
                                $navMobile.removeClass('open');
                                $(document).off(etype);
                            }
                        });

                        $('>i', $navMobile).on(etype, function () {
                            $navMobile.getNiceScroll().hide();
                            $wrapper.removeClass('open');
                            $navMobile.removeClass('open');
                            $(document).off(etype);
                        });
                    });

                    $navMobile.niceScroll({
                        autohidemode: true,
                        cursorcolor: "#888888",
                        cursoropacitymax: "0.7",
                        cursorwidth: 10,
                        cursorborder: "0px solid #000",
                        horizrailenabled: false,
                        zindex: "1"
                    });

                    $navMobile.getNiceScroll().hide();

                    $tis.mobMenuFlag = true;

                    $('.nav-mobile li a').on('click', function (event) {
                        var navActive = $(this);
                        var scroll = 0;

                        if (navActive.attr('href') !== "#home") {
                            scroll = $(navActive.attr('href')).offset().top - 65;
                        }

                        $('html, body').stop().animate({
                            scrollTop: scroll
                        }, 1500, 'easeInOutExpo', function () {
                            navActive.blur();
                        });

                        $navMobile.getNiceScroll().hide();
                        $wrapper.removeClass('open');
                        $navMobile.removeClass('open');
                        $(document).off(etype);

                        event.preventDefault();
                    });
                }
            },

            heroHeight: function () {

                var $tis = this;

                if ($tis.hero100PercentHeight) {
                    $("#home").css({minHeight: $(window).innerHeight() + 'px'});

                    $(window).resize(function () {
                        $("#home").css({minHeight: $(window).innerHeight() + 'px'});
                    });
                }
            },

            bgImageGrid: function () {

                if ($('#freewall').length) {
                    $("#freewall .item").each(function () {
                        var $item = $(this);
                        $item.width(Math.floor(260 + 200 * Math.random()));
                        $item.css({'background-image': 'url(' + $('>img', $item).attr('src') + ')'});
                        $('>img', $item).remove();
                    });

                    $("#freewall").appendTo("#wrapper");

                    var wall = new Freewall("#freewall");
                    wall.reset({
                        selector: '.item',
                        animate: false,
                        cellW: 20,
                        gutterX: 0,
                        gutterY: 0,
                        onResize: function () {
                            wall.fitWidth();
                        }
                    });
                    wall.fitWidth();
                }
            },

            createHeartbeats: function () {

                var $tis = this;

                $('.instagram').html('<div class="heartbeat"></div>');

            },

            createPrettyPhoto: function () {

                $("a[data-gal^='prettyPhoto']").prettyPhoto({theme: 'lilac', hook: 'data-gal'});
            },

            createOwlSliders: function () {

                if ($(".timeline-gallery").length) {
                    $(".timeline-gallery").owlCarousel({
                        navigation: true,
                        navigationText: false,
                        pagination: false,
                        itemsCustom: [
                            [0, 1],
                            [392, 2],
                            [596, 3],
                            [751, 2],
                            [975, 3],
                            [1183, 3],
                            [1440, 3],
                            [1728, 3]
                        ]
                    });
                }

                if ($(".bridesmaids-groomsmen-slider").length) {
                    $(".bridesmaids-groomsmen-slider").owlCarousel({
                        itemsCustom: [
                            [0, 1],
                            [590, 2],
                            [751, 2],
                            [975, 3],
                            [1183, 4],
                            [1440, 4],
                            [1728, 4]
                        ]
                    });
                }
            },

            createGallery: function () {

                var $gallery = $(".gallery-scroller"),
                    scrolling = false;

                $(".gallery-right").on('click', function () {
                    if (scrolling) {
                        return false;
                    }

                    scrolling = true;
                    $gallery.animate({scrollLeft: $gallery.scrollLeft() + 380}, function () {
                        scrolling = false;
                    });
                });

                $(".gallery-left").on('click', function () {
                    if (scrolling) {
                        return false;
                    }

                    scrolling = true;
                    $gallery.animate({scrollLeft: $gallery.scrollLeft() - 380}, function () {
                        scrolling = false;
                    });
                });
            },

            curvedText: function () {

                if ($(".curve").length) {
                    $('.curve').arctext({radius: 1000});

                    $(window).resize(function () {
                        $('.curve').arctext('set', {radius: 1000});
                    });
                }

                if ($(".curve2").length) {
                    $('.curve2').arctext({radius: 800, dir: -1});

                    $(window).resize(function () {
                        $('.curve2').arctext('set', {radius: 800, dir: -1});
                    });
                }
            },

            parallaxItems: function () {

                if (!$.browser.mobile) {
                    $.stellar();
                } else {
                    $('.parallax').css({'background-position': '50% 50%', 'background-size': 'cover', 'background-attachment': 'scroll'});
                }
            },

            startNiceScroll: function () {

                $(document).ready(function () {
                    $(".gallery-scroller").niceScroll({
                        cursorcolor: '#fff',
                        cursorwidth: '0px',
                        background: '#fff',
                        cursorborder: '0px solid #1F2326',
                        zindex: '999',
                        autohidemode: false,
                        enablemousewheel: false,
                        touchbehavior: true
                    });
                });
            },

            windowResize: function () {

                var $tis = this;

                $(window).resize(function () {
                    var w = $(window).innerWidth();

                    $tis.createMobileMenu(w);
                });
            },

            resizeVideos: function () {

                var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='https://player.vimeo.com'], iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], object, embed"),
                    $fluidEl = $(".videoEmbed");

                $allVideos.each(function () {
                    var $el = $(this);
                    $el.attr('data-aspectRatio', $el.height() / $el.width()).removeAttr('height').removeAttr('width');
                });

                $(window).resize(function () {
                    var newWidth = $fluidEl.width();

                    $allVideos.each(function () {
                        var $el = $(this);
                        $el.width(newWidth).height(newWidth * $el.attr('data-aspectRatio'));
                    });
                }).resize();
            },

            

            buttons: function () {

                var first = true;

                $('.nav-logo, .scrollto').on('click', function (event) {
                    var navActive = $(this);
                    var scroll = 0;

                    event.preventDefault();

                    if (navActive.attr('href') !== "#home") {
                        scroll = $(navActive.attr('href')).offset().top - 65;
                    }

                    $('html, body').stop().animate({
                        scrollTop: scroll
                    }, 1500, 'easeInOutExpo', function () {
                        navActive.blur();
                    });
                });

                // Capture custom radio buttons click event.
                $(".radio-lilac button").on('click', function (e) {
                    e.preventDefault();

                    var $t = $(this);

                    if ($t.hasClass("active")) {
                        return false;
                    }

                    $t.parent().find("button").removeClass("active");
                    $t.addClass("active");
                });

                $(".checkbox-lilac button").on('click', function (e) { /* NEW */
                    e.preventDefault();

                    var $t = $(this);

                    if ($t.hasClass("active")) {
                        $t.removeClass("active");
                        $t.find("i").removeClass("fa-check-square-o");
                        $t.find("i").addClass("fa-square-o");
                        return false;
                    }

                    $t.addClass("active");
                    $t.find("i").removeClass("fa-square-o");
                    $t.find("i").addClass("fa-check-square-o");
                });

                // Capture "Add guest" button click event.
                $(".add_button").on('click', function (e) {
                    e.preventDefault();

                    var $t = $(this),
                        $wrapper = $t.data("wrapper"),
                        html,
                        count = parseInt($("#" + $wrapper).data("count"), 10) + 1 || 1,
                        $input = $("#" + $t.data("input")),
                        val = $input.val();

                    if (val === "") {
                        $input.addClass("invalid");
                        return false;
                    }

                    html = '<div class="input-group">' +
                            '<input type="text" class="form-control guest_list" name="' + $t.data("input") + '_' + count + '" value="' + val + '" />' +
                            '<span class="input-group-addon"><i class="fa fa-trash"></i></span>' +
                            '</div>';

                    $("#" + $wrapper).data("count", count).append(html);
                    $input.val('');
                    $input.removeClass("invalid");
                });

                // Capture "Remove guest" button click event.
                $('.add_list').on('click', '.input-group-addon', function () {
                    $(this).closest(".input-group").remove();
                });
            },

            animateElems: function () {

                if ($.browser.mobile) {
                    return false;
                }

                var animate = function () {
                    $('[data-animation-delay]').each(function () {
                        var $this = $(this),
                            s = $(window).scrollTop(),
                            h = $(window).height(),
                            d = parseInt($this.attr('data-animation-delay'), 10),
                            dir = $this.data('animation-direction');

                        if (dir === undefined) {
                            return false;
                        }

                        $this.addClass('animate-' + dir);

                        if (s + h >= $this.offset().top) {
                            if (isNaN(d) || d === 0) {
                                $this.removeClass('animate-' + dir).addClass('animation-' + dir);
                            } else {
                                setTimeout(function () {
                                    $this.removeClass('animate-me').addClass('animation-' + dir);
                                }, d);
                            }
                        }
                    });
                };

                if ($(window).innerWidth() >= 751) {
                    $(window).scroll(function () {
                        animate();
                    });

                    animate();
                }
            }
        };

        Lilac.init();
    });
}(jQuery));