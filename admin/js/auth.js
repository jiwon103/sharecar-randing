const LOGIN_ID = "kunhaa1234";
const LOGIN_PW = "2222";

const form = document.getElementById("loginForm");

if (form) {

    form.addEventListener("submit", function(e){

        e.preventDefault();

        const id = document.getElementById("userid").value.trim();
        const pw = document.getElementById("password").value.trim();

        if(id === LOGIN_ID && pw === LOGIN_PW){

            sessionStorage.setItem("sharecar_admin","true");

            location.href="dashboard.html";

        }else{

            document.getElementById("loginMessage").innerHTML =
            "아이디 또는 비밀번호가 올바르지 않습니다.";

        }

    });

}