import style from "./css/index.scss"
import users from "./users.json"
$(".showMenu").hide();
$(document).ready(function () {
    $("#navBar1, #showMenu1").hover(function () {
        $("#showMenu1").show();
    },
        function () {
            $("#showMenu1").hide();
        });
    $("#navBar2, #showMenu2").hover(function () {
        $("#showMenu2").show();
    },
        function () {
            $("#showMenu2").hide();
        });
    $("#navBar3, #showMenu3").hover(function () {
        $("#showMenu3").show();
    },
        function () {
            $("#showMenu3").hide();
        });
    $("#navBar4, #showMenu4").hover(function () {
        $("#showMenu4").show();
    },
        function () {
            $("#showMenu4").hide();
        });
});

document.getElementById("login").addEventListener("submit", logowanie);
console.log(users);

function logowanie() {
    const info = document.getElementById("wrongInfo");
    const login = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    if (login != "") {
        Object.keys(users).forEach(function (key) {
            if (login == key) {
                if (password == users[login].password) {
                    info.innerHTML = "";
                    $('#loginClear').children('input').val('')
                    $(".blocker").remove();
                }
                else {
                    info.innerHTML = "Niepoprawny email lub hasło!";
                }
            }
        });
    }
    else {
        info.innerHTML = "Nie podano adresu email!";
    }
}

