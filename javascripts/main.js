"use strict";

let input = $("#input");
let todo = $("#todo");
var submit = $("#submit");

$(document).ready(function(){

	$( submit ).on( "click", function(event) {
		event.preventDefault();
		let output = `<div class="outputDiv">${input.val()}`;
		output += `<button class="btn btn-success">Edit</button>`;
		output += `<button class="btn btn-warning">Delete</button></div>`;
		todo.append(output);
	});

});
