//This is a part where essential consts are defined,
//and html building that is better to be scripted than
//written explicitly.

//The address of the API, there is a http so that CORS doesn't block it.
const apiUrl = "http://34.107.6.19:3000/";
// const apiUrl = "http://localhost:3000/";

//The url to the login/signin page.
//Change the line below if running on localhost.
// const loginUrl = "file://";
const loginUrl = "http://34.107.6.19/hello.html";

//Auth token got and saved in the login/signin part.
const token = localStorage.getItem("token");

// Checking if there is a token - a user was recently logged in.
//If there is no token - the page is replaced with the hello page.
$(document).ready(function () {
  if (token == null) {
    window.location.replace(loginUrl);
  }
});

//HTML appends to make modals, the functions are declared below.
makeModalGroup("party");
makeModalGroup("opponent");
makeModalCharacter("pc");
makeModalCharacter("npc");
makeModalDelete();
makeModalEdit();

//This part are definitions of modals for future use when clicking buttons.

//Modal definition for adding parties and opponent groups
function makeModalGroup(entity) {
  let creatingAParty = entity == "party" ? true : false;
  let title = creatingAParty ? "Add a party:" : "Add an opposing faction:";
  let placeholder = creatingAParty ? "Party title" : "Opponent faction name";
  let titleOrFaction = creatingAParty ? "title" : "faction";
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="$entity-modal"'.replace("$entity", entity) +
    ' role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h4 class="modal-title">$title</h4>'.replace("$title", title) +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    "</div>" +
    '<div class="modal-body">' +
    '<form id="add-$entity-form">'.replace("$entity", entity) +
    '<div class="form-$entity">'.replace("$entity", entity) +
    '<input id="$titleOrFaction"'.replace("$titleOrFaction", titleOrFaction) +
    ' type="text" maxlength="50" class="form-control"' +
    'placeholder="$placeholder"'.replace("$placeholder", placeholder) +
    'value=""/>' +
    "</div>" +
    '<div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}

//Modal definition for adding player characters and npc-s
function makeModalCharacter(entity) {
  let creatingAPc = entity == "pc" ? true : false;
  let title = creatingAPc ? "Add a player character:" : "Add an NPC:";
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="$entity-modal"'.replace("$entity", entity) +
    ' role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h4 class="modal-title">$title</h4>'.replace("$title", title) +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    "</div>" +
    '<div class="modal-body">' +
    '<form id="add-$entity-form">'.replace("$entity", entity) +
    '<div class="form-$entity">'.replace("$entity", entity) +
    '<input id="name" type="text" class="form-control"' +
    ' placeholder="Name" maxlength="50" value=""/>' +
    '<input id="ac" type="number" min="-7" max="100" class="form-control"' +
    'placeholder="Armor Class" value=""/>' +
    '<input id="hp" type="number" min="1" max="1024" class="form-control"' +
    'placeholder="Hit Points" value=""/>' +
    '<input id="description" type="text" class="form-control"' +
    'placeholder="Description" value=""/>' +
    "</div>" +
    '<div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}

//Modal definitions for editing players and npcs
function makeModalEdit() {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="edit-modal" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h4 class="modal-title">Edit:</h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    "</div>" +
    '<div class="modal-body">' +
    '<form id="edit-form">' +
    '<div class="form-edit">' +
    '<input id="name" type="text" class="form-control"' +
    'placeholder="Name" maxlength="50" value=""/>' +
    '<input id="ac" type="number" min="-7" max="100" class="form-control"' +
    'placeholder="Armor Class" value=""/>' +
    '<input id="hp" type="number" class="form-control"' +
    'placeholder="Hit Points" min="-300" max="1024" value=""/>' +
    '<input id="description" type="text" class="form-control"' +
    'placeholder="Description" value=""/>' +
    "</div>" +
    '<div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}

//Modal definitions for deleting players and npcs
function makeModalDelete() {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="delete-modal" role="dialog">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h4 class="modal-title">Are you sure you want to delete the character?</h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
    "</div>" +
    '<div class="modal-body">' +
    '<form id="delete-form">' +
    '<div class="form-delete">' +
    '<div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Sure, delete" />' +
    "</div></div></form></div></div></div></div>";
}
