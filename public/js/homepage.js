/** 
 * Responsible for dynamically adding role forms
 **/
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

/** 
 * Set char limit on descriptions and show the current # of chars left
 **/
$("#project-description").on('input propertychange paste', function() {
    var length = $("#project-description").val().length;
    var remaining = $("#project-description").attr("maxlength") - length;
    $("#characters_remaining").html(remaining)
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

	htmlbodyHeightUpdate();
	$( window ).resize(function() {
		htmlbodyHeightUpdate();
	});
	$( window ).scroll(function() {
		var height2 = $('.main').height();
			htmlbodyHeightUpdate();
	});

	var showChar = 100;
    var ellipsestext = "...";
    var moretext = "more";
    var lesstext = "less";
    $('.more').each(function() {
        var content = $(this).html().trim();
 
 		content = content.substr(28);       

        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ ' </span><span class="morecontent"><span>' + h + '</span>  <a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });


    // track how many times add project is clicked
    $('#add-project-button').click(function() {
    	woopra.track("v1_add_click");
    });
});


/*$(function() {
	$("#nav-logout").on("click",function(e) {
		e.preventDefault(); // cancel the link itself
		$.post('/logout',function(data) {

		});
	});
}); */