'use strict';

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
	if ((name != "") && (target != "")) {
		$(".goalList").append('<div class="goal"><h3>' + name + ": " + target + '</h3> <button type="button" class="editGoalButton"><a href="/editindividual">Edit Goal</a></button> <button type="button" class="deleteGoalButton">Delete Goal</button> </div>');
	
		//$(".editGoalButton").click(editGoalClicked);
		$(".deleteGoalButton").click(deleteGoalClicked);
	
	}
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
