//Validation Script
const form = document.getElementById("reg-form");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementsByName("email")[0];
const passwordInput = document.getElementsByName("password")[0];
const confirmInput = document.getElementsByName("confirm_password")[0];

const usernameRegex = /^[a-zA-Z][a-zA-Z0-9]{2,}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\/*\-+!@#$%^&~\[\]])[a-zA-Z0-9\/*\-+!@#$%^&~\[\]]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validation() {
    let valid = true;

    if (!usernameRegex.test(usernameInput.value)) {
        valid = false;
        alert("Please enter a valid username that starts with a letter and is at 3 least characters long.");   
    }

    if (!passwordRegex.test(passwordInput.value)) {
        valid = false;
        alert("Please enter a valid password that is at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 of the following special characters: / * - + ! @ # $ ^ & ~ [ ]");
    }
    else if (passwordInput.value != confirmInput.value) {
        valid = false;
        alert("Passwords do not match. Please enter the same password in both fields");
    }

    if (!emailRegex.test(emailInput.value)) {
        valid = false;
        alert("Please enter a valid email address.");
    }

    return valid;
}

form.addEventListener("submit", function(ev) {
    if (!validation()) {
        ev.preventDefault();
    }
});