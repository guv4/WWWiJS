//This script provides the main functionalities

//Placing a listener on a div to further determine if currently worked on
//are the parties or the opponents.
let isParties = null;
determineIsParties();

//List and id declarations just so they are 
//more accessible later in this script.
let partyList = [];
let opponentList = [];
let currentPartyId = 0;
let currentOpponentsId = 0;
let currentPcId = 0;
let currentNpcId = 0;

//Calling the function for the initial array of both groups
//and setting them in the html selectpicker.
getGroup(true, true);
getGroup(false, true);

//Places the listeners on picker group changes.
displayBasedOnPicker();

//Defining how to get and what to do with got arrays from the API
function getGroup(isParties, isSupposedToChangeThePicker) {
  let endpoint = isParties ? "parties" : "opponents";
  let destinationId = isParties ? "partypicker" : "opponentpicker";
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
      $("#" + destinationId).html("<option>Choose one:</option>");
      isParties ? (partyList = data) : (opponentList = data);
      if (isSupposedToChangeThePicker) {
        data.forEach(function (obj) {
          let input = isParties ? obj.title : obj.faction;
          document.getElementById(destinationId).innerHTML +=
            "<option>" + input + "</option>";
        });
      }
    })
    .fail(function () {
      let message = "Error in fetching the data.";
      message += "Consider reloading or logging out and in.";
      alert(message);
    });
}

//The function places a listener on both pickers
//to display/change group characters accordingly
//to the chosen group in the picker.
function displayBasedOnPicker() {
  $("#partypicker").on("change", function () {
    getAndDisplayCards(true);
  });
  $("#opponentpicker").on("change", function () {
    getAndDisplayCards(false);
  });
}

//Determines which cards are to be displayed and sends a GET
//and with the got data - creates the cards, displays, places listeners 
//on appropriate buttons.
function getAndDisplayCards(isParties) {
  let pickerId = isParties ? "#partypicker" : "#opponentpicker";
  let selectedFromPicker = $(pickerId).val();
  let groupList = isParties ? partyList : opponentList;
  let endpoint = isParties ? "parties/" : "opponents/";
  let secondEnpoint = isParties
    ? "/player_characters"
    : "/non_player_characters";
  let innerId = isParties ? "characters" : "opponents";
  let containerClass = isParties ? "pc-container" : "npc-container";
  let modalId = isParties ? "pc" : "npc";

  groupList.forEach(function (obj) {
    let objectToCompare = isParties ? obj.title : obj.faction;
    if (objectToCompare == selectedFromPicker) {
      isParties ? (currentPartyId = obj.id) : (currentOpponentsId = obj.id);
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
          $("#" + innerId).html("");
          data.forEach(function (obj) {
            createSingularPlayerCard(innerId, containerClass, obj);
            fillEditModalWithValuesOnClick(obj);
            placeListenerOnHpClick(obj, "up");
            placeListenerOnHpClick(obj, "down");
          });
          createAddEntityButton(innerId, modalId);
        })
        .fail(function () {
          let message = "Error in fetching the data. ";
          message += "Consider reloading or logging out and in.";
          alert(message);
        });
    }
  });
}

//Makes a singular card with object data got from the API.
function createSingularPlayerCard(innerId, containerClass, obj) {
  document.getElementById(innerId).innerHTML +=
    '<div class="$containerClass">'.replace("$containerClass", containerClass) +
    '<button id="$id-delete" '.replace("$id", obj.id) +
    'style="padding:1%;" type="button" class="close" data-toggle="modal" ' +
    'data-target="#delete-modal">&times;</button>' +
    '<button id="$id-edit" '.replace("$id", obj.id) +
    'type="button" class="close" data-toggle="modal" ' +
    'data-target="#edit-modal">&hellip;</button>' +
    "<h4><strong>$name</strong></h4>".replace("$name", obj.name) +
    "<p>Description: " +
    "<strong>$description</strong>".replace("$description", obj.description) +
    "</p>" +
    "<p>AC: <strong>$ac</strong></p>".replace("$ac", obj.ac) +
    '<p>HP: <strong id="$id-hp">'.replace("$id", obj.id) +
    "$hp</strong></p>".replace("$hp", obj.hp) +
    '<input id="$id-hp-changed"'.replace("$id", obj.id) +
    'type="number" placeholder="HP change" ' +
    'style="margin-right:3%;border-radius:.25rem;width:40%;"></input>' +
    '<button id="$id-up" '.replace("$id", obj.id) +
    'type="button" class="btn experiment" style="padding:1%;">&uArr;</button>' +
    '<button id="$id-down" '.replace("$id", obj.id) +
    'type="button" class="btn experiment" style="padding:1%;">&dArr;</button>' +
    "</div></div></div>";
    $(document).on("click", "#$id-delete".replace("$id", obj.id), function () {
      isParties ? currentPcId = obj.id : currentNpcId = obj.id;
    });
    $(document).on("click", "#$id-edit".replace("$id", obj.id), function () {
      isParties ? currentPcId = obj.id : currentNpcId = obj.id;
    });
}

//Fills up the edit modal with existing values of a particular object.
function fillEditModalWithValuesOnClick(obj) {
  $(document).on("click", "#$id-edit".replace("$id", obj.id), function () {
    $(".form-edit #name").val(obj.name);
    $(".form-edit #ac").val(obj.ac);
    $(".form-edit #hp").val(obj.hp);
    $(".form-edit #description").val(obj.description);
  });
}

//Listens to a click on up and down arrows, calls a function changing HP.
function placeListenerOnHpClick(obj, direction) {
  let buttonId = direction == "up" ? "#$id-up" : "#$id-down";
  $(document).on("click", buttonId.replace("$id", obj.id), function () {
    let currentId = isParties ? currentPartyId : currentOpponentsId;
    let hp = parseInt($("#$id-hp".replace("$id", obj.id)).html());
    hpChange(direction, isParties, currentId, obj.id, hp);
  });
}

//Creates a specific add button below the cards.
function createAddEntityButton(innerId, modalId) {
  document.getElementById(innerId).innerHTML +=
    "<div>" +
    '<button id="$id-btn"'.replace("$id", modalId) +
    'type="button" class="btn btn-info" data-toggle="modal"' +
    'data-target="#$id-modal">'.replace("$id", modalId) +
    "Create new $id".replace("$id", modalId.toUpperCase()) +
    "</button>" +
    "</div>";
}

//Any click on a div results in a change of the boolean isParties
function determineIsParties() {
  $(document).on("click", "#main-party-div", function () {
    isParties = true;
  });
  $(document).on("click", "#main-opponent-div", function () {
    isParties = false;
  });
}
