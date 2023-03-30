/* Identifiers */
const form = document.getElementById("log=form");
const credentialInput = document.getElementById("credential");
const passwordInput = document.getElementsByName("password")[0];
const credentialRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

/*Login Validation */
function validation() {
    let valid = true;

    if (!(credentialRegex.test(credentialInput.value) || emailRegex.test(credentialInput.value))) {
        valid = false;
        alert("Please enter a valid username or email address that starts with a letter and is at least 3 characters long, or a valid email address.");
    }
    if (passwordInput.value.legnth < 8) {
        valid = false;
        alert("Please enter a valid password that is at least 8 characters long.");
    }
    return valid;
}

form.addEventListener("submit", function(ev) {
        if (!validation()) {
            ev.preventDefault();
        }
        else {
            alert("Login Successful.");
        }
    });