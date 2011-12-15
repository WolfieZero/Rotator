/**
 * Rotator v0.5 
 * 
 * Author: Neil Sweeney (http://wolfiezero.com/)
 * Date: 15/12/2011
 * 
 * Bugs:
 *  - If `transitionSpeed` and `speed` the rotator will jump ahead of itself and screw up
 */

(function($){  
	$.fn.rotator = function(){ 
		 
		// rotation speed and timer
		var	speed			= 7000,
			transitionSpeed	= 1000,
			element			= this,
			rotate			= '$(\'#' + this.attr('id') + ' .next\').click()';
			run				= setInterval(rotate, speed),
	
		// grab the width and calculate left value
			item_width		= this.outerWidth(),
			left_value		= item_width * (-1);
			
		// Extend the element so we can assign controls remotely
		$.extend(this, {
			prev: function(time) {
				prev();
			},
			next: function(time) {
				next();
			}
		});
		
		this.find('li:first').before(this.find('li:last'));				//move the last item before first item, just in case user click prev button
		this.find('ul').css({ 'left' : left_value });					//set the default item to the correct position
		this.
				prepend('<a class="prev">Previous</a>').				// Add prev button
				append('<a class="next">Next</a>');						// Add next button

	
		// We need the clicks to work so we tell jq they are live
		this.find('.prev').live('click', function() {
			prev();
		});
		this.find('.next').live('click', function() {
			next();
		});
		
	
		//a simple function to click next link
		//a timer will call this function, and the rotation will begin :)  
		function rotate() {
			$('.next').click();
		}     
		
	
		//if user clicked on prev button
		function prev() {
			
			var	prev_ul		= element.find('ul'),							// cache the element
				left_indent = parseInt(prev_ul.css('left')) + item_width;	// get the right position
	
			//slide the item            
			prev_ul.animate({'left' : left_indent}, transitionSpeed, function() {  
				
				element.find('li:first').before(element.find('li:last'));	// move the last item and put it as first item
				prev_ul.css({'left' : left_value});							// set the default item to correct position
			
			});
	
			return false;	// cancel the link behavior
		}; 
	
	
		//if user clicked on next button
		function next() {
					
			var	next_ul		= element.find('ul'),							// cache the element
				left_indent	= parseInt(next_ul.css('left')) - item_width;	// get the right position
	 
	 
			//slide the item
			next_ul.animate({'left' : left_indent}, transitionSpeed, function () {
			
				element.find('li:last').after(element.find('li:first'));	//move the first item and put it as last item
				next_ul.css({'left' : left_value});							//set the default item to correct position
	
			});
			
			return false;	//cancel the link behavior
		};
	
	
		//if mouse hover, pause the auto rotation, otherwise rotate it
		this.hover(
			
			function() {
				clearInterval(run);
			},
			function() {
				run = setInterval(rotate, speed);
			}
		
		);
  
	};  
  
})(jQuery);  