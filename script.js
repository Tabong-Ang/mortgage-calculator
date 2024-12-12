const clearAll = document.querySelector("#clear");
const mortgageAmt = document.querySelector("#amount");
const mortgageTerm = document.querySelector("#term");
const mortgageRate = document.querySelector("#rate");
const repayment = document.querySelector("#repayment");
const interestOnly = document.querySelector("#interest-only");
const monthlyRepayment = document.querySelector("#monthly-repayment");
const TotalPayableAmt = document.querySelector("#total-payable-amt");
const mortgageAmtErr = document.querySelector(".error-message-1");
const mortgageTermErr = document.querySelector(".error-message-2");
const mortgageRateErr = document.querySelector(".error-message-3");
const radioBtnErr = document.querySelector(".error-message-4");
const calculateBtn = document.querySelector("button");

document.addEventListener("DOMContentLoaded", () => {
  // Error Checks
  function validFields(inputElement, errCheck) {
    if (isNaN(parseFloat(inputElement.value))) {
      errCheck.textContent = "Please enter numbers only";
    } else {
      errCheck.textContent = "";
    }
  }

  // Add Event Listeners for Input Validation
  mortgageAmt.addEventListener("input", () => {
    validFields(mortgageAmt, mortgageAmtErr);
    preventMultipleDots(mortgageAmt);
  });
  mortgageTerm.addEventListener("input", () => {
    validFields(mortgageTerm, mortgageTermErr);
    preventMultipleDots(mortgageTerm);
  });
  mortgageRate.addEventListener("input", () => {
    validFields(mortgageRate, mortgageRateErr);
    preventMultipleDots(mortgageRate);
  });

  // Function to Validate Radio Buttons
  function radioErrCheck() {
    if (!repayment.checked && !interestOnly.checked) {
      radioBtnErr.textContent = "This field is required";
      return false;
    } else {
      radioBtnErr.textContent = "";
      return true;
    }
  }

  
  function preventMultipleDots(inputElement) {
    const value = inputElement.value;
    if (value.split(".").length > 2) {
      inputElement.value = value.substring(0, value.length - 1); 
    }
  }

  calculateBtn.addEventListener("click", () => {
    document.querySelector(".empty-results").style.visibility = "hidden";
    document.querySelector(".your-results").style.display = "flex";

    const isValidMortgageAmt = !isNaN(parseFloat(mortgageAmt.value));
    const isValidMortgageTerm = !isNaN(parseFloat(mortgageTerm.value));
    const isValidMortgageRate = !isNaN(parseFloat(mortgageRate.value));
    const isValidRadio = radioErrCheck();

    if (
      isValidMortgageAmt &&
      isValidMortgageTerm &&
      isValidMortgageRate &&
      isValidRadio
    ) {
      const mortgageAmtInput = parseFloat(mortgageAmt.value);
      const mortgageTermInput = parseInt(mortgageTerm.value);
      const mortgageRateInput = parseFloat(mortgageRate.value);
      const monthlyRate = mortgageRateInput / 100 / 12;
      const numberOfPayments = mortgageTermInput * 12;
      let monthlyPayment =
        (mortgageAmtInput * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      monthlyPayment = monthlyPayment.toFixed(2);

      monthlyRepayment.textContent = `£${monthlyPayment}`;
      TotalPayableAmt.textContent = `£${(
        monthlyPayment * numberOfPayments
      ).toFixed(2)}`;
    } else {
      mortgageAmtErr.textContent = "This field is required";
      mortgageTermErr.textContent = "This field is required";
      mortgageRateErr.textContent = "This field is required";
      document.querySelector(".your-results").style.display = "none";
      document.querySelector(".empty-results").style.visibility = "visible";
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.style.border = "1px solid var(--Red)";
      });
      const symbols = document.querySelectorAll(".symbol");
      symbols.forEach((symbol) => {
        symbol.style.backgroundColor = "var(--Red)";
      });
    }
  });
});


clearAll.addEventListener("click", () => {
  mortgageAmt.value = "";
  mortgageTerm.value = "";
  mortgageRate.value = "";
  repayment.checked = false;
  interestOnly.checked = false;
  monthlyRepayment.textContent = "";
  TotalPayableAmt.textContent = "";
  mortgageAmtErr.textContent = "";
  mortgageTermErr.textContent = "";
  mortgageRateErr.textContent = "";
  radioBtnErr.textContent = "";
});
