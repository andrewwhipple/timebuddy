'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("javascript for recordactivity.js connected!");
	$(".submitBtn").click(submitClicked);	
})

function submitClicked(e){
	e.preventDefault();
	
	var activitydiv = $(this).closest(".activity");
	var activity = $(activitydiv).attr('id');
	var time = $(activitydiv).find("#time").val();
	console.log(time);

	console.log(activity);
	var correctInput = checkInput(time);
	if(!correctInput){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the time spent doing this activity.");
		return;
	}


	var parameters = {'activity': activity, 'time': time };
	$.get("/addtime", parameters, success);

}

function success(results){
	var message = results['message'];
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').html(message);

	var activitydiv = $("#"+results['activity']);
	console.log(activitydiv);
	$(activitydiv).find("#timespent").text(results['hours'] +" / "+ results['goal'] + " hrs");
}

function checkInput(time){
	if(time == "")
		return false;
	var regexp = /^[0-9]*(.)[0-9]*$/;
    return (time.search(regexp) >= 0) ? true : false;
}
