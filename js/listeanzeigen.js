var currentListId = "5d9a21b50f5da70017537715";
const apiKey = "fe8791e84351133005762b70d1e38712";

$(document).ready(function () {
    $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId, function (data, status) {
        $('#listen').append("<a id='listName'><p  class=listenname>" + data.name + "</p></a>" + "<div class='dropdown' class='col-1'>" +
            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>" +
            "</button>" + "<div class='dropdown-menu'>" +
            "<a class='dropdown-item' 'id=dellist' href='#'>Löschen</a>" +
            "<a class='dropdown-item' 'id=showList' href='#'>Anzeigen</a>" +
            "</div>" + "</div");
    });
});

$(document).ready(function () {
    $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId, function (data, status) {
        $('#hRechts').append("<h2 id='listenUeberschrift'>" + data.name + "</h2>");
    });
});

$("#btnAddElement").click(function (e) {
    let elementToAdd = $("#elementToAdd").val();
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "http://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items",
        data: { name: elementToAdd },
        success: function (data) {
            let elementList = data.items;
            let latestElement = elementList.length -1;
            let elementToCreate = data.items[latestElement];
            createElement(elementToCreate);
        }
    });
})

$("#showList").click(function (e) {
    $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId, function (data, status) {
        data.items.forEach(element => {
            createElement(element);
        });
    });
});

function createElement(elementToCreate) {
    let bought = elementToCreate.bought == true ? "checked" : "unchecked";
    let btnID = elementToCreate._id + "Btn";
    let labelID = elementToCreate._id + "Lbl";
    let checkID = elementToCreate._id + "Check";

    let div = $("<div id='" + elementToCreate._id + "'class='element'> " +
        "<form class='formInlineBlock marginZero'> " +
        "<div id='" + labelID + "'  class='form-group form-check-inline container-fluid marginZero'> " +
        "<input type='text' class='form-control' value=" + elementToCreate.name + " disabled> " +
        "<label class='form-check-label' for='" + checkID + "' style='padding: 1em'> " +
        "<input type='checkbox' class='form-check-input' id='" + checkID + "' " + bought + "> " +
        "</label>" +
        "<button id='" + btnID + "' type='submit' class='btn btn-primary' style='padding-left: 1em'>Löschen</button> " +
        "</div> " +
        "</form> " +
        "</div>");
    $("#elementList").after(div);
    $("#"+btnID).bind('click', {}, deleteElementClickHandler);
    $("#"+checkID).bind('click', {}, checkElementClickHandler);
};  

function deleteElementClickHandler (e){
    e.preventDefault();
    let elementToDelete = e.target.parentNode.parentNode.parentNode.id;
    $.ajax({
        type: "DELETE",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items/" + elementToDelete,
        headers: {"Authorization" : apiKey},
        success: function () {
            $("#" + elementToDelete).remove();
        }
    });
};

function checkElementClickHandler (e){
    e.preventDefault();
    let elementToCheck = e.target.parentNode.parentNode.parentNode.parentNode.id;
    let elementCheckBox = e.target.id;
    let checked = $("#" + elementCheckBox).is(":checked");
    $.ajax({
        type: "PUT",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items/" + elementToCheck,
        data: {bought: checked },
        success: function () {
            $("#" + elementCheckBox).prop('checked', checked);
        }
    });
};