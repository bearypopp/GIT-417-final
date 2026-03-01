// DARK MODE
const darkModeBttn = document.querySelector("#theme-toggle");
const body = document.body;

if (body.classList.contains("dark")) {
    darkModeBttn.textContent = "Light Mode";
}
else {
    darkModeBttn.textContent = "Dark Mode";
}

//tells user if screen is in light or dark mode, and can toggle to either or.
darkModeBttn.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        darkModeBttn.textContent = "Light Mode";
    }
    else {
        darkModeBttn.textContent = "Dark Mode";
    }
});

// DRINK DISPLAY
const drinkButtons = document.querySelectorAll("#drink-buttons button");
const drinks = document.querySelectorAll(".drink-display .drink");

//RESET FUNCTION
function drinkReset() {
    drinks.forEach((drink) => {
        drink.classList.remove("show");
    });

    drinkButtons.forEach((drinkButton) => {
        drinkButton.classList.remove("active");
    })
}
//toggles to the specific drink that is selected
function showDrink(drinkName) {
    drinkReset();


    const drinkSelected = document.getElementById(drinkName);
//toggles the button to show if user is on that specific menu item
    if (drinkSelected) {
        drinkSelected.classList.add("show");
    }

    drinkButtons.forEach((drinkButton) => {
        if (drinkButton.dataset.drink === drinkName) {
            drinkButton.classList.add("active");
        }
    });
}

drinkButtons.forEach((drinkButton) => {
    drinkButton.addEventListener("click", () => {
        const drinkSelected = drinkButton.dataset.drink;
        showDrink(drinkSelected);
    });
});

//LUCKY LATTE CHALLENGE GAME
const gameForm = document.querySelector("#guess-form");
const gameInput = document.querySelector("#guess-input");
const gameResult = document.querySelector("#guess-result");

gameForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userNum = Number(gameInput.value);
//tells users to enter a whole number
    if (!Number.isInteger(userNum) || userNum < 1 || userNum > 10) {
        gameResult.textContent = "Please enter a whole number between 1 and 10.";
        return;
    }

    const luckyNum = Math.floor(Math.random() * 10) + 1;
//based on Lucky Number, prompts users if they win or lose.
    if (userNum === luckyNum) {
        gameResult.innerHTML = "<strong>Your Guess:</strong> " + userNum + "<br>" + "<strong>Lucky Number:</strong> " + luckyNum + "<br><br>" + "You Won! Enjoy your 10% discount!";
    }
    else {
        gameResult.innerHTML = "<strong>Your Guess:</strong> " + userNum + "<br>" + "<strong>Lucky Number:</strong> " + luckyNum + "<br><br>" +  "— Not this time. Try Again!";
    }
});

//CONTACT FORM
const contactForm = document.querySelector("#contact-form");

//inputs
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const comments = document.querySelector("#comments");

//selection button
const emailPref = document.querySelector("#pref-email");
const phonePref = document.querySelector("#pref-phone");

//error messages
const nameErr = document.querySelector("#name-error");
const prefErr = document.querySelector("#method-error");
const emailErr = document.querySelector("#email-error");
const phoneErr = document.querySelector("#phone-error");
const commentErr = document.querySelector("#comments-error");

function showError(errorMsg, message){
    errorMsg.textContent = message;
}
function clearError(errorMsg){
    errorMsg.textContent = "";
}
//Error Message that's prompted to users if something isn't filled in.
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearError(nameErr);
    clearError(prefErr);
    clearError(emailErr);
    clearError(phoneErr);
    clearError(commentErr);

    let isValid = true;

    if(fullName.value.trim()=== ""){
        showError(nameErr, "Full Name is required.");
        isValid = false;
    }

    let contactPref = "";
    if(emailPref.checked){
        contactPref = "email";
    }
    else if(phonePref.checked){
        contactPref = "phone";
    }
    else{
        showError(prefErr, "Please select a preferred contact method.");
        isValid = false;
    }

    if(comments.value.trim() === ""){
        showError(commentErr, "Comments are required.");
        isValid = false;
    }
    if(contactPref === "email"){
        if(email.value.trim() === ""){
            showError(emailErr, "Email is required when selected.");
            isValid = false;
        }
    }
    if(contactPref === "phone"){
         if(phone.value.trim() === ""){
        showError(phoneErr, "Phone number is required when selected.");
        isValid = false;
    }
    }

    if (isValid) {
        const formInfo = {
            fullName: fullName.value.trim(),
            preferredContact: contactPref,
            email: email.value.trim(),
            phone: phone.value.trim(),
            comments: comments.value.trim()
        };
//shows users their input based of successfully submitting their form
        alert(
            "Form Submitted Successfully! \n\n" + "Full Name: " + formInfo.fullName + "\n" + "Preferred Contact: " + formInfo.preferredContact + "\n" + "Email: " + (formInfo.email || "Not provided") + "\n" + "Phone: " + (formInfo.phone || "Not provided") + "\n" + "Comments: " + formInfo.comments
        );

        contactForm.reset();
    }
   
})