function showError(input, span, errorMessage, inputErrorClass, errorClass) {
    input.classList.add(`${inputErrorClass}`);
    span.classList.add(`${errorClass}`);
    span.textContent = errorMessage;
}

function clearValidation(input, span, inputErrorClass, errorClass) {
    input.classList.remove(`${inputErrorClass}`);
    span.classList.remove(`${errorClass}`);
    span.textContent = "";
}

function checkValidity(formInput, formInputError, inputErrorClass, errorClass) {

    if (formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorMessage);
    } else {
        formInput.setCustomValidity("");
    }

    if (!formInput.validity.valid) {

        let errorMessage;

        if (formInput.value.length === 0) {
            errorMessage = "Вы пропустили это поле.";
        } else if (formInput.validity.patternMismatch) {
            errorMessage = formInput.dataset.errorMessage;
        } else if (formInput.value.length < formInput.minLength) {
            errorMessage = `Минимальное количество символов: 2. 
                            Длина текста сейчас: ${formInput.value.length} символов`;
        }

        showError(formInput, formInputError, errorMessage, inputErrorClass, errorClass);

    } else {
        clearValidation(formInput, formInputError, inputErrorClass, errorClass);
    }

}

function disableSubmitButton(formInputs, submitButton, disabledClass) {
    let isValid = true;

    formInputs.forEach((input) => {
        if (!input.validity.valid) {
            isValid = false;
        }
    })

    if (isValid) {
        submitButton.disabled = false
        submitButton.classList.remove(`${disabledClass}`);
    } else {
        submitButton.disabled = true;
        submitButton.classList.add(`${disabledClass}`);
    }
}

function enableValidation(settings) {

    const forms = Array.from(document.querySelectorAll(`${settings.formSelector}`));

    forms.forEach((form) => {
        const formInputs = Array.from(form.querySelectorAll(`${settings.inputSelector}`));
        const formInputErrors = Array.from(form.querySelectorAll(`${settings.errorMessageSelector}`));
        const formSubmitButton = form.querySelector(`${settings.submitButtonSelector}`);

        for (let i = 0; i < formInputs.length; i++) {
            const input = formInputs[i];
            const error = formInputErrors[i];

            input.addEventListener("input", () => {
                checkValidity(input, error, settings.inputErrorClass, settings.errorClass);
            });
        }

        form.addEventListener("input", () => {
            disableSubmitButton(formInputs, formSubmitButton, settings.inactiveButtonClass);
        });
    });
}

function clearFormInputs(formInputs, formInputErrors, inputErrorClass, errorClass) {
    for (let i = 0; i < formInputs.length; i++) {
        const formInput = formInputs[i];
        const formInputError = formInputErrors[i];

        clearValidation(formInput, formInputError, inputErrorClass, errorClass);
    }
}


export { checkValidity, enableValidation, clearValidation, disableSubmitButton, clearFormInputs };