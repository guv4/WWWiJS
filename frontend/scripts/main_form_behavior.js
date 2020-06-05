//This script specifies what to do when certain forms are submitted.

//When clicking the logout button, it goes to the login screen
//and removes the token from memory
$(".form-logout").submit(function () {
  event.preventDefault();
  window.location.replace(loginUrl);
  localStorage.removeItem("token");
});

//Submitting an add-party form sends a POST with a title,
//on a success from the API, it sends a GET to update
//the list of available parties. Clears and closes the modal too.
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
  })
    .done(function (result) {
      clearTheGroupModal(".form-party");
      $("#party-modal").modal("toggle");
      getGroup(true, true);
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});

//Submitting an add-opponent form sends a POST with a faction,
//on a success from the API, it sends a GET to update
//the list of available opponent groups. Clears and closes the modal too.
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
  })
    .done(function (result) {
      clearTheGroupModal(".form-opponent");
      $("#opponent-modal").modal("toggle");
      getGroup(false, true);
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});

//When add player character submitted,
//it sends a post with values of the form
//and on a success, it displays got player data in cards
//as well as clears and closes the modal.
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
  })
    .done(function (result) {
      clearTheCharacterModal(".form-pc");
      $("#pc-modal").modal("toggle");
      getAndDisplayCards(true);
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});

//When add non player character submitted,
//it sends a post with values of the form
//and on a success, it displays got npc data in cards
//as well as clears and closes the modal.
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
  })
    .done(function (result) {
      clearTheCharacterModal(".form-npc");
      $("#npc-modal").modal("toggle");
      getAndDisplayCards(false);
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});

//When submitting the edit form, depending on whether it
//was called on a pc or npc (@isParties)
//it sends a PATCH with changed values to the appropriate
//endpoint and and displays changed values in the cards
//as well as clears and closes the modal.
$("#edit-form").submit(function () {
  event.preventDefault();
  //Endpoint assignment with ternary because it takes less space than an if.
  let endpointOne = isParties ? "parties/" : "opponents/";
  let groupId = isParties ? currentPartyId : currentOpponentsId;
  let endpointTwo = isParties
    ? "/player_characters/"
    : "/non_player_characters/";
  let entityId = isParties ? currentPcId : currentNpcId;
  $.ajax({
    url: apiUrl + endpointOne + groupId + endpointTwo + entityId,
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
  })
    .done(function (result) {
      clearTheCharacterModal(".form-edit");
      $("#edit-modal").modal("toggle");
      getAndDisplayCards(isParties);
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});

//When submitting the delete form, depending on whether it
//was called on a pc or npc (@isParties)
//it sends a DELETE to the appropriate
//endpoint and displays updated cards
//as well as closes the modal.
$("#delete-form").submit(function () {
  event.preventDefault();
  //Endpoint assignment with ternary because it takes less space than an if.
  let endpointOne = isParties ? "parties/" : "opponents/";
  let groupId = isParties ? currentPartyId : currentOpponentsId;
  let endpointTwo = isParties
    ? "/player_characters/"
    : "/non_player_characters/";
  let entityId = isParties ? currentPcId : currentNpcId;
  $.ajax({
    url: apiUrl + endpointOne + groupId + endpointTwo + entityId,
    type: "DELETE",
    headers: {
      Authorization: token,
    },
  })
    .done(function (result) {
      getAndDisplayCards(isParties);
      $("#delete-modal").modal("toggle");
    })
    .fail(function (error) {
      if (error.status == 422) {
        alert(error.responseJSON.message);
      } else {
        alert(
          "There was an unfortunate error. Please wait a while and reload."
        );
      }
    });
});
