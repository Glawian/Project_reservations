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
    $("#navBar7, .dropdownContent").hover(function () {
        $(".dropdownContent").show();
    },
        function () {
            $(".dropdownContent").hide();
        });

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#dateWylot, #datePowrot').val(today);

    $('#checkDwaP').click(function () {
        $('#checkObie').prop('checked', true);
        $('#checkJeden').prop('checked', false);
        $("#checkJedenInput").css('opacity', '1');
        $('.powrotHide').show();
    });
    $('#checkJedenP').click(function () {
        $('#checkJeden').prop('checked', true);
        $('#checkObie').prop('checked', false);
        $("#checkJedenInput").css('opacity', '0');
        $('.powrotHide').hide();
    });
    $('.inputStrony input:checkbox').click(function () {
        $(this).prop('checked', true);
        $('.inputStrony input:checkbox').not(this).prop('checked', false);
        if ($('#checkJeden').prop('checked')) {
            $("#checkJedenInput").css('opacity', '0');
            $('.powrotHide').hide();
        }
        else {
            $("#checkJedenInput").css('opacity', '1');
            $('.powrotHide').show();
        }
    });
});

document.getElementById("loginClear").addEventListener("submit", logowanie);

function logowanie() {
    const info = document.getElementById("wrongInfo");
    const login = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    if (login in users) {
        const usersLogin = users[login];
        if (password == usersLogin.password) {
            info.innerHTML = "";
            console.log(usersLogin.username);
            $('#loginClear').children('input').val('')
            $(".blocker").remove();
            $("#navBar5, #navBar6").hide();
            const myLi = document.getElementById("loginA");
            const myA = document.createElement("a");
            myA.setAttribute("href", "#");
            myA.setAttribute("id", "logA");
            myA.innerText = usersLogin.username;
            myLi.appendChild(myA);
            $("#navBar7").show();
        }
        else {
            info.innerHTML = "Niepoprawne hasło!";
        }
    }
    else {
        info.innerHTML = "Podany adres email nie istnieje w bazie!";
    }
}

document.getElementById("logOut").addEventListener("click", function () {
    $("#navBar5, #navBar6").show();
    $("#navBar7").hide();
    $('#logA').remove('');
})

document.getElementById("rejestracja").addEventListener("submit", tworzenieKonta);

function tworzenieKonta() {
    const info = document.getElementById("wrongInfoRej");
    const user = document.getElementById("userRej").value;
    const email = document.getElementById("emailRej").value;
    const password = document.getElementById("passRej").value;
    const password2 = document.getElementById("pass2Rej").value;
    const tab = [user, email, password, password2];
    const tabArray = [];
    tab.forEach(function (item) {
        if (item != "") {
            tabArray.push("1");
        }
        else {
            tabArray.push("0");
        }
    });
    if (tabArray.indexOf("0") != "-1") {
        info.style.color = "rgb(211, 0, 0)";
        info.innerHTML = "Nie uzupełniono wszystkich pól!";
    }
    else {
        if (email in users) {
            info.style.color = "rgb(211, 0, 0)";
            info.innerHTML = "Konto z podanym adresem email już istnieje!";
        }
        else {
            if (user.length >= 12) {
                info.style.color = "rgb(211, 0, 0)";
                info.innerHTML = "Podana nazwa użytkownika jest zbyt długa!";
            }
            else {
                if (password.length < 8) {
                    info.style.color = "rgb(211, 0, 0)";
                    info.innerHTML = "Podano zbyt krótkie hasło!";
                }
                else {
                    if (password != password2) {
                        info.style.color = "rgb(211, 0, 0)";
                        info.innerHTML = "Podane hasła nie są takie same!";
                    }
                    else {
                        users[email] = {
                            "password": password,
                            "username": user
                        };
                        info.style.color = "green";
                        info.innerHTML = "Pomyślnie utworzono konto!";
                        $('#rejClear').children('input').val('')
                    }
                }
            }
        }
    }
}
