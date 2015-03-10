/** 
 * Responsible for dynamically adding skill forms
 **/
$('#edit-add-skill-form').click(function(e) {

	var e1 = document.createElement("input");
	e1.type = "text";
	e1.className = "form-control";
	e1.name = "skills";

	var cont = document.getElementById("edit-skill-form");
	cont.appendChild(e1);
	cont.appendChild(document.createElement('br'));

});

/** 
 * Set char limit on descriptions and show the current # of chars left
 **/
$("#profile-bio").on('input propertychange paste', function() {
	var length = $("#profile-bio").val().length;
    var remaining = $("#profile-bio").attr("maxlength") - length;
    $("#characters-remaining").html(remaining)
});