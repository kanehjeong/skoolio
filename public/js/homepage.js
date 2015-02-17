'use strict';

// Call this function when the page loads (the "ready" event)
/*$(document).ready(function() {
})*/

$('#add-role-form').click(function(e) {
	//e.preventDefault();

	var e1 = document.createElement("input");
	e1.type = "text";
	e1.className = "form-control";
	e1.name = "roles";

	var cont = document.getElementById("role-form");
	cont.appendChild(e1);
	cont.appendChild(document.createElement('br'));

});

function htmlbodyHeightUpdate(){
		var height3 = $( window ).height();
		var height1 = $('.nav').height()+50;
		var height2 = $('.main').height();
		if(height2 > height3){
			$('html').height(Math.max(height1,height3,height2)+10);
			$('body').height(Math.max(height1,height3,height2)+10);
		}
		else
		{
			$('html').height(Math.max(height1,height3,height2));
			$('body').height(Math.max(height1,height3,height2));
		}
		
}

$(document).ready(function () {
	htmlbodyHeightUpdate()
	$( window ).resize(function() {
		htmlbodyHeightUpdate()
	});
	$( window ).scroll(function() {
		var height2 = $('.main').height()
			htmlbodyHeightUpdate()
	});
});

/*$(function() {
	$("#nav-logout").on("click",function(e) {
		e.preventDefault(); // cancel the link itself
		$.post('/logout',function(data) {

		});
	});
}); */