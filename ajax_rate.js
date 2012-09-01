jQuery(document).ready(function($) { 

	$('.rating-up-inactive, .rating-down-inactive').live('click', function() {

		if ($(this).hasClass('rating-up-inactive')) {
			selectedRating = 'up';
			selectedPostID = (this.id.split('rate-up-'))[1];
		} else if ($(this).hasClass('rating-down-inactive')) {
			selectedRating = 'down';
			selectedPostID = (this.id.split('rate-down-'))[1];
			
		} else {
			return;
		}

		$.post(
			RockhoistRatingsAjax.ajaxurl,
			{
				// Declare the parameters to send along with the request
				action : 'rhr-ajax-submit',
				postID : selectedPostID,
				rating : selectedRating,
				ratingNonce : RockhoistRatingsAjax.ratingNonce
			},
			function( response ) {

				$.parseJSON( response );
				
				if ( response.success == true ) {
	
					// Update the rating count markup
					$("#rating-count-up-" + selectedPostID).html(response.countup);
					$("#rating-count-down-" + selectedPostID).html(response.countdown);
				
					// Store off the id of the selected button
					rateUpID = "#rate-up-" + selectedPostID;
					rateDownID = "#rate-down-" + selectedPostID;	

					// Update the rating icons
					if ( selectedRating == 'up' ) {
						$(rateUpID).addClass('rating-up-active');
						$(rateUpID).removeClass('rating-up-inactive');
						$(rateDownID).removeClass('rating-down-active');
						$(rateDownID).addClass('rating-down-inactive');
	
					} else if ( selectedRating  == 'down' ) {
						$(rateDownID).addClass('rating-down-active');
						$(rateDownID).removeClass('rating-down-inactive');
						$(rateUpID).addClass('rating-up-inactive');
						$(rateUpID).removeClass('rating-up-active');
					}
				}
			}
		);
	});
});