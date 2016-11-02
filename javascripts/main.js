"use strict";

let apiKeys = {};
let uid = "";

function putTodoInDOM (){
  FbAPI.getTodos(apiKeys, uid).then(function(items){
      console.log("items from FB", items);
      $("#completed-tasks").html("");
      $("#incomplete-tasks").html("");
      items.forEach(function(item){
        if(item.isCompleted === true){
          let newListItem = `<li data-completed="${item.isCompleted}">`;
          newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
          newListItem+='<input class="checkboxStyle" type="checkbox" checked>';
          newListItem+=`<label class="inputLabel">${item.task}</label>`;
          newListItem+='</div>';
          newListItem+='</li>';
          //apend to list
          $('#completed-tasks').append(newListItem);
        } else {
          let newListItem = `<li data-completed="${item.isCompleted}">`;
          newListItem+=`<div class="col-xs-8" data-fbid="${item.id}">`;
          newListItem+='<input class="checkboxStyle" type="checkbox">';
          newListItem+=`<label class="inputLabel">${item.task}</label>`;
          newListItem+='<input type="text" class="inputTask">';
          newListItem+='</div>';
          newListItem+='<div class="col-xs-4">';
          newListItem+=`<button class="btn btn-default col-xs-6 edit" data-fbid="${item.id}">Edit</button>`;
          newListItem+=`<button class="btn btn-danger col-xs-6 delete" data-fbid="${item.id}">Delete</button> `;
          newListItem+='</div>';
          newListItem+='</li>';
          //apend to list
          $('#incomplete-tasks').append(newListItem);
        }

      });
    });
}

$(document).ready(function(){
	FbAPI.firebaseCredentials().then(function(keys){
		console.log("keys", keys);
		apiKeys = keys;
		firebase.initializeApp(apiKeys);
	});

	$("#submit").on("click", function(){
		let newItem = {
			"task": $("#input").val(),
			"isCompleted": false
		};
		FbAPI.addTodo(apiKeys, newItem).then(function(){
			putTodoInDOM();
		});
	});


	$('ul').on("click", ".delete", function(){
		let itemId = $(this).data("fbid");
		FbAPI.deleteTodo(apiKeys, itemId).then(function(){
			putTodoInDOM();
		});
	});

	$('ul').on("click", ".edit", function(){
		let parent = $(this).closest("li");
		if(!parent.hasClass("editMode")){
			parent.addClass("editMode");
		} else {
			let itemId = $(this).data("fbid");
			let editedItem = {
				"task": parent.find(".inputTask").val(),
				"isCompleted": false
			};
			FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(response){
			parent.removeClass("editMode");
			putTodoInDOM();	
			});
			//firebase stuff
		}
	});

	$('ul').on("change", "input[type='checkbox']", function(){
		let updatedIsCompleted = $(this).closest('li').data("completed");
		let itemId = $(this).parent().data("fbid");
		let task = $(this).siblings(".inputLabel").html();

		let editedItem = {
			"task": task,
			"isCompleted": !updatedIsCompleted
		};
		FbAPI.editTodo(apiKeys, itemId, editedItem).then(function(){
			putTodoInDOM();
		});
	});

	$("#registerButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let user = {
			"email": email,
			"password": password
		};

		FbAPI.registerUser(user).then(function(response){
			console.log("register response", response);
			return FbAPI.loginUser(user);
		}).then(function(loginResponse){
			console.log("loginResponse", loginResponse);
			uid = loginResponse.uid;
			putTodoInDOM();
			$("#login-container").addClass("hide");
			$("#todo-container").removeClass("hide");
		});
	});

	$("#loginButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let user = {
			"email": email,
			"password": password
		};
		FbAPI.loginUser(user).then(function(loginResponse){
			uid = loginResponse.uid;
			putTodoInDOM();
			$("#login-container").addClass("hide");
			$("#todo-container").removeClass("hide");
		});
	});

});



// let input = $("#input");
// let todo = $("#todo");
// let completedDiv = $("#completedDiv");
// let submit = $("#submit");
// let messages = [];
// let completed = [];

// $(document).ready(function(){

// 	$( submit ).on( "click", function(event) {
// 		event.preventDefault();
// 		let output = `<div class="outputDiv"><span>${input.val()}</span>`;
// 		output += `<input type="checkbox" class="completed">Completed</input>`;
// 		output += `<button class="btn btn-success edit">Edit</button>`;
// 		output += `<button class="btn btn-warning deleteBtn">Delete</button></div>`;
// 		todo.append(output);
// 		messages.push(output);
// 		console.log("messages", messages);
// 	});

// 	$(document).on('click', '.edit', function(){
// 	    $("#input").focus();
// 	    $("#input").val("");
// 	    let editItem = $("#input").val();
// 	    console.log($(this).siblings('span').text(editItem));
// 	});

// 	$(document).on("click", ".completed", function(){
// 		//let spanText = $(this).closest('span');
// 		//console.log("spanText", spanText.text());
// 		//moved message div from todo to completed
// 		let moveMessage = $(this).closest('div').remove();
// 		//completed.push(moveMessage.text());
// 		completedDiv.append(moveMessage);
// 		console.log("completed", completed);
// 	});

// 	$(document).on("click", '.deleteBtn', function(event){
// 		$(this).closest('div').remove();
// 	});
// });

