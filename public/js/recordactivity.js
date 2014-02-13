'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	console.log("javascript for recordactivity.js connected!");
	$("#submitBtn").click(submitClicked);	
})

function submitClicked(e){
	e.preventDefault();
	
	var activity = $("#activity").val();
	var hours = $("#hours").val();

	if(hours == ""){
		$('#message').html("Please enter the number of hours you spent on this activity");
		return;
	}


	var parameters = {'activity': activity, 'hours': hours };
	$.get("/writeactivitydata", parameters, writedata);

}

function writedata(results){
	var message = results['message'];
	$('#message').html(message);
}
