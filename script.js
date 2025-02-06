document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");
  const thankYou = document.querySelector(".thank-you");
  const continueBtn = document.querySelector(".continue");
  const nameInput = document.querySelector(
    ".card-holder-name__container input"
  );
  const numberInput = document.querySelector(
    ".card-holder-number__container input"
  );
  const monthInput = document.querySelector(".mm");
  const yearInput = document.querySelector(".yy");
  const cvcInput = document.querySelector(".cvc__input");

  const nameError = document.querySelector(
    ".card-holder-name__container .error-message"
  );
  const numberError = document.querySelector(
    ".card-holder-number__container .error-message"
  );
  const monthError = document.querySelector(".mm-error");
  const yearError = document.querySelector(".yy-error");
  const cvcError = document.querySelector(".cvc-error");

  const cardNumberDisplay = document.querySelector(".card__number");
  const cardNameDisplay = document.querySelector(".card__footer p:first-child");
  const cardExpiryDisplay = document.querySelector(
    ".card__footer p:last-child"
  );
  const cardCvcDisplay = document.querySelector(".card-back__number");

  // Helper function to show errors
  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.visibility = "visible";
    input.style.border = "1px solid #FF5050";
  }

  function hideError(input, errorElement) {
    errorElement.style.visibility = "hidden";
    input.style.border = "1px solid #ccc"; // Reset border
  }

  // Input validation functions
  function validateName() {
    if (nameInput.value.trim() === "") {
      showError(nameInput, nameError, "Please enter a valid name");
      return false;
    }
    hideError(nameInput, nameError);
    return true;
  }

  function validateNumber() {
    const regex = /^\d{16}$/; // Only 16 digits
    const sanitizedValue = numberInput.value.replace(/\s/g, ""); // Remove spaces

    if (!regex.test(sanitizedValue)) {
      showError(numberInput, numberError, "Wrong format, numbers only");
      return false;
    }
    hideError(numberInput, numberError);
    return true;
  }

  function validateExpiry() {
    let valid = true;

    if (
      monthInput.value.trim() === "" ||
      isNaN(monthInput.value) ||
      monthInput.value < 1 ||
      monthInput.value > 12
    ) {
      showError(monthInput, monthError, "Invalid month");
      valid = false;
    } else {
      hideError(monthInput, monthError);
    }

    if (
      yearInput.value.trim() === "" ||
      isNaN(yearInput.value) ||
      yearInput.value.length !== 2
    ) {
      showError(yearInput, yearError, "Invalid year");
      valid = false;
    } else {
      hideError(yearInput, yearError);
    }

    return valid;
  }

  function validateCvc() {
    if (
      cvcInput.value.trim() === "" ||
      isNaN(cvcInput.value) ||
      cvcInput.value.length !== 3
    ) {
      showError(cvcInput, cvcError, "Invalid CVC");
      return false;
    }
    hideError(cvcInput, cvcError);
    return true;
  }

  nameInput.addEventListener("input", () => {
    cardNameDisplay.textContent = nameInput.value || "JANE APPLESEED";
  });

  numberInput.addEventListener("input", () => {
    let formattedNumber = numberInput.value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ");
    cardNumberDisplay.innerHTML =
      formattedNumber.trim() || "0000 0000 0000 0000";
  });

  monthInput.addEventListener("input", updateExpiry);
  yearInput.addEventListener("input", updateExpiry);

  function updateExpiry() {
    cardExpiryDisplay.textContent = `${monthInput.value || "00"}/${
      yearInput.value || "00"
    }`;
  }

  cvcInput.addEventListener("input", () => {
    cardCvcDisplay.textContent = cvcInput.value || "000";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isNumberValid = validateNumber();
    const isExpiryValid = validateExpiry();
    const isCvcValid = validateCvc();

    if (isNameValid && isNumberValid && isExpiryValid && isCvcValid) {
      thankYou.style.display = "block";
      form.style.display = "none";
      form.reset();
    }
  });

  continueBtn.addEventListener("click", () => {
    cardNameDisplay.textContent = "JANE APPLESEED";
    cardNumberDisplay.textContent = "0000 0000 0000 0000";
    cardCvcDisplay.textContent = "000";
    cardExpiryDisplay.textContent = "00/00";
    form.style.display = "block";
    thankYou.style.display = "none";
  });
});
