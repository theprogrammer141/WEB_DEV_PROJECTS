document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password");
  const copyButton = document.getElementById("copy-btn");
  const passwordLengthValue = document.getElementById("length-value");
  const lengthSlider = document.getElementById("length");
  const upperCaseCheckMark = document.getElementById("uppercase");
  const lowerCaseCheckMark = document.getElementById("lowercase");
  const numbersCheckMark = document.getElementById("numbers");
  const symbolsCheckMark = document.getElementById("symbols");
  const generateButton = document.getElementById("generate-btn");
  const refreshButton = document.getElementById("refresh-btn");
  const strengthFill = document.getElementById("strength-fill");
  const strengthText = document.getElementById("strength-text");
  const errorTextDisplay = document.querySelector(".check-error");

  const characterSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  function generatePassword() {
    const passwordLength = lengthSlider.value;

    const uppercaseCheck = upperCaseCheckMark.checked;
    const lowercaseCheck = lowerCaseCheckMark.checked;
    const numbersCheck = numbersCheckMark.checked;
    const symbolsCheck = symbolsCheckMark.checked;

    let string = "";

    if (uppercaseCheck) {
      string = string.concat(characterSets.uppercase);
    }
    if (lowercaseCheck) {
      string = string.concat(characterSets.lowercase);
    }
    if (numbersCheck) {
      string = string.concat(characterSets.numbers);
    }
    if (symbolsCheck) {
      string = string.concat(characterSets.symbols);
    }

    if (string == "") {
      errorTextDisplay.style.display = "inline";
      passwordInput.value = "";
      return;
    } else {
      errorTextDisplay.style.display = "none";
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * string.length);
      const randomChar = string[randomIndex];
      password = password.concat(randomChar);
    }

    passwordInput.value = password;
  }

  function updatePasswordStrength(password) {
    if (password == "") {
      strengthFill.classList.remove("strong", "medium", "weak");
      strengthText.textContent = "Strength: None";
      return;
    }

    strengthFill.classList.remove("strong", "weak", "medium");

    let score = 0;

    if (password.length >= 18) {
      score += 3;
    } else if (password.length >= 12) {
      score += 2;
    } else if (password.length >= 8) {
      score += 1;
    }

    if (/[a-z]/.test(password)) score += 1; // Has lowercase
    if (/[A-Z]/.test(password)) score += 1; // Has uppercase
    if (/[0-9]/.test(password)) score += 1; // Has numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 1; // Has symbols

    if (score >= 6) {
      strengthFill.classList.add("strong");
      strengthText.textContent = "Strength: Strong";
    } else if (score >= 4) {
      strengthFill.classList.add("medium");
      strengthText.textContent = "Strength: Medium";
    } else {
      strengthFill.classList.add("weak");
      strengthText.textContent = "Strength: Weak";
    }

    console.log(`${password}, ${password.length}, ${score}`);
  }

  copyButton.addEventListener("click", () => {
    if (passwordInput.value) {
      navigator.clipboard.writeText(passwordInput.value).then(() => {
        copyButton.classList.add("copied");
        copyButton.innerHTML = '<i class= "fas fa-check"></i>';
        setTimeout(() => {
          copyButton.classList.remove("copied");
          copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        }, 1000);
      });
    }
  });

  lengthSlider.addEventListener("input", () => {
    passwordLengthValue.textContent = parseInt(lengthSlider.value);
  });

  generateButton.addEventListener("click", () => {
    generateButton.classList.add("loading");
    generatePassword();
    updatePasswordStrength(passwordInput.value);
    setTimeout(() => {
      generateButton.classList.remove("loading");
    }, 500);
  });

  refreshButton.addEventListener("click", () => {
    lengthSlider.value = 12;
    passwordLengthValue.textContent = "12";

    upperCaseCheckMark.checked = true;
    lowerCaseCheckMark.checked = true;
    numbersCheckMark.checked = true;
    symbolsCheckMark.checked = false;

    generatePassword();
  });

  generatePassword();
  updatePasswordStrength(passwordInput.value);
});
