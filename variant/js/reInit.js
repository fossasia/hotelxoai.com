function reInit(target){


    /************** Navigation Scripts **************/

    // Shrink nav on scroll

    $(window).scroll(function () {
        if ($(window).scrollTop() > 10) {
            $(target+' nav').addClass('shrink-nav');
        } else {
            $(target+' nav').removeClass('shrink-nav');
        }
    });

    // Mobile Toggle Control

    $(target+' .mobile-toggle').click(function () {
        $(target+' nav').toggleClass('open-nav');
    });

    $(target+' .has-dropdown').click(function () {
        if ($(target+' .mobile-toggle').is(":visible")) {
            if ($(this).children('.subnav').hasClass('open-nav')) {
                $(this).children('.subnav').removeClass('open-nav');
            } else {
                $(target+' .subnav').removeClass('open-nav');
                $(this).children('.subnav').addClass('open-nav');
            }
        }
    });


    // Inner links

    $(target+' .inner-link').smoothScroll({
        speed: 900,
        offset: -68
    });

    // Disable default behaviour on href='#' links

    $(target+' a').click(function () {
        if ($(this).attr('href') === '#') {
            return false;
        }
    });

    /************** Slider Scripts **************/

    // Initialize Sliders

    $(target+' .hero-slider').flexslider({
        start: function () {
            $(target+' .slides li').each(function () {
                $(this).find('.animated').addClass('animatedd fadeInUp');
            });
        },
        before: function () {
            $(target+' .slides li').each(function () {
                $(this).find('.animated').removeClass('animatedd fadeInUp');
            });
        },
        after: function () {
            $(target+' .slides li').each(function () {
                $(this).find('.animated').addClass('animated fadeInUp');
            });
        }
    });

    $(target+' .testimonials-slider').flexslider({
        directionNav: false
    });

    $(target+' .slider').flexslider({});

    $(target+' .clients-slider').flexslider({
        animation: "slide",
        minItems: 1,
        maxItems: 5,
        itemWidth: 50,
        itemMargin: 0,
        move: 1,
        directionNav: false,
        controlNav: false
    });

    $(target+' .work-carousel').flexslider({
        animation: "slide",
        minItems: 3,
        maxItems: 3,
        itemWidth: 350,
        itemMargin: 0,
        move: 1,
        controlNav: false
    });



    // Adjust slide height for .slider-fullscreen sliders

    $(target+' .slider-fullscreen .slides li').each(function () {
        $(this).css('height', $(window).height());
    });

    $(target+' .slides li').each(function () {

        // Append background-image <img>'s as li item CSS background for better responsive performance

        if ($(this).children('.background-image').length) {
            var imgSrc = jQuery(this).children('.background-image').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.background-image').remove();
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav

        }

        // Center Slide Content vertically

        if ($(target+' .overlay-nav').length && !$(target+' nav').hasClass('nav-transparent')) {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $(target+' .overlay-nav').height());
        } else {
            $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
        }

    });

    $(window).resize(function () {

        $(target+' .slides li').each(function () {
            if ($(target+' .overlay-nav').length && !$(target+' nav').hasClass('nav-transparent')) {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2) + $(target+' .overlay-nav').height());
            } else {
                $(this).children('.slide-content').css('padding-top', ($(this).height() / 2) - ($(this).children('.slide-content').height() / 2));
            }

        });
    });



    // Adjust the slide heights for fullscreen slider class

    $(target+' .slider-fullscreen .slides li').each(function () {
        $(this).css('height', $(window).height());
    });

    $(window).resize(function () {
        $(target+' .slider-fullscreen .slides li').each(function () {
            $(this).css('height', $(window).height());
        });
    });

    /************** Divider Scripts **************/

    $(target+' .divider-background').each(function () {

        // Append background-image <img>'s as li item CSS background for better responsive performance

        if ($(this).children('.background-image').length) {
            var imgSrc = jQuery(this).children('.background-image').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.background-image').remove();
            $(this).css('background-position', '50% 0%');
            // Check if the slider has a color scheme attached, if so, apply it to the slider nav

        }

    });

    // Give the header some extra padding to compensate for the overlay menu

    if ($(target+' header').length && $(target+' .overlay-nav').length) {
        //if(!$(target+' nav').hasClass('nav-transparent')){
        var padAmount = parseInt($(target+' header').css('padding-top')) + $(target+' .overlay-nav').outerHeight() - 8;
        $(target+' header').css('padding-top', padAmount);
        //}
    }

    // If there is no header or hero slider at the top of the page, pad the first section

    if ($(target+' nav').length && !$(target+' nav').next().hasClass('hero-slider') && !$(target+' nav').next().is('header')) {
        $(target+' .pad-first').removeClass('pad-first');
        $(target+' nav').next().addClass('pad-first');
    }

    /************** Fullscreen Elements Scripts **************/

    $(target+' .fullscreen-element').each(function () {
        $(this).css('height', $(window).height());
        var padTop = $(window).height() / 2 - $(this).children('.row').height();
        $(this).children('.row').css('padding-top', padTop);
    });


    /************** Accordion Scripts **************/

    $(target+' .panel-holder').click(function () {

        $(this).closest('.accordion').find('.panel-holder').removeClass('active-panel');
        $(this).addClass('active-panel');

    });

    /************** Tabs Scripts **************/

    $(target+' .tabs-holder li').click(function () {
        var tabID = $(this).attr('data-tab-id');
        $(this).closest('.tabbed-content').find('.tabs-holder li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.tabbed-content').find('.content-holder').children('.tab-content').removeClass('active').siblings('.tab-content[data-tab-id=' + tabID + ']').addClass('active');
    });

    /************** Feature Selector Scripts **************/

    $(target+' .feature-selector-tabs li').click(function () {
        var tabID = $(this).attr('data-feature-id');
        $(this).closest('.feature-selector-holder').find('.feature-selector-tabs li').removeClass('active');
        $(this).addClass('active');
        $(this).closest('.feature-selector-holder').find('.feature-selector-content').children('li').removeClass('active').siblings('li[data-feature-id=' + tabID + ']').addClass('active');
        $(target+' .feature-selector-content').css('height', $(target+' .feature-selector-content').find('.active').height());
    });

    $(target+' .feature-selector-content').css('height', $(target+' .feature-selector-content').find('.active').height());

    /************** Video Dividers Scripts **************/

    // Set the videos height at the wrappers width so it takes up the whole space of the divider

    $(target+' .video-wrapper').each(function () {
        var height = $(this).width();
        $(this).css('height', height);

        if ($(this).width() < $(target+' .row').width()) {
            $(this).css('width', height * 2);
        }

        if ($(this).width() > $(target+' .row').width()) {
            $(this).css('width', height * 1.5);
        }
    });

    // and do this on resize!

    $(window).resize(function () {
        $(target+' .video-wrapper').each(function () {
            var height = $(this).width();
            $(this).css('height', height);
        });
    });


    /************** Parallax Scripts **************/

    $(target+' .background-parallax').each(function () {
        var top = Math.round($(this).offset().top);
        var width = Math.round($(this).outerWidth());
        var height = Math.round($(this).outerHeight());
        var windowHeight = $(window).height();

        if (height > windowHeight || height == windowHeight) {
            $(this).attr('data-bottom-top', 'background-position: 50% -200px');
            $(this).attr('data-center', 'background-position: 50% 0px');
            $(this).attr('data-top-bottom', 'background-position: 50% 200px');

        } else {

            if (height > width) {
                $(this).attr('data-bottom-top', 'background-position: 50% -100px');
                $(this).attr('data-center', 'background-position: 50% 0px');
                if (top != 0) {
                    $(this).attr('data-top-bottom', 'background-position: 50% 100px');
                } else {
                    $(this).attr('data-top', 'background-position: 50% 0px');
                    $(this).attr('data-top-bottom', 'background-position: 50% 100px');
                }
            } else {
                $(this).attr('data-bottom-top', 'background-position: 50% -200px');
                $(this).attr('data-center', 'background-position: 50% -100px');
                if (top != 0) {
                    $(this).attr('data-top-bottom', 'background-position: 50% 0px');
                } else {
                    $(this).attr('data-top', 'background-position: 50% 0px');
                    $(this).attr('data-top-bottom', 'background-position: 50% 100px');
                }
            }

        }

    });

    $(target+' .parallax-scroll').each(function () {
        $(this).attr('data-bottom-top', 'transform: translateY(150px)');
        $(this).attr('data-center', 'transform: translateY(50px)');
        $(this).attr('data-top-bottom', 'transform: translateY(0px)');
    });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
    }

    /************** Map Scripts **************/

    $(target+' .map .overlay').click(function () {
        $(this).hide();
    });

    $(window).scroll(function () {
        $(target+' .map .overlay').show();
    });

	
    /************** Instagram Scripts **************/

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $(target+' .instafeed').each(function () {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name')
        });

    });

	
   // Contact form code

    $(target+' form.form-contact').submit(function (e) {
		// return false so form submits through jQuery rather than reloading page.
		if(e.preventDefault) e.preventDefault(); 
		else e.returnValue = false;
		
		var thisForm 		= $(this).closest('form'),
			error 			= 0,
			originalError 	= thisForm.attr('original-error'),
			loadingSpinner;
			
		if (typeof originalError !== typeof undefined && originalError !== false) {
			thisForm.find('.form-error').text(originalError); 
		}
				

		error = validateFields(thisForm);
		

        if (error === 1){
            $(this).closest('form').find('.form-error').fadeIn(200);
        }else {
			// Hide the error if one was shown
			$(this).closest('form').find('.form-error').fadeOut(200);
			// Create a new loading spinner while hiding the submit button.
			loadingSpinner = $(target+' <div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
			$(thisForm).find('input[type="submit"]').hide();
            
            jQuery.ajax({
                type: "POST",
                url: "mail/mail.php",
                data: thisForm.serialize(),
                success: function (response) {
                	// Swiftmailer always sends back a number representing numner of emails sent.
					// If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
					$(thisForm).find('.form-loading').remove();
					$(thisForm).find('input[type="submit"]').show();
					if($.isNumeric(response)){
						if(parseInt(response) > 0){
							thisForm.find('.form-success').fadeIn(1000);
							thisForm.find('.form-error').fadeOut(1000);
							setTimeout(function(){ thisForm.find('.form-success').fadeOut(500); }, 5000);
						}
					}
					// If error text was returned, put the text in the .form-error div and show it.
					else{
						// Keep the current error text in a data attribute on the form
						thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
						// Show the error with the returned error text.
						thisForm.find('.form-error').text(response).fadeIn(1000);
						thisForm.find('.form-success').fadeOut(1000);
					}
                },
                error: function (errorObject, errorText, errorHTTP) {
                	// Keep the current error text in a data attribute on the form
					thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
					// Show the error with the returned error text.
					thisForm.find('.form-error').text(errorHTTP).fadeIn(1000);
					thisForm.find('.form-success').fadeOut(1000);
                	$(thisForm).find('.form-loading').remove();
					$(thisForm).find('input[type="submit"]').show();
                }
            });
        }
		return false;
    });

	$(target+' .validate-required, .validate-email').on('blur change', function(){
		validateFields($(this).closest('form'));
	});

	$(target+' form').each(function(){
		if($(this).find('.form-error').length){
			$(this).attr('original-error', $(this).find('.form-error').text());
		}
	});

	function validateFields(form){
		var name, error, originalErrorMessage;

		form.find('.validate-required[type="checkbox"]').each(function(){
			if(!$(target+' [name="'+$(this).attr('name')+'"]:checked').length){
				error = 1;
				name = $(this).attr('name').replace('[]', '');
				form.find('.form-error').text('Please tick at least one '+name+' box.');
			}
		});

		$(form).find('.validate-required').each(function(){
			if($(this).val() === ''){
				$(this).addClass('field-error');
				error = 1;
			}else{
				$(this).removeClass('field-error');
			}
		});
		
		$(form).find('.validate-email').each(function(){
			if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
				$(this).addClass('field-error');
				error = 1;
			}else{
				$(this).removeClass('field-error');
			}
		});

		if(!form.find('.field-error').length){
			form.find('.form-error').fadeOut(1000);
		}

		return error;
	}
	





    /************** Loader Scripts **************/

    setTimeout(function () {

        $(target+' .loader').addClass('show-content');
        setTimeout(function () {
            $(target+' .loader').hide();
            $(target+' .animate').each(function () {
                $(this).addClass('animated fadeInUp');
            });
        }, 500);

    }, 1000);

    /************** Navigation Scripts **************/

    // Position Fullwidth Subnavs fullwidth correctly

    $(target+' .subnav-fullwidth').each(function () {
        $(this).css('width', $(target+' .row').width());
        var subNavOffset = -($(target+' nav .row').innerWidth() - $(target+' .menu').innerWidth() - 15);
        $(this).css('left', subNavOffset);
    });

    $(window).resize(function () {
        $(target+' .subnav-fullwidth').each(function () {
            $(this).css('width', $(target+' .row').width());
            var subNavOffset = -($(target+' nav .row').innerWidth() - $(target+' .menu').innerWidth() - 15);
            $(this).css('left', subNavOffset);
        });
    });

    /************** Portfolio Scripts **************/

    setTimeout(function () {

        $(target+' figure .cover-wrapper').each(function () {

            var padHeight = ($(this).outerHeight() / 2) - ($(this).children('.hover-state').children('.hover-content').height() / 2);
            $(this).children('.hover-state').css('padding-top', padHeight);
        });

    }, 1000);

    $(window).resize(function () {
        setTimeout(function () {

            $(target+' figure .cover-wrapper').each(function () {

                var padHeight = ($(this).outerHeight() / 2) - ($(this).children('.hover-state').children('.hover-content').height() / 2);
                $(this).children('.hover-state').css('padding-top', padHeight);
            });

        }, 1000);
    });

    /*************** Isotope Scripts **************/

    $(target+' .work-wrapper').isotope({
        itemSelector: 'figure',
        layoutMode: 'masonry',
        onLayout: function () {

        }
    });

    $(target+' .blog-masonry-wrapper').isotope({
        itemSelector: 'article',
        layoutMode: 'masonry'
    });

    $(target+' .filters li a').click(function () {
        
        var selector = $(this).attr('data-filter');
        var container = $(this).closest('.work-instance-wrapper').find('.work-wrapper');
        container.isotope({
            filter: selector
        });
        $(this).closest('.filters').children('li').removeClass('active');
        $(this).parent('li').addClass('active');
		return false;
    });
    


}