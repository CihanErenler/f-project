const email = document.getElementById("email");
const userName = document.getElementById("name");
const formGroup = document.getElementById("email-group");
const rotate = document.querySelector(".custom-select-display i");
const button = document.getElementById("submit");
const terms = document.getElementById("terms");
const policy = document.getElementById("policy");
const spinner = document.querySelector(".spinner");

//RESOURCES THAT USED IN THE PROJECT
// 1 - JavaScript
// 2 - Html
// 3 - Css
// 4 - Font awesome

// IMPORTANT
// All text inputs set to focusout for eventlistener. So you will see the result after you click some where outside of the input field.

// Regular expression pattern that checks e-mail pattern
// Acceptable patter ****@***.**** (michael@gmail.com)
// If the pattern is different than this, "your email is invalid" alert is displayed
// under the email input field
const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

// Global event listener
document.addEventListener("click", (e) => {
  //Checks if the times icon clicked on the alert box.
  // If it is remove it
  if (e.target.classList.contains("times")) {
    document.querySelector(".alert").remove();
  }
});

// SHOW ALERTS

//Set click event listener for the subscribe button
button.addEventListener("click", (e) => {
  e.preventDefault();

  const nameVal = userName.value;
  const emailVal = email.value;

  //If the user click the subscribe button without filling the input fields
  // empty filds border is turn into red
  if (nameVal === "" || emailVal === "") {
    showAlert("danger", "Please fill in all required fields");
    if (nameVal === "") {
      userName.classList.add("invalid");
    }
    if (emailVal === "") {
      email.classList.add("invalid");
    }
  } else {
    //Check if email is entered proparly when the button is clicked
    if (reg.test(email.value)) {
      //Check if terms and policy checkbox is checked, if not show the alert
      if (!terms.checked || !policy.checked) {
        showAlert("primary-alert", "Please confirm terms and privacy policy");
      } else {
        //if everything is correct make form elemets disabled and set the loading spinner to block
        email.disabled = true;
        userName.disabled = true;
        button.disabled = true;
        spinner.style.display = "block";

        // After 2 seconds show succes alert and set disabaled to false
        setTimeout(() => {
          endSession();
        }, 2000);
      }
    } else {
      showAlert("primary-alert", "Please check your email");
    }
  }
});

// Show Alert Box

const showAlert = (type, text) => {
  // Create an alert box
  const div = document.createElement("DIV");
  div.className = `alert fadein ${type}`;
  div.innerHTML = `
      <div class="times">
        <div class="line-1"></div>
        <div class="line-2"></div>
      </div>
      ${text}`;
  //Append the alert to body
  document.body.appendChild(div);

  //after 3 seconds start fade out animation
  setTimeout(() => {
    const a = document.querySelector(".alert");
    if (a) {
      a.classList.add("fadeout");
      a.classList.remove("fadein");
    }
  }, 3000);

  //   after 3.4 seconds remove the alert box
  setTimeout(() => {
    const a = document.querySelector(".alert");
    if (a) {
      a.remove();
    }
  }, 3400);
};

// VALIDATION AND INVALID WARNING

// Check if the email field empty
// if it is not empty check if it is match with certain requirements
// if does not match show invalid email error under the email input field
email.addEventListener("focusout", () => {
  // check if the field is not empty
  if (email.value !== "") {
    //if not check if the pattern is corrent
    if (!reg.test(email.value)) {
      //show warning if the patter does not match
      warninMessage();
    } else {
      //if the field is not empty and match with patter remove invalid field error
      if (email.classList.contains("invalid")) {
        document.querySelector(".invalid-warning").remove();
        email.classList.remove("invalid");
      }
    }
  }
});

// If something is typed in the name field remove invalid state
userName.addEventListener("focusout", () => {
  if (userName.value !== "") {
    if (userName.classList.contains("invalid")) {
      userName.classList.remove("invalid");
    }
  }
});

// Create a pop up warning message
function warninMessage() {
  if (!email.classList.contains("invalid")) {
    email.classList.add("invalid");
  }

  if (formGroup.children.length !== 2) {
    const div = document.createElement("DIV");
    const p = document.createElement("P");

    div.className = "invalid-warning";
    p.appendChild(document.createTextNode("Your email address is invalid"));

    div.appendChild(p);
    formGroup.appendChild(div);
  }
}

// CUSTOME OPTION SECTION

// When the options menu clicked toggle the class "open"
document
  .querySelector(".custom-select-wrapper")
  .addEventListener("click", function () {
    this.querySelector(".custom-select").classList.toggle("open");
    // also toggle the "rotate" class to rotate arrow icon
    rotate.classList.toggle("rotate");
  });

//Iterating each .costume-option element
for (const option of document.querySelectorAll(".custom-option")) {
  // Adding click event listener for each of them
  option.addEventListener("click", function (e) {
    //if the clicked element does not contain "selected" class
    // remove it from the current one and add it to the clicked one
    if (!this.classList.contains("selected")) {
      this.parentNode
        .querySelector(".custom-option.selected")
        .classList.remove("selected");
      this.classList.add("selected");
      document.querySelector(
        ".custom-select-display span"
      ).textContent = this.textContent;
    }
  });
}

// End session
const endSession = () => {
  email.disabled = false;
  userName.disabled = false;
  button.disabled = false;
  email.classList.remove("invalid");
  spinner.style.display = "none";
  showAlert("success", "Subscribed successfully");
  clearFields();
};

// Clear fields
const clearFields = () => {
  email.value = "";
  userName.value = "";
  terms.checked = false;
  policy.checked = false;
};
