jQuery(function(){
	"use strict";
	
	var portfolio = jQuery('.portfolio-items'),
		jQuerytestimonials = jQuery('.testimonials-slider');

	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	jQuery('.has-popup').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	/*=========================================================================
		Section navigation by URL Hash
	=========================================================================*/
	var sect = window.location.hash;
	if ( jQuery(sect).length == 1 ){
		jQuery('.section.active').removeClass('active');
		jQuery(sect).addClass('active');
		jQuery('.menu-items > li > a.active').removeClass('active');
		jQuery('.menu-items a[href='+sect+']').addClass('active');
		if( jQuery(sect).data('color') == 'dark' ){
			jQuery('body').addClass('dark-color');
		}else{
			jQuery('body').removeClass('dark-color');
		}
		jQuery('body, .nav').css('background-color', jQuery(sect).data('bg'));	
	}
	
	jQuery(window).on('load', function(){

		/* Portfolio Grid */
		portfolio.shuffle();
		
		jQuery('body').addClass('loaded');
	});


	/*=========================================================================
		Portfolio Filters
	=========================================================================*/
	jQuery('.portfolio-filters > li > a').on('click', function (e) {
		e.preventDefault();
		var groupName = jQuery(this).attr('data-group');
		jQuery('.portfolio-filters > li > a').removeClass('active');
		jQuery(this).addClass('active');
		portfolio.shuffle('shuffle', groupName );
	});

	

	
	/*=========================================================================
		Menu Functions
	=========================================================================*/
	jQuery('.menu-btn').on('click', function(e){
		e.preventDefault();
		jQuery('body').toggleClass('show-menu');
	});
	jQuery('#main-wrapper').on('click', function(){
		jQuery('body').removeClass('show-menu');
	});
	var cTimeout = false, color, timeout;
	jQuery('.menu-items > li > a, .section-link').on('click', function(e){
		var section = jQuery(this).attr('href');
		jQuery('body').removeClass('show-menu');
		if( jQuery(section).length == 1 && !jQuery(section).hasClass('active') ){
			if(cTimeout){
				clearTimeout(timeout);
				jQuery('body').removeClass('switch');
				jQuery('.ripple').remove();
			}
			if( jQuery(section).data('color') == 'dark' ){
				jQuery('body').addClass('dark-color');
			}else{
				jQuery('body').removeClass('dark-color');
			}
			color = jQuery(section).data('bg');
			setTimeout(function(){
				jQuery('<div class="ripple" ></div>').css({
					'background' : color,
					'top' : e.clientY,
					'left' : e.clientX
				}).appendTo('body');
			}, 0);
			jQuery('.menu-items > li > a.active').removeClass('active');
			jQuery('.menu-items a[href='+section+']').addClass('active');
			jQuery('body').addClass('switch');
			cTimeout = true;
			setTimeout(function(){
				jQuery('.section.active').removeClass('active');
				jQuery(section).addClass('active');
			}, 500);
			timeout = setTimeout(function(){
				jQuery('body').removeClass('switch');
				jQuery('body, .nav').css('background-color', color);
				jQuery('.ripple').remove();
				cTimeout = false;
			}, 1000);
			setTimeout(function(){
				portfolio.shuffle('destroy');
				portfolio.shuffle();

			}, 500);
		}
	});
	/*=========================================================================
		Contact Form
	=========================================================================*/
	function isJSON(val){
		var str = val.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return (/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*jQuery/).test(str);
	}
	jQuery('#contact-form').validator().on('submit', function (e) {
		if (!e.isDefaultPrevented()) {
			// If there is no any error in validation then send the message
			e.preventDefault();
			var jQuerythis = jQuery(this),
				//You can edit alerts here
				alerts = {
					success: 
					"<div class='form-group' >\
						<div class='alert alert-success' role='alert'> \
							<strong>Message Sent!</strong> We'll be in touch as soon as possible\
						</div>\
					</div>",
					error: 
					"<div class='form-group' >\
						<div class='alert alert-danger' role='alert'> \
							<strong>Oops!</strong> Sorry, an error occurred. Try again.\
						</div>\
					</div>"
				};
			jQuery.ajax({
				url: 'mail.php',
				type: 'post',
				data: jQuerythis.serialize(),
				success: function(data){
					if( isJSON(data) ){
						data = jQuery.parseJSON(data);
						if(data['error'] == false){
							jQuery('#contact-form-result').html(alerts.success);
							jQuery('#contact-form').trigger('reset');
						}else{
							jQuery('#contact-form-result').html(
							"<div class='form-group' >\
								<div class='alert alert-danger alert-dismissible' role='alert'> \
									<button type='button' class='close' data-dismiss='alert' aria-label='Close' > \
										<i class='ion-ios-close-empty' ></i> \
									</button> \
									"+ data['error'] +"\
								</div>\
							</div>"
							);
						}
					}else{
						jQuery('#contact-form-result').html(alerts.error);
					}
				},
				error: function(){
					jQuery('#contact-form-result').html(alerts.error);
				}
			});
		}
	});
	
	
});