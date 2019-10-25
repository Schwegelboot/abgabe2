var currentListId = "5d9a21b50f5da70017537715";
var apiKey = "tbd";


$(document).ready(function () {
    $('#bt1').click(function (){
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId, function(data,status){
            $('#liste').append("<h1>"+data.name+"</h1>" + "<br>");
            data.items.forEach(element => {
                listElement= "<p>"+element.name+"</p>";
                $('#liste').append(listElement);
            });
        })
    });
})

$(document).ready(function () {
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId, function(data,status){
            $('#listen').append("<p class=listenname>"+data.name+"</p>" + "<br>");
        })
})
/*
$(document).ready(function () {
    $.post("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items", {name: elementToAdd}, function(data,status){
        $('#listen').append("<p class=listenname>"+data.name+"</p>" + "<br>");
    })
})*/

$("#btnAddElement").click(function(){
    var elementToAdd = $("#elementToAdd").val();
    var body = "{'name': '" + elementToAdd + "'}";
    $.post("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items", body, function(status){
       createElement(status,elementToAdd);
       console.log("1 "+ elementToAdd + " status: " + status)
    });
});
/*
$("#btnAddElement").post("https://shopping-lists-api.herokuapp.com/api/v1/lists/" + currentListId + "/items", {name: $("#elementToAdd").val()}, function(status){
    createElement(status,elementToAdd);
    console.log("1 "+ elementToAdd + " status: " + status)
 });
  */  

function createElement(status,elementToAdd){
    console.log("1 "+ elementToAdd + " status: " + status)
    if(status==200){
        var div=$("<div class='element'> " +
        "<form action='/action_page.php' class='formInlineBlock marginZero'> "+
             "<div class='form-group form-check-inline container-fluid marginZero'> "+
                 "<input type='text' class='form-control' id='usr' name='username' value=" + elementToAdd + " disabled> " +
                 "<label class='form-check-label' for='check1' style='padding: 1em'> "+
                     "<input type='checkbox' class='form-check-input' id='check1' name='vehicle1' unchecked> "+
                 "</label>" +
                 "<button type='submit' class='btn btn-primary' style='padding-left: 1em'>Löschen</button> "+
             "</div> " +
             "</form> " +
         "</div>");
        $("#elementList").after(div);
       }
       else{
        $( "#dialog" ).dialog({
            dialogClass: "close",
            buttons: [
              {
                text: "Not OK",
                click: function() {
                  $( this ).dialog( "close" );
                }
              }
            ]
          });
       }
}
    
    


















/*
$(document).ready(function () {
    $('#openlist').click(function (){
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715, function(data,status){
                data.items.forEach(element => {
                
                listElement= "<p>"+element.name+"</p>";

                $('#elemente').append(listElement);
            });
        })
    });
})



$(document).ready(function(){
    $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715", function(data,status){
    list.forEach(element)
        document.getElementById().append(
    
    createListElementUI(daten){
        var HtmlElement;
        HtmlElement="<div>
                        <p>"+daten.name+"</p>
                        <p>"+daten.flag+"</p>
                    </div>";



    }
        





    }
})*/