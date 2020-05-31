//The address of the API, there is a http so that CORS doesn't block it.
const apiUrl = "http://34.107.6.19:3000/";
//Auth token got and saved in the login/signin part.
const token = localStorage.getItem("token");
//The url to the login/signin page.
// const loginUrl = "file:///home/achudy/studia/WWWiJS/frontend/hello.html";

const loginUrl = "http://34.107.6.19/hello.html";

//List declarations just so they are more accessible.
var partyList = [];
var opponentList = [];
var pcList = [];
var npcList = [];
var currentPartyId = 0;
var currentOpponentsId = 0;

//Checking if there is a token - a user was recently signed in.
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
    '<input type="submit" class="btn btn-info" value="Add" />' +
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
    '<input id="ac" type="text" class="form-control"' +
    'placeholder="Armor Class"' +
    'value=""/>' +
    '<input id="hp" type="text" class="form-control"' +
    'placeholder="Hit Points"' +
    'value=""/>' +
    '<input id="description" type="text" class="form-control"' +
    'placeholder="Description"' +
    'value=""/>' +
    '</div><div class="form-group">' +
    '<input type="submit" class="btn btn-info" value="Add" />' +
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
  $(pickerId).on("change", function () {
    let selected = this.value;
    if (isParties) {
      groupList = partyList;
    } else {
      groupList = opponentList;
    }
    groupList.forEach(function (obj) {
      var objectToCompare = null;
      if (isParties) {
        objectToCompare = obj.title;
      } else {
        objectToCompare = obj.faction;
      }
      if (objectToCompare == selected) {
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
                "<h4><strong>$name</strong></h4>".replace("$name", obj.name) +
                "<p>AC: <strong>$ac</strong></p>".replace("$ac", obj.ac) +
                "<p>HP: <strong>$hp</strong></p>".replace("$hp", obj.hp) +
                "<p>Description: <strong>$description</strong></p>".replace(
                  "$description",
                  obj.description
                ) +
                "</div>";
            });
            document.getElementById(innerId).innerHTML +=
              "<div>" +
              '<button type="button" class="btn btn-info" data-toggle="modal"' +
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
      location.reload();
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
      location.reload();
    },
    error: function (error) {
      if (error.status === 422) {
        alert(error.responseJSON.message);
      }
    },
  });
});
