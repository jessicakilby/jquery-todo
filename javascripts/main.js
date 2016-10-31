"use strict";

let input = $("#input");
let todo = $("#todo");
let completedDiv = $("#completedDiv");
let submit = $("#submit");
let messages = [];
let completed = [];

$(document).ready(function(){

	$( submit ).on( "click", function(event) {
		event.preventDefault();
		let output = `<div class="outputDiv"><span>${input.val()}</span>`;
		output += `<input type="checkbox" class="completed">Completed</input>`;
		output += `<button class="btn btn-success edit">Edit</button>`;
		output += `<button class="btn btn-warning deleteBtn">Delete</button></div>`;
		todo.append(output);
		messages.push(output);
		console.log("messages", messages);
	});

	$(document).on('click', '.edit', function(){
	    $("#input").focus();
	    $("#input").val("");
	    let editItem = $("#input").val();
	    console.log($(this).siblings('span').text(editItem));
	});

	$(document).on("click", ".completed", function(){
		//let spanText = $(this).closest('span');
		//console.log("spanText", spanText.text());
		//moved message div from todo to completed
		let moveMessage = $(this).closest('div').remove();
		//completed.push(moveMessage.text());
		completedDiv.append(moveMessage);
		console.log("completed", completed);
	});

	$(document).on("click", '.deleteBtn', function(event){
		$(this).closest('div').remove();
	});


});

