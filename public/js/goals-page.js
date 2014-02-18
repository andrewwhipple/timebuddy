'use strict';

//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

$(".button").click(submitClicked);	
/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
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
	
	$(".goalList").append('<div class="well well-sm"> <div class = "well-text">' + results.activity + ': ' + results.goal + ' hrs/week</div></div>');
	console.log($(".goalList").length);
}


function deleteGoalClicked(e) {
	e.preventDefault();
	$(this).closest(".goal").remove();
		
}

function editGoalClicked(e) {
	e.preventDefault();
	console.log("CLICKED SON");
	//append a form that asks for name and Target (hrs/week)
	//add a submit button listener
	//when submit button clicked, pluck out the number
	//delete the form
	var target = "0";
	var name = "Sleep";
	$(this).closest(".goal").html('<div class="goal"><h3>' + name + ": " + target + '</h3> <button type="button" class="editGoalButton">Edit Goal</button> <button type="button" class="deleteGoalButton">Delete Goal</button> </div>');
	//replace the html w/ the same, but a new "target"

	$(".editGoalButton").click(editGoalClicked);
	$(".deleteGoalButton").click(deleteGoalClicked);	
	
}
