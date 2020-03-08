const form = document.querySelector(".sign-in__form");
const input = document.querySelector(".vaidate-input");
const formWrap = document.querySelector(".sign-in__form-wrap");


redirect = () => {
    location.href = './walkthrough.html';
}

createError = (text) => {
    let error = document.createElement("p");
    error.innerHTML = text;
    error.classList.add('error-text');
    formWrap.appendChild(error);   
}

deleteError = () => {
    const errorEl = document.querySelector(".error-text");
    if(errorEl) {
        errorEl.remove();
    }
}

handleForm = (event) => { 
    event.preventDefault();
    let phoneRegEx = /[0-9 -()+]+$/;
    let emailRegEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let emailPhone = input.value;

    deleteError();

    if (emailPhone.match(phoneRegEx)) {
        if ( emailPhone.length < 9 || !emailPhone.match(phoneRegEx)) {
            input.classList.add('error');
            createError("Please enter a valid phone number")
        } else {
            deleteError();
            redirect();
        };
    } else if (!emailPhone.match(emailRegEx)) {
        input.classList.add('error');
        createError("Please enter valid email address.")
    } else {
        deleteError();
        redirect();
    }
} 

form ? form.addEventListener('submit', handleForm) : null;

