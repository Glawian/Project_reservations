import style from "./css/index.scss"

$(document).ready(function () {
    $(".showMenu").hide();
    $("#navBar1").mouseenter(function() {
        $("#showMenu1").show();
    });
    $("#showMenu1, #navBar1").mouseleave(function() {
        $("#showMenu1").hide();
    });
});

