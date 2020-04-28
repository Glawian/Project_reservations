import style from "./css/index.scss"
// import users from "./users.json"
const usersURL = '/users';
const passURL = '/pass';

const requestHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

$(".showMenu").hide();
$(document).ready(function () {
    $('#logoFly').click(function () {
        location.reload();
    })
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
    var dateWylot = document.getElementById("dateWylot");
    var datePowrot = document.getElementById("datePowrot");
    dateWylot.setAttribute("min", today);
    datePowrot.setAttribute("min", today);
    dateWylot.addEventListener("change", () => {
        $('#datePowrot').val(dateWylot.value);
        datePowrot.setAttribute("min", dateWylot.value);
    })

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
            $('#checkJedenInput').css('opacity', '0');
            $('.powrotHide').hide();
        }
        else {
            $('#checkJedenInput').css('opacity', '1');
            $('.powrotHide').show();
        }
    });
    $('#openPass').click(function () {
        $('#wyborPas').toggle();
    })

    document.getElementById("loginClear").addEventListener("submit", logowanie);

    function logowanie() {
        event.preventDefault();
        const info = document.getElementById("wrongInfo");
        const login = document.getElementById("mail").value;
        const password = document.getElementById("password").value;
        fetch(usersURL).then(res => res.json()).then(body => {
            const users = body.users;
            if (login in users) {
                const usersLogin = users[login];
                if (password == usersLogin.password) {
                    info.innerHTML = "";
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
        });
    }

    document.getElementById("logOut").addEventListener("click", function () {
        $("#navBar5, #navBar6").show();
        $("#navBar7").hide();
        $('#logA').remove('');
    })

    document.getElementById("rejestracja").addEventListener("submit", tworzenieKonta);

    function tworzenieKonta() {
        event.preventDefault();
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
            fetch(usersURL).then(res => res.json()).then(body => {
                const users = body.users;
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
                                const newUser = {
                                    [email]: {
                                        "password": password,
                                        "username": user
                                    }
                                }
                                fetch(usersURL, {
                                    method: 'POST',
                                    headers: requestHeaders,
                                    body: JSON.stringify(newUser)
                                }).then(res => {
                                    info.style.color = "green";
                                    info.innerHTML = "Pomyślnie utworzono konto!";
                                    $('#rejClear').children('input').val('')
                                })
                            }
                        }
                    }
                }
            });
        }
    }

    document.getElementById("changeZDo").addEventListener("click", function () {
        event.preventDefault();
        var z = $("#zInput").val();
        var doo = $("#doInput").val();
        if (doo != null) {
            $("#zInput").val(doo);
            $("#doInput").val(z);
        }
    })

    document.getElementById("doInput").addEventListener("change", function () {
        var z = $("#zInput").val();
        var doo = $("#doInput").val();
        if ((doo === null) || (doo === z)) {
            $("#inDivDo").css("color", "rgb(211, 0, 0)");
            $("#divAndInputDo").addClass("redBorder");
        } else {
            $("#inDivDo").css("color", "black");
            $("#divAndInputDo").removeClass("redBorder");
        }
    });

    $('#dorosliNum, #nastolatkowieNum, #dzieciNum, #niemowletaNum').change(() => {
        var dorosliNum = parseInt($('#dorosliNum').val());
        var nastolatkowieNum = parseInt($('#nastolatkowieNum').val());
        var dzieciNum = parseInt($('#dzieciNum').val());
        var niemowletaNum = parseInt($('#niemowletaNum').val());
        if (niemowletaNum > dorosliNum) {
            fetch(passURL).then(res => res.json()).then(body => {
                const passangers = body.passangers;
                console.log(passangers);
                $('#dorosliNum').val(passangers.dorosli);
                $('#nastolatkowieNum').val(passangers.nastolatkowie);
                $('#dzieciNum').val(passangers.dzieci);
                $('#niemowletaNum').val(passangers.niemowleta);
            });
            $("#niemowletaNum").addClass("redBorder");
            $("#errorPassDiv").text("Liczba niemowląt musi być mniejsza bądź równa liczbie pasażerów powyżej 16 lat.");
            $("#errorPassDiv").show();
            return false;
        } else {
            $("#niemowletaNum").removeClass("redBorder");
            $("#errorPassDiv").text("");
            $("#errorPassDiv").hide();
        }
        var sum = dorosliNum + nastolatkowieNum + dzieciNum + niemowletaNum;

        if ((sum - niemowletaNum) > 9) {
            fetch(passURL).then(res => res.json()).then(body => {
                const passangers = body.passangers;
                console.log(passangers);
                $('#dorosliNum').val(passangers.dorosli);
                $('#nastolatkowieNum').val(passangers.nastolatkowie);
                $('#dzieciNum').val(passangers.dzieci);
                $('#niemowletaNum').val(passangers.niemowleta);
            });
            $("#errorPassDiv").text("Liczba pasażerów nie może być większa niż 9 (bez niemowląt)");
            $("#errorPassDiv").show();
            return false;
        } else {
            $("#errorPassDiv").text("");
            $("#errorPassDiv").hide();
        }
        var spanPass = document.getElementById('spanPass');
        if (sum != 1) {
            spanPass.innerHTML = sum + " pasażerów";
        }
        else {
            spanPass.innerHTML = sum + " pasażer";
        }

        const passangersNew = {
            "dorosli": dorosliNum,
            "nastolatkowie": nastolatkowieNum,
            "dzieci": dzieciNum,
            "niemowleta": niemowletaNum
        }
        fetch(passURL, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(passangersNew)
        });
    })

    document.getElementById("submitSearch").addEventListener("click", buyTicketStep1);

    function buyTicketStep1() {
        event.preventDefault();
        var z = $("#zInput").val();
        var doo = $("#doInput").val();
        if ((doo === null) || (doo === z)) {
            $("#inDivDo").css("color", "rgb(211, 0, 0)");
            $("#divAndInputDo").addClass("redBorder");
            return false;
        }
        var wylot = $("#dateWylot").val();
        var powrot = $("#datePowrot").val();
        var sum = parseInt($('#dorosliNum').val()) + parseInt($('#nastolatkowieNum').val()) + parseInt($('#dzieciNum').val()) + parseInt($('#niemowletaNum').val());
        $(".search-widget").hide();
        $("#buyTicket").show();
        document.getElementById("spanWylot").innerHTML = z + " ---> " + doo;
    }

});