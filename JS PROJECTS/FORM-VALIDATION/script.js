document.addEventListener("DOMContentLoaded", () => {
  // Get required elements
  const form = document.getElementById("registrationForm");
  const showPasswordCheckBox = document.getElementById("showPassword");
  const userPassword = document.getElementById("password");
  const confirmPasswordVal = document.getElementById("confirmPassword");
  const userName = document.getElementById("username");
  const userEmail = document.getElementById("email");
  const phoneNumber = document.getElementById("phone");
  const submitButton = document.getElementById("submitBtn");

  //   Show/Hide password event listener
  showPasswordCheckBox.addEventListener("change", () => {
    if (showPasswordCheckBox.checked) {
      password.type = "text";
      confirmPassword.type = "text";
    } else {
      password.type = "password";
      confirmPassword.type = "password";
    }
  });

  //   Form submission event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    [
      userName,
      userEmail,
      userPassword,
      confirmPasswordVal,
      phoneNumber,
    ].forEach(hideError);

    let isValid = true;

    if (!validateUsername(userName.value)) {
      isValid = false;
    }
    if (!validateEmail(userEmail.value)) {
      isValid = false;
    }
    if (!validatePassword(userPassword.value)) {
      isValid = false;
    }
    if (
      !validateConfirmPassword(userPassword.value, confirmPasswordVal.value)
    ) {
      isValid = false;
    }
    if (!validatePhoneNumber(phoneNumber.value)) {
      isValid = false;
    }

    if (isValid) {
      [
        userName,
        userEmail,
        userPassword,
        confirmPasswordVal,
        phoneNumber,
      ].forEach(hideError);
      alert("Form submitted successfully!");
      form.reset();
      return;
    }
  });

  userName.addEventListener("input", () => {
    if (validateUsername(userName.value)) {
      hideError(userName);
    }
  });

  userEmail.addEventListener("input", () => {
    if (validateEmail(userEmail.value)) {
      hideError(userEmail);
    }
  });

  userPassword.addEventListener("input", () => {
    if (validatePassword(userPassword.value)) {
      hideError(userPassword);
    }
  });

  confirmPasswordVal.addEventListener("input", () => {
    if (validateConfirmPassword(userPassword.value, confirmPasswordVal.value)) {
      hideError(confirmPasswordVal);
    }
  });

  phoneNumber.addEventListener("input", () => {
    if (validatePhoneNumber(phoneNumber.value)) {
      hideError(phoneNumber);
    }
  });

  [userName, userEmail, userPassword, confirmPasswordVal, phoneNumber].forEach(
    (input) => {
      input.addEventListener("input", checkFormValidity);
    }
  );

  //   Validate username
  function validateUsername(username) {
    if (!username.trim()) {
      //   error_text.textContent = "Please enter a username";
      //   error_div.style.display = "block";
      showError(userName, "Please enter a username");
      return false;
    }
    if (username.length < 3) {
      //   error_text.textContent = "Username should not be less than 3 characters";
      //   error_div.style.display = "block";
      showError(userName, "Username must be at least 3 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      showError(userName, "Username must be alphanumeric");
      return false;
    }
    return true;
  }

  //   Validate Email

  function validateEmail(email) {
    // document.getElementById("email").appendChild(error_div);

    if (!email.trim()) {
      //   error_text.textContent = "Please enter an email";
      //   error_div.style.display = "block";
      showError(userEmail, "Please enter an email");
      return false;
    }
    if (!/^[^@]+@[^@]+.[^@]+$/.test(email)) {
      //   error_text.textContent = "Invalid email format";
      //   error_div.style.display = "block";
      showError(userEmail, "Invalid email format");
      return false;
    }
    return true;
  }

  function validatePassword(password) {
    // document.getElementById("password").appendChild(error_div);

    if (!password) {
      //   error_text.textContent = "Password is required";
      //   error_div.style.display = "block";
      showError(userPassword, "Password is required");
      return false;
    }
    if (password.length < 8) {
      //   error_text.textContent = "Password must not be less than 8 characters";
      //   error_div.style.display = "block";
      showError(userPassword, "Password must not be less than 8 characters");
      return false;
    }
    if (!/[a-zA-Z]/.test(password)) {
      //   error_text.textContent = "Password must contain at least one letter";
      //   error_div.style.display = "block";
      showError(userPassword, "Passowrd must contain at least one letter");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      //   error_text.textContent = "Password must contain at least one number";
      //   error_div.style.display = "block";
      showError(userPassword, "Password must contain at least one number");
      return false;
    }
    return true;
  }

  function validateConfirmPassword(password, confirmPassword) {
    // document.getElementById("confirmPassword").appendChild(error_div);

    if (!confirmPassword) {
      //   error_text.textContent = "Field cannot be empty";
      //   error_div.style.display = "block";
      showError(confirmPasswordVal, "Field cannot be empty");
      return false;
    }
    if (confirmPassword !== password) {
      //   error_text.textContent = "Passwords do not match";
      //   error_div.style.display = "block";
      showError(confirmPasswordVal, "Passwords do not match");
      return false;
    }
    return true;
  }

  function validatePhoneNumber(phone) {
    if (!phone.trim()) {
      showError(phoneNumber, "Phone number is required");
      return false;
    }
    if (!/^\+923[0-9]{9}$/.test(phone)) {
      showError(phoneNumber, "Invalid phone number format");
      return false;
    }
    return true;
  }

  function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("error");
  }

  function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    errorElement.style.display = "none";
    input.classList.remove("error");
  }

  function checkFormValidity() {
    const isValid =
      validateUsername(userName.value) &&
      validateEmail(userEmail.value) &&
      validatePassword(userPassword.value) &&
      validateConfirmPassword(userPassword.value, confirmPasswordVal.value) &&
      validatePhoneNumber(phoneNumber.value);

    submitButton.disabled = !isValid;
  }
});
