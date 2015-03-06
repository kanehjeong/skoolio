$('#delete-project-button').click(function(){
    return confirm("Are you sure you want to delete the project?");
});

$('.edit-project').click(function() {

	var ID = $(this).attr("id").substring(19);
 	var descriptionID = "#project-description" + ID;

 	var length = $(descriptionID).val().length;
    var remaining = $(descriptionID).attr("maxlength") - length;
    $("#edit-characters-remaining" + ID).html(remaining);

});

/** 
 * Set char limit on descriptions and show the current # of chars left
 **/
$(".edit-project-description").on('input propertychange paste', function() {

    var ID = $(this).attr("id").substring(19);
 	var descriptionID = "#project-description" + ID;

 	var length = $(descriptionID).val().length;
    var remaining = $(descriptionID).attr("maxlength") - length;
    $("#edit-characters-remaining" + ID).html(remaining);
});


/** 
 * Responsible for dynamically adding role forms
 **/
$('#edit-add-role-form').click(function(e) {
	//e.preventDefault();

	var e1 = document.createElement("input");
	e1.type = "text";
	e1.className = "form-control";
	e1.name = "roles";

	var cont = document.getElementById("edit-role-form");
	cont.appendChild(e1);
	cont.appendChild(document.createElement('br'));

});