$(document).ready(function() {
    // Header shrink on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.top-header').addClass('small');
            $('.header-container').css('padding-top', '26px');
            $('.logo-link').css('margin-top', '-3px');
            $('.logo-link img').css('width', '120px');
            $('.hamburger-button').css('margin-top', '1px');
        } else {
            $('.top-header').removeClass('small');
            $('.header-container').css('padding-top', '60px');
            $('.logo-link').css('margin-top', '-5px');
            $('.logo-link img').css('width', '220px');
            $('.hamburger-button').css('margin-top', '15px');
        }
    });
    
    // Mobile menu toggle
    $('.hamburger-button').click(function() {
        $('.main-navigation').addClass('open');
    });
    
    $('.close-button').click(function() {
        $('.main-navigation').removeClass('open');
    });
    
    // Submenu toggle for mobile
    $('.menu-item.has-children > a').click(function(e) {
        if ($(window).width() < 768) {
            e.preventDefault();
            $(this).siblings('.submenu').slideToggle();
        }
    });
    
    // Hero slider functionality
    var currentSlide = 0;
    var totalSlides = $('.slide').length;
    
    // Function to advance to next slide
    function nextSlide() {
        var nextIndex = (currentSlide + 1) % totalSlides;
        
        $('.slide').removeClass('active next');
        $('.slide').eq(currentSlide).addClass('next');
        $('.slide').eq(nextIndex).addClass('active');
        
        // Update dots
        $('.dot').removeClass('active');
        $('.dot').eq(nextIndex).addClass('active');
        
        currentSlide = nextIndex;
    }
    
    // Set up click handlers for slider navigation
    $('.next-button').click(function() {
        nextSlide();
    });
    
    // Set up click handlers for dots
    $('.dot').click(function() {
        var dotIndex = $(this).index();
        
        $('.slide').removeClass('active next');
        $('.slide').eq(dotIndex).addClass('active');
        
        // Update dots
        $('.dot').removeClass('active');
        $(this).addClass('active');
        
        currentSlide = dotIndex;
    });
    
    // Auto-advance slider every 5 seconds
    setInterval(function() {
        nextSlide();
    }, 5000);
    
    // Animate the intro section logo
    function animateIntroLogo() {
        $(".company-logo").css('opacity', 0);
        $(".company-logo").animate({
            opacity: 1
        }, 1000);
    }
    
    // CTA Link hover effects
    $('.cta-blocks li a').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );
    
    $('.sub-links li a').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );
    
    // Smooth scrolling for anchor links
    $('.anchor').on('click', function(e) {
        var target = $(this).attr('rel');
        
        // Only handle anchors that point to sections on the same page
        if ($('#' + target).length) {
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: $('#' + target).offset().top - 100
            }, 800);
        }
    });
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        var rect = el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate elements when they come into viewport
    function checkAnimations() {
        var $logo = $('.company-logo');
        var $ctaBlocks = $('.cta-blocks li');
        var $subLinks = $('.sub-links li');
        
        // Animate logo
        if (isElementInViewport($logo) && $logo.css('opacity') == 0) {
            animateIntroLogo();
        }
        
        // Animate CTA blocks with slight delay between each
        $ctaBlocks.each(function(index) {
            var $this = $(this);
            if (isElementInViewport($this) && !$this.hasClass('animated')) {
                setTimeout(function() {
                    $this.addClass('animated');
                    $this.animate({ opacity: 1 }, 400);
                }, index * 200);
            }
        });
        
        // Animate sub links with slight delay between each
        $subLinks.each(function(index) {
            var $this = $(this);
            if (isElementInViewport($this) && !$this.hasClass('animated')) {
                setTimeout(function() {
                    $this.addClass('animated');
                    $this.animate({ opacity: 1 }, 300);
                }, index * 100);
            }
        });
    }
    
    // Set initial state for animations
    $('.cta-blocks li, .sub-links li').css('opacity', 0);
    
    // Check animations on page load and scroll
    checkAnimations();
    $(window).on('scroll resize', function() {
        checkAnimations();
    });
    
    // Handle responsive adjustments
    $(window).resize(function() {
        // Reset submenu display on larger screens
        if ($(window).width() >= 768) {
            $('.submenu').css('display', '');
        }
    });
});