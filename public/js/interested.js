/** 
 * Set char limit on message and show the current # of chars left
 **/
$("#interested-message").on('input propertychange paste', function() {
    var length = $("#interested-message").val().length;
    var remaining = $("#interested-message").attr("maxlength") - length;
    $("#char_remaining").html(remaining)
});