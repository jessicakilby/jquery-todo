"use strict";

let input = $("#input");
let todo = $("#todo");
var submit = $("#submit");

$(document).ready(function(){

	$( submit ).on( "click", function(event) {
		event.preventDefault();
		let output = `<div>${input.val()}<input type="checkbox"></input></div>`;
		todo.append(output);
	});

});
