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
	console.log("where Am I");
	var name = $("#name").val();
	console.log("heres the name");
	console.log(name);
	var target = $("#target").val();
	if ((name != "") && (target != "")) {
		//$(".goalList").append('<div class="goal"><h4>' + name + ": " + target + '</h4> <button type="button" class="editGoalButton"><a href="/editindividual">Edit Goal</a></button> </div>');
		var parameters = {'activity': name, 'hours': 0, 'goal': target};
		console.log("its happenening.");
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

	$("#targetsdiv").append("<div class='row activity well well-sm' id='"+name+"''>"
		+"<div class='well-text inline activityname'> "+name+"</div>"
		+"<div  class='inline' id='timespent'><em> 0 / "+target+"hrs </em></div><div class='progress'>"
		+"<div id='progress_bar' class='progress-bar' role='progressbar'>"+
		"</div></div><div class='inline addhours' ><form class ='inline' role='form'> "
		+"<div class='inline time form-group float-right'><span class='glyphicon glyphicon-time' ></span>"
		+"<a href='#'><span class='glyphicon glyphicon-minus submitBtn' id ='minusBtn'></span></a>"
		+"<input type='text' id='time' maxlength='4' size='4' placeholder='(hrs)'></input>"
		+"<a href='#'><span class='glyphicon glyphicon-plus submitBtn' id='plusBtn'></span></a>"
		+"<input type='hidden' id='hoursspent' value='0'/></div> </form></div></div>");

}
