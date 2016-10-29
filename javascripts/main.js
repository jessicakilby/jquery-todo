"use strict";

let input = $("#input");
let todo = $("#todo");
let submit = $("#submit");

$(document).ready(function(){

	$( submit ).on( "click", function(event) {
		event.preventDefault();
		let output = `<div class="outputDiv">${input.val()}`;
		output += `<button type="button" class="btn btn-info completed">Completed</button>`;
		output += `<button class="btn btn-success edit">Edit</button>`;
		output += `<button class="btn btn-warning deleteBtn">Delete</button></div>`;
		todo.append(output);
	});

	$(document).on("click", ".completed", function(){
		console.log("hey complete");
	});

	$(document).on("click", ".edit", function(){
		console.log("hey edit");
	});

	$(document).on("click", '.deleteBtn', function(event){
		$(this).closest('div').remove();
	});

// }

});

