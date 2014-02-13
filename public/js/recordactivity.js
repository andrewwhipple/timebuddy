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
	/*
	$.ajax({
	    url: "/writeactivitydata", // + '?callback=?' --I realized this is not necessary with dataType: 'jsonp'
	    data: parameters,
	    error: function(xhr, status, error) {
			console.log("int eh error funtion aoief");
	        },
	    success: function(results){
	    	console.log("sucess function");
	        writedata(results);
	    }
	}).done(function(data){
		console.log("made it to success");
	}).fail(function(data){
    	console.log("error function");
        console.log(xhr);
        console.log(status);
        console.log(error);
	});
*/
}

function writedata(results){
	console.log("made it to the results writedata!!");
	var message = results['message'];
	console.log("Here's the message: " + message);
	$('#message').html(message);
}
