$(document).ready(function () {
    $('#bt1').click(function (){
        $.get("https://shopping-lists-api.herokuapp.com/api/v1/lists/5d9a21b50f5da70017537715", function(data,status){
            $('#requestoutput').append(data.items[0].name);
            console.log(data);
        })
    });
})