//The address of the API, there is a http so that CORS doesn't block it.
const apiUrl = "http://34.107.6.19:3000/";
//Auth token got and saved in the login/signin part.
const token = localStorage.getItem("token");
//The url to the login/signin page.
// const loginUrl = "file:///home/achudy/studia/WWWiJS/frontend/hello.html";

const loginUrl = "http://34.107.6.19/hello.html";

//List and vars declarations just so they are more accessible.
var partyList = [];
var opponentList = [];
var pcList = [];
var npcList = [];
var currentPartyId = 0;
var currentOpponentsId = 0;
var currentPcId = 0;
var currentNpcId = 0;
var partyIsCurrentlyEdited = true;
var selectedFromPicker = "";

// Checking if there is a token - a user was recently signed in.
$(document).ready(function () {
  if (token == null) {
    window.location.replace(loginUrl);
  }
});

//Logic for clicking the logout button
$(".form-logout").submit(function () {
  event.preventDefault();
  window.location.replace(loginUrl);
  localStorage.removeItem("token");
});

//Defining how a modal should be made
function makeModalGroup(entity, title, placeholder, titleOrFaction) {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="$entity-modal" role="dialog">'.replace(
      "$entity",
      entity
    ) +
    '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
    '<h4 class="modal-title">$title</h4>'.replace("$title", title) +
    '<button type="button" class="close" data-dismiss="modal">&times;</button></div>' +
    '<div class="modal-body"><form id="add-$entity-form">'.replace(
      "$entity",
      entity
    ) +
    '<div class="form-$entity">'.replace("$entity", entity) +
    '<input id="$titleOrFaction"'.replace("$titleOrFaction", titleOrFaction) +
    ' type="text" class="form-control"' +
    'placeholder="$placeholder"'.replace("$placeholder", placeholder) +
    'value=""/></div><div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}
function makeModalCharacter(entity, title) {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="$entity-modal" role="dialog">'.replace(
      "$entity",
      entity
    ) +
    '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
    '<h4 class="modal-title">$title</h4>'.replace("$title", title) +
    '<button type="button" class="close" data-dismiss="modal">&times;</button></div>' +
    '<div class="modal-body"><form id="add-$entity-form">'.replace(
      "$entity",
      entity
    ) +
    '<div class="form-$entity">'.replace("$entity", entity) +
    '<input id="name" type="text" class="form-control"' +
    'placeholder="Name"' +
    'value=""/>' +
    '<input id="ac" type="number" min="-7" class="form-control"' +
    'placeholder="Armor Class"' +
    'value=""/>' +
    '<input id="hp" type="number" class="form-control"' +
    'placeholder="Hit Points"' +
    'value=""/>' +
    '<input id="description" type="text" class="form-control"' +
    'placeholder="Description"' +
    'value=""/>' +
    '</div><div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}
function makeModalEdit() {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="edit-modal" role="dialog">' +
    '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
    '<h4 class="modal-title">Edit:</h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button></div>' +
    '<div class="modal-body"><form id="edit-form">' +
    '<div class="form-edit">' +
    '<input id="name" type="text" class="form-control"' +
    'placeholder="Name"' +
    'value=""/>' +
    '<input id="ac" type="number" min="-7" class="form-control"' +
    'placeholder="Armor Class"' +
    'value=""/>' +
    '<input id="hp" type="number" class="form-control"' +
    'placeholder="Hit Points"' +
    'value=""/>' +
    '<input id="description" type="text" class="form-control"' +
    'placeholder="Description"' +
    'value=""/>' +
    '</div><div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Add" />' +
    "</div></form></div></div></div></div>";
}
function makeModalDelete() {
  document.getElementById("modals").innerHTML +=
    '<div class="modal fade" id="delete-modal" role="dialog">' +
    '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">' +
    '<h4 class="modal-title">Are you sure you want to delete the character?</h4>' +
    '<button type="button" class="close" data-dismiss="modal">&times;</button></div>' +
    '<div class="modal-body"><form id="delete-form">' +
    '<div class="form-delete">' +
    '<div class="form-group">' +
    '<input type="submit" class="btn buttons btn-info" value="Sure, delete" />' +
    "</div></form></div></div></div></div>";
}
makeModalGroup("party", "Add a party:", "Party title", "title");
makeModalGroup(
  "opponent",
  "Add an opposing faction:",
  "Opponent faction name",
  "faction"
);
makeModalCharacter("pc", "Add a player character:");
makeModalCharacter("npc", "Add an NPC:");
makeModalDelete();
makeModalEdit();

//Defining how to get and what to do with got arrays from the API
function ajaxGetGroup(isParties) {
  var endpoint = "";
  var destinationId = "";

  if (isParties) {
    endpoint = "parties";
    destinationId = "partypicker";
  } else {
    endpoint = "opponents";
    destinationId = "opponentpicker";
  }

  $.ajax({
    url: apiUrl + endpoint,
    type: "GET",
    contentType: "application/json",
    dataType: "json",
    headers: {
      Authorization: token,
    },
  })
    .done(function (data) {
      if (isParties) {
        partyList = data;
        data.forEach(function (obj) {
          document.getElementById(destinationId).innerHTML +=
            "<option>" + obj.title + "</option>";
        });
      } else {
        opponentList = data;
        data.forEach(function (obj) {
          document.getElementById(destinationId).innerHTML +=
            "<option>" + obj.faction + "</option>";
        });
      }
    })
    .fail(function (xhr, status, errorThrown) {
      alert(
        "Error in fetching the data. Consider reloading or logging out and in."
      );
    });
}
//Calling the function for both the parties and opponents parts
ajaxGetGroup(true);
ajaxGetGroup(false);

//Defining how to get and what to do with got arrays of character items from the API
function displayBasedOnPicker(isParties) {
  var pickerId = "";
  if (isParties) {
    pickerId = "#partypicker";
  } else {
    pickerId = "#opponentpicker";
  }
  $(pickerId).on("change", function () {
    getAndDisplayCards(isParties);
  });
}

//Calling the function for both the pc and npc parts
displayBasedOnPicker(true);
displayBasedOnPicker(false);

//Logic for adding parties
$("#add-party-form").submit(function () {
  event.preventDefault();
  $.ajax({
    url: apiUrl + "parties",
    type: "POST",
    data: {
      title: $(".form-party #title").val(),
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      location.reload();
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

//Logic for adding opponents
$("#add-opponent-form").submit(function () {
  event.preventDefault();
  $.ajax({
    url: apiUrl + "opponents",
    type: "POST",
    data: {
      faction: $(".form-opponent #faction").val(),
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      location.reload();
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

//Logic for adding pc-s
$("#add-pc-form").submit(function () {
  event.preventDefault();
  $.ajax({
    url: apiUrl + "parties/" + currentPartyId + "/player_characters",
    type: "POST",
    data: {
      name: $(".form-pc #name").val(),
      ac: $(".form-pc #ac").val(),
      hp: $(".form-pc #hp").val(),
      description: $(".form-pc #description").val(),
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      ajaxGetGroup(true);
      getAndDisplayCards(true);
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

//Logic for adding npc-s
$("#add-npc-form").submit(function () {
  event.preventDefault();
  $.ajax({
    url: apiUrl + "opponents/" + currentOpponentsId + "/non_player_characters",
    type: "POST",
    data: {
      name: $(".form-npc #name").val(),
      ac: $(".form-npc #ac").val(),
      hp: $(".form-npc #hp").val(),
      description: $(".form-npc #description").val(),
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      ajaxGetGroup(false);
      getAndDisplayCards(false);
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

//Logic for editing entities
$("#edit-form").submit(function () {
  var endpointOne = "";
  var endpointTwo = "";
  var editedId = 0;
  var group = 0;
  if (partyIsCurrentlyEdited) {
    endpointOne = "parties/";
    endpointTwo = "/player_characters/";
    editedId = currentPcId;
    group = currentPartyId;
  } else {
    endpointOne = "opponents/";
    endpointTwo = "/non_player_characters/";
    editedId = currentNpcId;
    group = currentOpponentsId;
  }
  event.preventDefault();
  $.ajax({
    url: apiUrl + endpointOne + group + endpointTwo + editedId,
    type: "PATCH",
    data: {
      name: $(".form-edit #name").val(),
      ac: $(".form-edit #ac").val(),
      hp: $(".form-edit #hp").val(),
      description: $(".form-edit #description").val(),
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      getAndDisplayCards(partyIsCurrentlyEdited);
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

//Logic for deleting entities
$("#delete-form").submit(function () {
  var endpointOne = "";
  var endpointTwo = "";
  var editedId = 0;
  var group = 0;
  if (partyIsCurrentlyEdited) {
    endpointOne = "parties/";
    endpointTwo = "/player_characters/";
    editedId = currentPcId;
    group = currentPartyId;
  } else {
    endpointOne = "opponents/";
    endpointTwo = "/non_player_characters/";
    editedId = currentNpcId;
    group = currentOpponentsId;
  }
  event.preventDefault();
  $.ajax({
    url: apiUrl + endpointOne + group + endpointTwo + editedId,
    type: "DELETE",
    headers: {
      Authorization: token,
    },
    success: function (result) {
      getAndDisplayCards(partyIsCurrentlyEdited);
      $('#delete-modal').modal('toggle');
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});

function hpChange(whichWay, partyIsEdited, currentGroupId, objectId, hp) {
  var endpointOne = "";
  var endpointTwo = "";
  var editedId = objectId;
  var group = currentGroupId;
  var newHp = 0;
  var hpChangeAmount=0;
  if (partyIsEdited) {
    endpointOne = "parties/";
    endpointTwo = "/player_characters/";
  } else {
    endpointOne = "opponents/";
    endpointTwo = "/non_player_characters/";
  }
  if($("#$id-hp-changed".replace("$id", objectId)).val()!=null){
    hpChangeAmount = parseInt($("#$id-hp-changed".replace("$id", objectId)).val());
  }
  if (whichWay == "up") {
    newHp = hp + hpChangeAmount;
  } else {
    newHp = hp - hpChangeAmount;
  }
  event.preventDefault();
  $.ajax({
    url: apiUrl + endpointOne + group + endpointTwo + editedId,
    type: "PATCH",
    data: {
      hp: newHp,
    },
    headers: {
      Authorization: token,
    },
    success: function (result) {
      getAndDisplayCards(partyIsEdited);
      $("$id-hp".replace("$id", objectId)).html(newHp);
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
}

function getAndDisplayCards(isParties){
  console.log("ay");
  var pickerId = "";
  var groupList = null;
  var endpoint = "";
  var secondEnpoint = "";
  var innerId = "";
  var containerClass = "";
  var modalId = "";
  if (isParties) {
    pickerId = "#partypicker";
    endpoint = "parties/";
    secondEnpoint = "/player_characters";
    innerId = "characters";
    containerClass = "pc-container";
    modalId = "pc";
  } else {
    pickerId = "#opponentpicker";
    endpoint = "opponents/";
    secondEnpoint = "/non_player_characters";
    innerId = "opponents";
    containerClass = "npc-container";
    modalId = "npc";
  }
  if (isParties) {
    groupList = partyList;
    selectedFromPicker = $("#partypicker").val();
  } else {
    groupList = opponentList;
    selectedFromPicker = $("#opponentpicker").val();
  }
  groupList.forEach(function (obj) {
    var objectToCompare = null;
    if (isParties) {
      objectToCompare = obj.title;
      console.log(obj.title+"gggg");
    } else {
      objectToCompare = obj.faction;
      console.log(obj.faction+"gg");
    }
    if (objectToCompare == selectedFromPicker) {
      if (isParties) {
        currentPartyId = obj.id;
      } else {
        currentOpponentsId = obj.id;
      }
      $.ajax({
        url: apiUrl + endpoint + obj.id + secondEnpoint,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        headers: {
          Authorization: token,
        },
      })
        .done(function (data) {
          document.getElementById(innerId).innerHTML = "";
          data.forEach(function (obj) {
            document.getElementById(innerId).innerHTML +=
              "<div class='$containerClass'>".replace(
                "$containerClass",
                containerClass
              ) +
              '<button id="$id-delete" style="padding:1%;" type="button" class="close" data-toggle="modal" '.replace(
                "$id",
                obj.id
              ) +
              'data-target="#delete-modal">&times;</button>' +
              '<button id="$id" type="button" class="close" data-toggle="modal" '.replace(
                "$id",
                obj.id
              ) +
              'data-target="#edit-modal">&hellip;</button>' +
              "<h4><strong>$name</strong></h4>".replace("$name", obj.name) +
              "<p>Description: <strong>$description</strong></p>".replace(
                "$description",
                obj.description
              ) +
              "<p>AC: <strong>$ac</strong></p>".replace("$ac", obj.ac) +
              "<p>" +
              "HP: <strong id='$id-hp'>".replace("$id", obj.id)+
              '$hp</strong></p>'.replace("$hp", obj.hp) +
              '<input id="$id-hp-changed"'.replace("$id",obj.id) +
              'type="number" placeholder="HP change" style="margin-right:3%;border-radius:.25rem;width:30%;"></input>'+
              '<button id="$id-up" type="button" class="btn experiment" style="padding:1%;"'.replace(
                "$id",
                obj.id
              ) +
              ">&uArr;</button>" +
              '<button id="$id-down" type="button" class="btn experiment" style="padding:1%;"'.replace(
                "$id",
                obj.id
              ) +
              ">&dArr;</button></div>" +
              '</div>'+

              
              // '<form class="form-inline">'+
              // '<div class="form-group mx-sm-3 mb-2">'
              // '<input id="$id-plus-hp" type="number" class="form-control"'.replace("$id", obj.id) +
              // ' placeholder="11"' +
              // ' value=""/>'+
              // '</div><div class="btn-group" role="group" aria-label="Basic example">'+
              // '<button id="$id-up" type="button" class="btn btn-secondary experiment"'.replace(
              //   "$id",
              //   obj.id
              // ) +
              // 'style="padding:1%;">&uArr;</button>' +
              // '<button id="$id-down" type="button" class="btn btn-secondary experiment" style="padding:1%;"'.replace(
              //   "$id",
              //   obj.id
              // ) +
              // ">&dArr;</button></div>" +
              // // '<input id="$id-minus-hp" type="number" '.replace("$id", obj.id) +
              // // 'class="form-control" placeholder="11"' +
              // // 'style="width: 50%;" value=""/>'+
              // "</form>"+
              "</div>";
            $(document).on(
              "click",
              "#$id".replace("$id", obj.id),
              function () {
                $(".form-edit #name").val(obj.name);
                $(".form-edit #ac").val(obj.ac);
                $(".form-edit #hp").val(obj.hp);
                $(".form-edit #description").val(obj.description);
              }
            );
            $(document).on(
              "click",
              "#$id-up".replace("$id", obj.id),
              function () {
                if (isParties) {
                  partyIsCurrentlyEdited = true;
                  hpChange(
                    "up",
                    partyIsCurrentlyEdited,
                    currentPartyId,
                    obj.id,
                    obj.hp
                  );
                } else {
                  partyIsCurrentlyEdited = false;
                  hpChange(
                    "up",
                    partyIsCurrentlyEdited,
                    currentOpponentsId,
                    obj.id,
                    obj.hp
                  );
                }
                
              }
            );
            $(document).on(
              "click",
              "#$id-down".replace("$id", obj.id),
              function () {
                if (isParties) {
                  partyIsCurrentlyEdited = true;
                  hpChange(
                    "down",
                    partyIsCurrentlyEdited,
                    currentPartyId,
                    obj.id,
                    obj.hp
                  );
                } else {
                  partyIsCurrentlyEdited = false;
                  hpChange(
                    "down",
                    partyIsCurrentlyEdited,
                    currentOpponentsId,
                    obj.id,
                    obj.hp
                  );
                }
              }
            );
            $(document).on(
              "click",
              "#$id".replace("$id", obj.id),
              function () {
                if (isParties) {
                  currentPcId = obj.id;
                  partyIsCurrentlyEdited = true;
                } else {
                  currentNpcId = obj.id;
                  partyIsCurrentlyEdited = false;
                }
              }
            );
            $(document).on(
              "click",
              "#$id-delete".replace("$id", obj.id),
              function () {
                if (isParties) {
                  currentPcId = obj.id;
                  partyIsCurrentlyEdited = true;
                } else {
                  currentNpcId = obj.id;
                  partyIsCurrentlyEdited = false;
                }
              }
            );
          });
          document.getElementById(innerId).innerHTML +=
            "<div>" +
            '<button id="$id-btn"'.replace("$id", modalId) +
            'type="button" class="btn btn-info" data-toggle="modal"' +
            'data-target="#$id-modal">'.replace("$id", modalId) +
            "Create new" +
            "</button>" +
            "</div>";
        })
        .fail(function (xhr, status, errorThrown) {
          alert(
            "Error in fetching the data. Consider reloading or logging out and in."
          );
        });
    }
  });
}