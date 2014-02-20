'use strict';

//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$('#addactivityform').hide();
	$(".button").click(submitClicked);	

	$("#submitBtn").click(submitClicked);
	$("#addactivityformbtn").click(addactivityformbtn);
	$(".editGoalButton").click(editGoalClicked);
	
})



/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
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
		$('#message').html("Please enter the name of an activity.");
		return;	
	} else if(!hasTime){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').html("Please enter the amount of time you plan to spend on this activity.");
		console.log("Problem yo");
		return;
	}
	if ((name != "") && (target != "")) {
		//$(".goalList").append('<div class="goal"><h4>' + name + ": " + target + '</h4> <button type="button" class="editGoalButton"><a href="/editindividual">Edit Goal</a></button> </div>');
		var parameters = {'activity': name, 'hours': 0, 'goal': target};
		$.get('/addactivitydata', parameters, writeData);
		//$(".editGoalButton").click(editGoalClicked);
		//$(".deleteGoalButton").click(deleteGoalClicked);
	
	
	}
	
	/*var newActivity = 
	{
		"activity": name,
		"hours": 0,
		"goal": target
	};
	data["activities"].push(newActivity);*/
}

function checkInput(time){
	if(time == "")
		return false;
	var regexp = /^[0-9]*(.)[0-9]*$/;
    return (time.search(regexp) >= 0) ? true : false;
}

function writeData(results) {
	console.log("STUFF WORKS YAY");
	//$(".goalList").append('<div class="goal"><h4>' + results.activity + ": " + results.goal + ' hrs/week</h4> <button type="button" class="editGoalButton"><a href="/editindividual">Edit Goal</a></button> </div>');
	
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').html('Activity added successfully!');
	
	$(".goalList").append('<div class="well well-sm"> <div class = "well-text"><div class="inline" id="activity">' + results.activity + '</div>: ' + results.goal + ' hrs/week<button type="button" class="editGoalButton">Edit Target</button><div class="goal"></div></div>');
	console.log($(".goalList").length);
	$(".editGoalButton").click(editGoalClicked);
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
	console.log($(this).closest(".well-text").length);
	$('#editForm').remove();
	
	$(this).closest(".well-text").append('<form class ="inline" role="form" id="editForm"><div class="inline time form-group col-sm-"><label class="control-label" for="text"> New Target Hours/week </label><input type="text" id="time" placeholder="0.00"></input></div><a href="#"><button type="button" class="submitGoalButton submitBtn">Submit</button></a><button type="button" class="cancelButton">Cancel Editing</button><br><button type="button" class="deleteGoalButton">Delete Target</button></form>');
	$(".deleteGoalButton").click(deleteGoalClicked);
	$(".cancelButton").click(cancelClicked);
	//append a form that asks for name and Target (hrs/week)
	//add a submit button listener
	//when submit button clicked, pluck out the number
	//delete the form
	
	
}

function cancelClicked(e) {
	e.preventDefault();
	$('#editForm').remove();
	
}
