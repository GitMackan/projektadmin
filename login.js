// Händelsehanterare
window.addEventListener('load', checkAuth);

// Variabler
let loginBtn = document.getElementById("login");
let userEl = document.getElementById("user");
let passEl = document.getElementById("password");
let loginEl = document.getElementById("loginError");
let logoutBtn = document.getElementById("logMeOut");

if (loginBtn != null) {
    loginBtn.addEventListener('click', validate);  
}
if (logoutBtn != null) {
    logoutBtn.addEventListener('click', logMeOut);
}

// Funktion för att logga in
function validate() {
    if (userEl.value === "admin" && passEl.value === "password") {
        //OK!
        localStorage.setItem("isAuth", "true");
        window.location.href = 'https://studenter.miun.se/~many2005/dt173g/projektadmin/admin.html';
    } else {
        loginError.innerHTML = "Fel användarnamn eller lösenord!";
    }
}

// Funktion för att kontrollera om användare är inloggad
function checkAuth() {
    let isAuth = localStorage.getItem("isAuth");
    let thisPage = window.location.pathname;
    if (isAuth === "true") {
         if (thisPage === '../index.html') {
            window.location.href = 'https://studenter.miun.se/~many2005/dt173g/projektadmin/admin.html';
         }
    } else
    {
        if (thisPage != '../index.html') {
            window.location.href = 'https://studenter.miun.se/~many2005/dt173g/projektadmin/index.html';
        }
    }
}

// Funktion för att logga ut
function logMeOut() {
    localStorage.removeItem("isAuth");
    window.location.reload();
}

