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
	toggleAddActivityForm();
}

function toggleAddActivityForm(){

	$( "#addactivityform" ).toggle(function() {
		console.log("here1");
	  $('#addActivity').hide();

	}, function() {
		console.log("here2");
	  $('#addActivity').show();
	  $("#name").val("");
	  $("#target").val("");
	  console.log($("#target"));
	});
}

function submitClicked(e) {
	console.log("CLICKED");
	e.preventDefault();
	var name = $("#name").val();
	console.log("the name is");
	console.log(name);
	var target = $("#target").val();
	var hasTime = checkInput(target);

	if (name == "") {
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').show();
		$('#message').html("Please enter the name of a target.<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		return;	
	} else if(!hasTime){
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').show();
		$('#message').html("Please enter the amount of time you plan to spend on this target.<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		console.log("Problem yo");
		return;
	}
	if ((name != "") && (target != "")) {
		var parameters = {'activity': name, 'hours': 0, 'goal': target};		
		console.log(parameters);
		console.log("about to go");
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

	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').show();
	$('#message').html(results['activity'] +' added successfully!' + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	
	toggleAddActivityForm();
	

	ga("send", "event", "targets", "added", "A");
}

function deleteGoalClicked(e) {
	e.preventDefault();
	console.log("Delete clicked!");
	var name = $(this).closest(".activitydiv").attr('id');
	console.log(name);
	var parameters = {'activity': name};
	$.get('/printDatabase');
	$.get('/deletegoal', parameters, deleteData);
	$.get('/printDatabase');
	$(this).closest(".well-sm").remove();		
}

function deleteData(name) {
	console.log("And now we're here!");
	$('#message').removeClass();
	$('#message').addClass("alert alert-success");

	ga("send", "event", "targets", "deleted");	

	$('#message').show();
	$('#message').html(name + ' removed successfully.' + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});	

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
	  div.find("#time").val("");
	  console.log(div.find("#time"));
	});

	//append a form that asks for name and Target (hrs/week)
	//add a submit button listener
	//when submit button clicked, pluck out the number
	//delete the form
}

function submitGoalClicked(e) {
	e.preventDefault();
	console.log("Submit Goal Clicked!");
	var div = $(this).closest(".editgoaldiv")
	var name = div.attr('id');
	console.log(name);
	var time = div.find("#time").val();
	var hasTime = checkInput(time);
	if (hasTime) {
		var parameters = {'activity': name, 'time': time};
		$.get('/getindivdata', parameters, updateGoal);
		$.get('/editindividual', parameters);
	} else {
		$('#message').removeClass();
		$('#message').addClass("alert alert-warning");
		$('#message').show();
		$('#message').html("Please enter the amount of time you plan to spend on this activity.<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
		return;
	}
}

function updateGoal(results) {
	console.log("UPdate Goal Clicked!");

	$('#message').removeClass();
	$('#message').addClass("alert alert-success");
	$('#message').show();
	$('#message').html(results['activity'] + ' changed to ' + results['newTarget'] + 'hrs.' + "<button type='button' class='close'>&times;</button>");
		$('.close').click(function () {
    		$('#message').hide();
		});
	$('#editForm').remove();

	var activitydiv = $("[id='"+results['activity']+"']");
	console.log(activitydiv);
	$(activitydiv).find("#target").text(results['newTarget']);

	var div = activitydiv.find(".editgoaldiv");
	var form = div.find(".editgoalform");
	
	console.log(div);
	console.log(form);

	toggleEditGoalForm(div, form);

	ga("send", "event", "targets", "updated");
}

function cancelClicked(e) {
	e.preventDefault();
	console.log("in cancelClicked");


	var div = $(this).closest(".editgoaldiv");
	var form = div.find(".editgoalform");
	
	console.log(div);
	console.log(form);

	toggleEditGoalForm(div, form);
}

function toggleEditGoalForm(div, form){


	$( div ).toggle(function() {
		console.log("here1 in toggleEditGoalForm");
	  $(form).hide();
	}, function() {
		console.log("here2 in toggleEditGoalForm");
	  $(form).show();
	  div.find("#time").val("");
	  console.log(div.find("#time"));
	});
}
