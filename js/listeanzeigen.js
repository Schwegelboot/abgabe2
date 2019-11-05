var currentListId = null;
const apiKey = "fe8791e84351133005762b70d1e38712";

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists",
        headers: { "Authorization": apiKey },
        success: function (data) {
            data.forEach(list => {
                let listNav = list._id + "Nav";
                let listDel = list._id + "Del";
                let div = $("<li id='" + list._id + "' class='nav-item mt-2'>" +
                    "<a id='" + listNav + "' class='nav-link pl-0 text-nowrap d-inline'>" + list.name + "</a>" +
                    "<button id='" + listDel + "' class='btn btn-info btn-lg oi oi-trash float-right' style='padding-left: 1em'></button>" +
                    "<br>" +
                    "</li>");
                $("#listenNav").append(div);
                $("#" + listNav).bind('click', {}, showListClickHandler);
                $("#" + listDel).bind('click', {}, deleteListClickHandler);
            });
        }
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
            let latestElement = elementList.length - 1;
            let elementToCreate = data.items[latestElement];
            createElement(elementToCreate);
        }
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
    $("#elementList").append(div);
    $("#" + btnID).bind('click', {}, deleteElementClickHandler);
    $("#" + checkID).bind('click', {}, checkElementClickHandler);
};

function showListClickHandler(e) {
    e.preventDefault();
    let listID = e.target.parentNode.id;
    $.ajax({
        type: "GET",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listID,
        success: function (data) {
            clearElementList();
            currentListId = data._id;
            $('#hRechts').append("<h2 id='listenUeberschrift'>" + data.name + "</h2>");
            data.items.forEach(element => {
                createElement(element);
            });
        }
    });
}

function clearElementList() {
    $('#hRechts').empty();
    $("#elementList").empty();
}

function deleteElementClickHandler(e) {
    e.preventDefault();
    let elementToDelete = e.target.parentNode.parentNode.parentNode.id;
    $.ajax({
        type: "DELETE",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items/" + elementToDelete,
        headers: { "Authorization": apiKey },
        success: function () {
            $("#" + elementToDelete).remove();
        }
    });
};

function deleteListClickHandler(e) {
    e.preventDefault();
    let listToDelete = e.target.parentNode.id;
    $.ajax({
        type: "DELETE",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + listToDelete,
        headers: { "Authorization": apiKey },
        success: function () {
            if (currentListId == listToDelete) {
                clearElementList();
            }
            $("#" + listToDelete).remove();
        }
    });
};

function checkElementClickHandler(e) {
    e.preventDefault();
    let elementToCheck = e.target.parentNode.parentNode.parentNode.parentNode.id;
    let elementCheckBox = e.target.id;
    let checked = $("#" + elementCheckBox).is(":checked");
    $.ajax({
        type: "PUT",
        url: "https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items/" + elementToCheck,
        data: { bought: checked },
        success: function () {
            $("#" + elementCheckBox).prop('checked', checked);
        }
    });
};