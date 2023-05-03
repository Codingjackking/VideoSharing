/* Form */
const form = document.getElementById("reg-form");
console.log("form", form);
/* Username */
const usernameInput = document.getElementById("username");
const usernameRequirements = [
  document.getElementById("username-requirement1"),
  document.getElementById("username-requirement2")
];

/* Email */
const emailInput = document.getElementById("email");
const emailRequirement = document.getElementById("email-requirement");

/* Password */
const passwordInput = document.getElementById("password");
const passwordRequirements = [
  document.getElementById("pass-requirement1"),
  document.getElementById("pass-requirement2"),
  document.getElementById("pass-requirement3"),
  document.getElementById("pass-requirement4")
];
const confirmInput = document.getElementById("confirmPassword");
const confirmRequirement = document.getElementById("conf-pass-requirement");

/* Regex */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* User Validation */
usernameInput.addEventListener("input", () => {
  console.log("Username input event fired");
  const inputValue = usernameInput.value;
  const isAlphabetic = /[a-zA-Z]/.test(inputValue);
  const isLengthValid = /^.{3,}$/.test(inputValue);
  usernameRequirements[0].style.color = isAlphabetic ? "green" : "red";
  usernameRequirements[1].style.color = isLengthValid ? "green" : "red";
});

/* Email Validation */
emailInput.addEventListener("input", () => {
  console.log("Email input event fired");
  const inputValue = emailInput.value;
  const isEmailValid = emailRegex.test(inputValue);
  emailRequirement.style.color = isEmailValid ? "green" : "red";
});

/* Password Validation */
passwordInput.addEventListener("input", () => {
  console.log("Password input event fired");
  const inputValue = passwordInput.value;
  const isLengthValid = /^.{8,}$/.test(inputValue);
  const hasUpperCase = /[A-Z]/.test(inputValue);
  const hasNumber = /[1-9]/.test(inputValue);
  const hasSymbol = /[\/*\-+!@#$%^&~\[\]]/.test(inputValue);
  passwordRequirements[0].style.color = isLengthValid ? "green" : "red";
  passwordRequirements[1].style.color = hasUpperCase ? "green" : "red";
  passwordRequirements[2].style.color = hasNumber ? "green" : "red";
  passwordRequirements[3].style.color = hasSymbol ? "green" : "red";
});
confirmInput.addEventListener("input", () => {
  console.log("Confirm password input event fired");
  const passValue = passwordInput.value;
  const confirmValue = confirmInput.value;
  const isMatched = confirmValue === passValue;
  confirmRequirement.style.color = isMatched ? "green" : "red";
});

/* Form Validation */
form.addEventListener("submit", (event) => {
  console.log("Form submit event fired");
  const usernameValue = usernameInput.value;
  const emailValue = emailInput.value;
  const passwordValue = passwordInput.value;
  const confirmValue = confirmInput.value;
  const isUsernameValid = /[a-zA-Z]/.test(usernameValue) && /^.{3,}$/.test(usernameValue);
  const isEmailValid = emailRegex.test(emailValue);
  const isPasswordValid = /^.{8,}$/.test(passwordValue) && /[A-Z]/.test(passwordValue) &&
                          /[1-9]/.test(passwordValue) && /[\/*\-+!@#$%^&~\[\]]/.test(passwordValue);
  const isConfirmed = confirmValue === passwordValue;
  
  if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmed) {
    console.log("Form submitted successfully");
    return; /* Refresh the screen */
  } else {
    console.log("Form validation failed");
    event.preventDefault(); 
  }
});
