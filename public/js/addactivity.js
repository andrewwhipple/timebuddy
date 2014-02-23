'use strict';

//var data = require('../data.json');

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	console.log("in the addactivitydata");
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript!");
	$(".button").click(submitClicked);	
}




function submitClicked(e) {
	console.log("CLICKED");
	e.preventDefault();
	var name = $("#name").val();
	var target = $("#target").val();
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

function writeData(results) {
	console.log("STUFF WORKS YAY");
	
	
}
