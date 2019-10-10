$(document).ready(function () {
    $('#bt1').click(function (){
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715", function(data,status){
            $('#liste').append("<h1>"+data.name+"</h1>" + "<br>");
            data.items.forEach(element => {
                listElement= "<p>"+element.name+"</p>";
                $('#liste').append(listElement);
            });
        })
    });
})

$(document).ready(function () {
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715", function(data,status){
            $('#listen').append("<p class=listenname>"+data.name+"</p>" + "<br>");
        })
})

$(document).ready(function () {
    $('#openlist').click(function (){
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715", function(data,status){
                data.items.forEach(element => {
                
                listElement= "<p>"+element.name+"</p>";

                $('#elemente').append(listElement);
            });
        })
    });
})