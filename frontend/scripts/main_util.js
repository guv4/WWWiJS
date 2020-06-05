//This script provides various utility funcitons.

//Assigning nulls to values of a form so that
//the next time the modal is toggled, there are no
//lingering values of a previous character.
function clearTheCharacterModal(formBodyClass) {
  $(formBodyClass + " #name").val(null);
  $(formBodyClass + " #ac").val(null);
  $(formBodyClass + " #hp").val(null);
  $(formBodyClass + " #description").val(null);
}

//Assigning a null to a value of a form so that
//the next time the modal is toggled, there is
//no lingering value.
function clearTheGroupModal(formBodyClass) {
  if (formBodyClass == ".form-party") {
    $(formBodyClass + " #title").val(null);
  } else {
    $(formBodyClass + " #faction").val(null);
  }
}

//Quick HP changes are taking the current HP from the entity,
//depending if the up or down button was clicked -
//it adds or substracts the specified amount and sends a PATCH
//with the new value. On a success, it displays updated cards.
function hpChange(whichWay, partyIsEdited, currentGroupId, objectId, hp) {
  event.preventDefault();
  let endpointOne = partyIsEdited ? "parties/" : "opponents/";
  let endpointTwo = partyIsEdited
    ? "/player_characters/"
    : "/non_player_characters/";
  let hpChangeAmount = $("#$id-hp-changed".replace("$id", objectId)).val();

  if (hpChangeAmount != "") {
    hpChangeAmount = parseInt(hpChangeAmount);
    let newHp = whichWay == "up" ? hp + hpChangeAmount : hp - hpChangeAmount;
    $.ajax({
      url: apiUrl + endpointOne + currentGroupId + endpointTwo + objectId,
      type: "PATCH",
      data: {
        hp: newHp,
      },
      headers: {
        Authorization: token,
      },
    })
      .done(function (result) {
        getAndDisplayCards(partyIsEdited);
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
  }
}
