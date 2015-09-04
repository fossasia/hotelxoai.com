var mr_firstSectionHeight, 
    mr_nav, 
    mr_navOuterHeight, 
    mr_navScrolled = false,
    mr_navFixed = false,
    mr_outOfSight = false,
    mr_floatingProjectSections,
    mr_scrollTop = 0;

$(document).ready(function(){ //variant-remove
	"use strict";
	
	// Smooth scroll to inner links
	
	$('.inner-link').smoothScroll({
		offset: -55,
		speed: 800
	});
	
	// Update scroll variable for scrolling functions
	
	addEventListener('scroll',function(){ mr_scrollTop = window.pageYOffset; }, false );
	
	// Append .background-image-holder <img>'s as CSS backgrounds

    $('.background-image-holder').each(function() {
        var imgSrc = $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', 'initial');
    });
    
    // Fade in background images
	
	setTimeout(function(){
		$('.background-image-holder').each(function() {
			$(this).addClass('fadeIn');
		});
    },200);
	
	// Initialize Tooltips
	
	$('[data-toggle="tooltip"]').tooltip();
	
	// Checkboxes
	
	$('.checkbox-option').click(function(){
		$(this).toggleClass('checked');
		var checkbox = $(this).find('input');
		if(checkbox.prop('checked') === false){
			checkbox.prop('checked',true);
		}else{
			checkbox.prop('checked',false);
		}
	});
	
	// Radio Buttons
	
	$('.radio-option').click(function(){
		$(this).closest('form').find('.radio-option').removeClass('checked');
		$(this).addClass('checked');
		$(this).find('input').prop('checked',true);
	});
	
	
	// Accordions
	
	$('.accordion li').click(function(){
		if($(this).closest('.accordion').hasClass('one-open')){
			$(this).closest('.accordion').find('li').removeClass('active');
			$(this).addClass('active');
		}else{
			$(this).toggleClass('active');
		}
	});
	
	// Tabbed Content
    
    $('.tabbed-content').each(function(){
    	$(this).append('<ul class="content"></ul>');
    });
    
    $('.tabs li').each(function(){
    	var originalTab = $(this), activeClass = "";
    	if(originalTab.is('.tabs li:first-child')){
    		activeClass = ' class="active"';
    	}
    	var tabContent = originalTab.find('.tab-content').detach().wrap('<li'+activeClass+'></li>').parent();
    	originalTab.closest('.tabbed-content').find('.content').append(tabContent);
    });
    
    $('.tabs li').click(function(){
    	$(this).closest('.tabs').find('li').removeClass('active');
    	$(this).addClass('active');
    	var liIndex = $(this).index() + 1;
    	$(this).closest('.tabbed-content').find('.content>li').removeClass('active');
    	$(this).closest('.tabbed-content').find('.content>li:nth-of-type('+liIndex+')').addClass('active');
    });
    
    // Progress Bars
    
    $('.progress-bar').each(function(){
    	$(this).css('width', $(this).attr('data-progress')+'%');
    });
    
    // Navigation
    
    if(!$('nav').hasClass('fixed') && !$('nav').hasClass('absolute')){
    
    	// Make nav container height of nav
    	
    	$('.nav-container').css('min-height',$('nav').outerHeight(true));
    	
    	$(window).resize(function(){
    		$('.nav-container').css('min-height',$('nav').outerHeight(true));
    	});
    	
    	// Compensate the height of parallax element for inline nav
    	
    	if($(window).width() > 768){
    		$('.parallax:first-child .background-image-holder').css('top', -($('nav').outerHeight(true)) );
    	}
    	
    	// Adjust fullscreen elements
    	
    	if($(window).width() > 768){
    		$('section.fullscreen:first-child').css('height', ($(window).height() - $('nav').outerHeight(true)));
    	}
    	
    }else{
    	$('body').addClass('nav-is-overlay');
    }
    
    if($('nav').hasClass('bg-dark')){
    	$('.nav-container').addClass('bg-dark');
    }
    

    // Fix nav to top while scrolling
    
    mr_nav = $('body .nav-container nav:first');
    mr_navOuterHeight = $('body .nav-container nav:first').outerHeight();
    window.addEventListener("scroll", updateNav, false);

    // Menu dropdown positioning
    
    $('.menu > li > ul').each(function(){
    	var menu = $(this).offset();
    	var farRight = menu.left + $(this).outerWidth(true);
    	if(farRight > $(window).width() && !$(this).hasClass('mega-menu') ){
    		$(this).addClass('make-right');
    	}else if(farRight > $(window).width() && $(this).hasClass('mega-menu')){
    		var isOnScreen = $(window).width() - menu.left;
    		var difference = $(this).outerWidth(true) - isOnScreen;
    		$(this).css('margin-left', -(difference));
    	}
    });
    
    // Mobile Menu
    
    $('.mobile-toggle').click(function(){
    	$('.nav-bar').toggleClass('nav-open');
    	$(this).toggleClass('active');
    });
    
    $('.menu li').click(function(e){
    	if (!e) e = window.event;
    	e.stopPropagation();
    	if($(this).find('ul').length){
    		$(this).toggleClass('toggle-sub');
    	}else{
    		$(this).parents('.toggle-sub').removeClass('toggle-sub');
    	}
    });
    
    $('.module.widget-handle').click(function(){
    	$(this).toggleClass('toggle-widget-handle');
    });
    
    // Populate filters
    $('.projects').each(function(){
        
        var filters = "";

        $(this).find('.project').each(function(){
            
            var filterTags = $(this).attr('data-filter').split(',');
            
            filterTags.forEach(function(tagName){
                if(filters.indexOf(tagName) == -1){
                    filters += '<li data-filter="'+tagName+'">'+capitaliseFirstLetter(tagName)+'</li>';       
                }
            });
            $(this).closest('.projects')
                   .find('ul.filters').empty().append('<li data-filter="all" class="active">All</li>').append(filters);
        });
    });

    $('.filters li').click(function(){
    	var filter = $(this).attr('data-filter');
    	$(this).closest('.filters').find('li').removeClass('active');
    	$(this).addClass('active');
    	
    	$(this).closest('.projects').find('.project').each(function(){
            var filters = $(this).data('filter');
            
            if(filters.indexOf(filter) == -1){
                $(this).addClass('inactive');
            }
            else{
                $(this).removeClass('inactive');
            }
        });
    	
    	if(filter == 'all'){
    		$(this).closest('.projects').find('.project').removeClass('inactive');
    	}
    });
    
    // Twitter Feed

    $('.tweets-feed').each(function(index) {
        $(this).attr('id', 'tweets-' + index);
    }).each(function(index) {

        function handleTweets(tweets) {
            var x = tweets.length;
            var n = 0;
            var element = document.getElementById('tweets-' + index);
            var html = '<ul class="slides">';
            while (n < x) {
                html += '<li>' + tweets[n] + '</li>';
                n++;
            }
            html += '</ul>';
            element.innerHTML = html;
            return html;
        }

        twitterFetcher.fetch($('#tweets-' + index).attr('data-widget-id'), '', 5, true, true, true, '', false, handleTweets);

    });
    
    // Instagram Feed

    jQuery.fn.spectragram.accessData = {
        accessToken: '1406933036.fedaafa.feec3d50f5194ce5b705a1f11a107e0b',
        clientID: 'fedaafacf224447e8aef74872d3820a1'
    };

    $('.instafeed').each(function() {
        $(this).children('ul').spectragram('getUserFeed', {
            query: $(this).attr('data-user-name'), max: 12
        });
    });
    
    // Image Sliders
    
    $('.slider-all-controls').flexslider({  });
    $('.slider-paging-controls').flexslider({ animation: "slide", directionNav: false });
    $('.slider-arrow-controls').flexslider({ controlNav: false });
	$('.slider-thumb-controls .slides li').each(function(){
		var imgSrc = $(this).find('img').attr('src');
		$(this).attr('data-thumb', imgSrc);
	});
	$('.slider-thumb-controls').flexslider({ animation: "slide", controlNav: "thumbnails", directionNav: true });
	$('.logo-carousel').flexslider({ minItems: 1, maxItems: 4, move: 1, itemWidth: 200, itemMargin: 0, animation: "slide", slideshow: true, slideshowSpeed: 3000, directionNav: false, controlNav: false });
	
	
	// Video Modals
	$('section').closest('body').find('.modal-video[video-link]').remove();

	$('.modal-video-container').each(function(index){
		$(this).find('.play-button').attr('video-link', index);
		$(this).find('.modal-video').clone().appendTo('body').attr('video-link',index);
	});
	
	$('.modal-video-container .play-button').click(function(){
		var linkedVideo = $('body').find('.modal-video[video-link="'+$(this).attr('video-link')+'"]');
		linkedVideo.toggleClass('reveal-modal');
		
		if(linkedVideo.find('video').length){
			linkedVideo.find('video').get(0).play();
		}
		
		if(linkedVideo.find('iframe').length){
			var iframe = linkedVideo.find('iframe');
        	var iframeSrc = iframe.attr('data-src') + '&autoplay=1';
        	iframe.attr('src', iframeSrc);
		}
	});
	
	$('.close-iframe').click(function(){
    	$(this).closest('.modal-video').toggleClass('reveal-modal');
    	$(this).siblings('iframe').attr('src', '');
    	$(this).siblings('video').get(0).pause();
    });
    
    // Local Videos
    
    $('.local-video-container .play-button').click(function(){
    	$(this).siblings('.background-image-holder').removeClass('fadeIn');
    	$(this).siblings('.background-image-holder').css('z-index',-1);
    	$(this).css('opacity', 0);
    	$(this).siblings('video').get(0).play();
    });
	
	// Youtube Videos
	
	 $('.player').each(function(){
	 	var src = $(this).attr('data-video-id');
	 	var startat = $(this).attr('data-start-at');
	 	$(this).attr('data-property', "{videoURL:'http://youtu.be/"+src+"',containment:'self',autoPlay:true, mute:true, startAt:"+startat+", opacity:1, showControls:false}" );
	 });
	 
	 $(".player").YTPlayer();

	// FS Vid Background
	
	$(window).resize(function(){
		resizeVid();
	});
	
	// Interact with Map once the user has clicked (to prevent scrolling the page = zooming the map
	
	$('.map-holder').click(function(){
		$(this).addClass('interact');
	});
	
	$(window).scroll(function(){
		if($('.map-holder.interact').length){
			$('.map-holder.interact').removeClass('interact');
		}
	});
	
	// Countdown Timers
	
	if($('.countdown').length){
		$('.countdown').each(function(){
			var date = $(this).attr('data-date');
			$(this).countdown(date, function(event) {
				$(this).text(
				event.strftime('%D days %H:%M:%S')
				);
			});
		});
	}

    // Contact form code

    $('form.form-email, form.form-newsletter').submit(function(e) {
       
        // return false so form submits through jQuery rather than reloading page.
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;

        var thisForm = $(this).closest('form.form-email, form.form-newsletter'),
            error = 0,
            originalError = thisForm.attr('original-error'),
            loadingSpinner, iFrame, userEmail, userFullName, userFirstName, userLastName;

        // Mailchimp/Campaign Monitor Mail List Form Scripts
        iFrame = $(thisForm).find('iframe.mail-list-form');

        thisForm.find('.form-error, .form-success').remove();
        thisForm.append('<div class="form-error" style="display: none;">'+thisForm.attr('data-error')+'</div>');
        thisForm.append('<div class="form-success" style="display: none;">'+thisForm.attr('data-success')+'</div>');
        
        
        if( (iFrame.length) && (typeof iFrame.attr('srcdoc') !== "undefined") && (iFrame.attr('srcdoc') !== "") ){
                
                console.log('Mail list form signup detected.');
                userEmail       = $(thisForm).find('.signup-email-field').val();
                userFullName    = $(thisForm).find('.signup-name-field').val();
                if($(thisForm).find('input.signup-first-name-field').length){
                    userFirstName   = $(thisForm).find('input.signup-first-name-field').val();
                }else{
                    userFirstName   = $(thisForm).find('.signup-name-field').val();
                }
                userLastName    = $(thisForm).find('.signup-last-name-field').val();

                // validateFields returns 1 on error;
                if (validateFields(thisForm) !== 1) {
                    console.log('Mail list signup form validation passed.');
                    console.log(userEmail);
                    console.log(userLastName);
                    console.log(userFirstName);
                    console.log(userFullName);
                    
                    iFrame.contents().find('#mce-EMAIL, #fieldEmail').val(userEmail);
                    iFrame.contents().find('#mce-LNAME, #fieldLastName').val(userLastName);
                    iFrame.contents().find('#mce-FNAME, #fieldFirstName').val(userFirstName);
                    iFrame.contents().find('#mce-NAME, #fieldName').val(userFullName);
                    iFrame.contents().find('form').attr('target', '_blank').submit();
                }else{
                    thisForm.find('.form-error').fadeIn(1000);
                    setTimeout(function() {
                        thisForm.find('.form-error').fadeOut(500);
                    }, 5000);
                }
        }
        else{
            console.log('Send email form detected.');
            if (typeof originalError !== typeof undefined && originalError !== false) {
                thisForm.find('.form-error').text(originalError);
            }


            error = validateFields(thisForm);


            if (error === 1) {
                $(this).closest('form').find('.form-error').fadeIn(200);
                setTimeout(function() {
                    $(thisForm).find('.form-error').fadeOut(500);
                }, 3000);
            } else {
                // Hide the error if one was shown
                $(this).closest('form').find('.form-error').fadeOut(200);
                // Create a new loading spinner while hiding the submit button.
                loadingSpinner = jQuery('<div />').addClass('form-loading').insertAfter($(thisForm).find('input[type="submit"]'));
                $(thisForm).find('input[type="submit"]').hide();

                jQuery.ajax({
                    type: "POST",
                    url: "mail/mail.php",
                    data: thisForm.serialize(),
                    success: function(response) {
                        // Swiftmailer always sends back a number representing numner of emails sent.
                        // If this is numeric (not Swift Mailer error text) AND greater than 0 then show success message.
                        $(thisForm).find('.form-loading').remove();
                        $(thisForm).find('input[type="submit"]').show();
                        if ($.isNumeric(response)) {
                            if (parseInt(response) > 0) {
                                thisForm.find('input[type="text"]').val("");
                                thisForm.find('textarea').val("");
                                thisForm.find('.form-success').fadeIn(1000);
                                thisForm.find('.form-error').fadeOut(1000);
                                setTimeout(function() {
                                    thisForm.find('.form-success').fadeOut(500);
                                }, 5000);
                            }
                        }
                        // If error text was returned, put the text in the .form-error div and show it.
                        else {
                            // Keep the current error text in a data attribute on the form
                            thisForm.find('.form-error').attr('original-error', thisForm.find('.form-error').text());
                            // Show the error with the returned error text.
                            thisForm.find('.form-error').text(response).fadeIn(1000);
                            thisForm.find('.form-success').fadeOut(1000);
                        }
                    },
                    error: function(errorObject, errorText, errorHTTP) {
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
        }
        return false;
    });

    $('.validate-required, .validate-email').on('blur change', function() {
        validateFields($(this).closest('form'));
    });

    $('form').each(function() {
        if ($(this).find('.form-error').length) {
            $(this).attr('original-error', $(this).find('.form-error').text());
        }
    });

    function validateFields(form) {
        var name, error, originalErrorMessage;

        $(form).find('.validate-required[type="checkbox"]').each(function() {
            if (!$('[name="' + $(this).attr('name') + '"]:checked').length) {
                error = 1;
                name = $(this).attr('name').replace('[]', '');
                form.find('.form-error').text('Please tick at least one ' + name + ' box.');
            }
        });

        $(form).find('.validate-required').each(function() {
            if ($(this).val() === '') {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        $(form).find('.validate-email').each(function() {
            if (!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))) {
                $(this).addClass('field-error');
                error = 1;
            } else {
                $(this).removeClass('field-error');
            }
        });

        if (!form.find('.field-error').length) {
            form.find('.form-error').fadeOut(1000);
        }

        return error;
    }
    // End contact form code

    // Get referrer from URL string 
    if(getURLParameter("ref")){
        $('form.form-email').append('<input type="text" name="referrer" class="hidden" value="'+getURLParameter("ref")+'"/>')
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    }
    
    // Disable parallax on mobile
    
    if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        $('section').removeClass('parallax');
    }
	
}); //variant-remove

$(window).load(function() { //variant-remove
	"use strict";
	
	// Initialize Masonry
    
    if($('.masonry').length){
		var container = document.querySelector('.masonry');
		var msnry = new Masonry( container, {
			itemSelector: '.masonry-item'
		});
	
		msnry.on( 'layoutComplete', function() {
		
			mr_firstSectionHeight = $('.main-container section:first-child').outerHeight(true);
		
			// Fix floating project filters to bottom of projects container
	
			if($('.filters.floating').length){
				setupFloatingProjectFilters();
				updateFloatingFilters();
				window.addEventListener("scroll", updateFloatingFilters, false);
			}
		
			$('.masonry').addClass('fadeIn');
			$('.masonry-loader').addClass('fadeOut');
			if($('.masonryFlyIn').length){
				masonryFlyIn();
			}
		});
		
		msnry.layout();
	}
	
	// Resize fullscreen video backgrounds to cover parent
	
	resizeVid();

    // Initialize twitter feed

    var setUpTweets = setInterval(function() {
        if ($('.tweets-slider').find('li.flex-active-slide').length) {
            clearInterval(setUpTweets);
            return;
        } else {
            if ($('.tweets-slider').length) {
                $('.tweets-slider').flexslider({
                    directionNav: false,
                    controlNav: false
                });
            }
        }
    }, 500);
    
    mr_firstSectionHeight = $('.main-container section:first-child').outerHeight(true);
    
    
}); //variant-remove

function resizeVid() {
    
    $('.fs-vid-background video').each(function(){
		var vid = $(this);
		var ratio = (vid.width() / vid.height());
		var section = vid.closest('section');
		if(section.width() > section.outerHeight()){
			vid.css('width', (section.width()*ratio));
			vid.css('margin-left', -((section.width()*ratio)/4));
			vid.css('height', 'auto');
		}else{
			vid.css('width', 'auto');
			vid.css('height', (section.outerHeight()*ratio) );
			vid.css('margin-left', 0);
		}
	});
	
}

function updateNav(){
    
    var scrollY = mr_scrollTop;

    if(scrollY <= 0){
        if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
        if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight');}
        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        return;
    }

    if(scrollY > mr_firstSectionHeight){
        if(!mr_navScrolled){
            mr_nav.addClass('scrolled');
            mr_navScrolled = true;
            return; 
        }
    }else{
        if(scrollY > mr_navOuterHeight){
            if(!mr_navFixed){mr_nav.addClass('fixed');mr_navFixed = true;}

            if(scrollY > mr_navOuterHeight*2){
                if(!mr_outOfSight){mr_nav.addClass('outOfSight'); mr_outOfSight = true;}
            }else{
                if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
            }
        }else{
            if(mr_navFixed){mr_navFixed = false;mr_nav.removeClass('fixed');}
            if(mr_outOfSight){mr_outOfSight = false; mr_nav.removeClass('outOfSight'); }
        }

        if(mr_navScrolled){mr_navScrolled = false;mr_nav.removeClass('scrolled');}
        
    }
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function masonryFlyIn() {
  var $items = $('.masonryFlyIn .masonry-item');
  var time = 0;

  $items.each(function() {
  	  var item = $(this);
      setTimeout( function(){ item.addClass('fadeIn'); }, time);
      time += 170;
  });
}

function setupFloatingProjectFilters(){
    mr_floatingProjectSections = [];
    $('.filters.floating').closest('section').each(function(){
        var section = $(this);

        mr_floatingProjectSections.push({
            section:        section.get(0),
            outerHeight:    section.outerHeight(),
            elemTop:        section.offset().top,
            elemBottom:     section.offset().top + section.outerHeight(),
            filters:		section.find('.filters.floating'),
            filersHeight:	section.find('.filters.floating').outerHeight(true)
        });
    });
}

function updateFloatingFilters(){
	var l = mr_floatingProjectSections.length;  
	while(l--) {
		var section = mr_floatingProjectSections[l];
		
		if(section.elemTop < mr_scrollTop){
			section.filters.css({ position:'fixed', top: '16px', bottom: 'auto' });
			if(mr_navScrolled){
				section.filters.css({ transform: 'translate3d(-50%,48px,0)' });
			}
			if(mr_scrollTop > (section.elemBottom - 70)){
				section.filters.css({ position:'absolute', bottom: '16px', top: 'auto' });
				section.filters.css({ transform: 'translate3d(-50%,0,0)' });
			}
		}else{
			section.filters.css({ position: 'absolute', transform: 'translate3d(-50%,0,0)' });
		}
	}
}