document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.getElementById("input");
  const generateButton = document.getElementById("generate");
  const codeContainer = document.getElementById("qrcode");
  const errorText = document.getElementById("error-text");

  inputText.value = "";
  codeContainer.innerHTML = "";

  generateButton.addEventListener("click", () => {
    const inputValue = inputText.value.trim();

    if (inputText.value === "") {
      errorText.style.display = "block";
    } else {
      errorText.style.display = "none";
      codeContainer.innerHTML = "";

      new QRCode(codeContainer, {
        text: inputValue,
        width: 256,
        height: 256,
        colorDark: "#000",
        colorLight: "#fff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }
  });

  inputText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      generateButton.click();
    }
  });
});
