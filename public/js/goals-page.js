'use strict';

//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();

})



/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
	$('#addactivityform').hide();
	$('.editgoaldiv').hide();

	$(".button").click(submitClicked);	

	$("#submitBtn").click(submitClicked);
	$("#addactivityformbtn").click(addactivityformbtn);
	$("#addactivityformlabel").click(addactivityformbtn);
	//$(".editGoalButton").click(editGoalClicked);
	$(".activityclickdiv").click(editGoalClicked);
		
	$(".deleteGoalButton").click(deleteGoalClicked);
	$(".cancelButton").click(cancelClicked);
	$(".submitGoalButton").click(submitGoalClicked);
}


function addactivityformbtn(e){
	e.preventDefault();

	console.log("made it into");

	$( "#addactivityform" ).toggle(function() {
		console.log("here1");
	  $('#addActivity').hide();
	}, function() {
		console.log("here2");

	  $('#addActivity').show();
	});
}

function submitClicked(e) {
	console.log("CLICKED");
	e.preventDefault();
	var name = $("#name").val();
	var target = $("#target").val();
	var hasTime = checkInput(target);
	if (name == "") {
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the name of a target.");
		return;	
	} else if(!hasTime){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the amount of time you plan to spend on this target.");
		console.log("Problem yo");
		return;
	}
	if ((name != "") && (target != "")) {
		var parameters = {'activity': name, 'hours': 0, 'goal': target};
		$.get('/addactivitydata', parameters, writeData);	
	
	}
}

function checkInput(time){
	if(time == "")
		return false;
	var regexp = /^[0-9]*(.)[0-9]*$/;
    return (time.search(regexp) >= 0) ? true : false;
}

function writeData(results) {
	console.log("STUFF WORKS YAY");
	
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').html(results['activity'] +' added successfully!');
	
	$(".goalList").append('<div class="well well-sm activitydiv" id="'+results['activity']+'"> <div class = "well-text"><div class="inline" id="activity">' + results.activity + '</div>: <div class="inline" id="target">' + results.goal + '</div> hrs/day <button type="button" class="editGoalButton" id="editgoalbtn'+ results['activity']+ '">Edit Target</button><div class="goal"></div>'
			+ '<div class="container editgoaldiv" id="editgoaldiv'+ results['activity']+ '">'
			+'<form class ="inline editgoalform" role="form" id="editgoalform'+ results['activity']+ '">'
			+'<div class="inline time form-group col-sm-">'
			+	'<label class="control-label" for="text"> How much time do you want to spend on this per day? </label>'
			+	'<input type="text" id="time" class="form-control" placeholder="0.00"></input>'
	
			+'<a href="#"><button type="button" class="submitGoalButton submitBtn btn" >Submit</button></a>'
			+'</div>'
			+'<div class = "form-group">'
			+	'<button type="button" class="cancelButton btn btn-primary">Cancel Editing</button><br>'
			+	'<button type="button" class="deleteGoalButton btn btn-primary">Delete Target</button>'
			+'</div>'
		+'</form>'
	+'</div>');

	console.log($(".goalList").length);

	$("#editgoalbtn"+results['activity']).click(editGoalClicked);
	$("#editgoaldiv"+results['activity']).hide();

	$("#target").val('');
	$("#name").val('');

	$( "#addactivityform" ).toggle(function() {
		console.log("here1");
	  $('#addActivity').hide();
	}, function() {
		console.log("here2");

	  $('#addActivity').show();
	});
}


function deleteGoalClicked(e) {
	e.preventDefault();
	console.log("Delete clicked!");
	var name = $(this).closest(".well-text").attr('id');
	console.log(name);
	var parameters = {'activity': name};
	$.get('/deletegoal', parameters, deleteData);
	$(this).closest(".well-sm").remove();
		
}

function deleteData(results) {
	console.log("And now we're here!");
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').html(results['activity'] + ' removed successfully.');
	
	
}

function editGoalClicked(e) {
	e.preventDefault();
	console.log("CLICKED SON");
	
	var parentdiv = $(this).closest(".activitydiv");
	var div = parentdiv.find(".editgoaldiv");
	var form = parentdiv.find(".editgoalform");
	
	console.log(div);
	console.log(form);

	$( div ).toggle(function() {
		console.log("here1");
	  $(form).hide();
	}, function() {
		console.log("here2");
	  $(form).show();
	});

	//append a form that asks for name and Target (hrs/week)
	//add a submit button listener
	//when submit button clicked, pluck out the number
	//delete the form
	
	
}

function submitGoalClicked(e) {
	e.preventDefault();
	console.log("Submit Goal Clicked!");
	var name = $(this).closest(".well-text").attr('id');
	console.log(name);
	var time = $("#editForm").find("#time").val();
	var hasTime = checkInput(time);
	if (hasTime) {
		var parameters = {'activity': name, 'time': time};
		$.get('/editindividual', parameters, updateGoal);
	} else {
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the amount of time you plan to spend on this activity.");
		return;
	}
	
}

function updateGoal(results) {
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').html(results['activity'] + ' changed from ' + results['oldTarget'] + 'hrs to ' + results['newTarget'] + 'hrs.');
	$('#editForm').remove();

	var activitydiv = $("#"+results['activity']);
	console.log(activitydiv);
	$(activitydiv).find("#target").text(results['newTarget']);
}

function cancelClicked(e) {
	e.preventDefault();
	$('#editForm').remove();
	
}
