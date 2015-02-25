/** 
 * Set char limit on message and show the current # of chars left
 **/
$("#interested-message").on('input propertychange paste', function() {
    var length = $("#interested-message").val().length;
    var remaining = $("#interested-message").attr("maxlength") - length;
    $("#char_remaining").html(remaining);
});

$('#notify-button').click(function() {
	console.log("validating form....");

	var checkedAtLeastOne = false;
	$('input[type="checkbox"]').each(function() {
	    if ($(this).is(":checked")) {
	        checkedAtLeastOne = true;
	    }
	});	

	if(!checkedAtLeastOne) {
		$('#check-at-least-one').html("Please check at least one role");
		return false;
	}
});