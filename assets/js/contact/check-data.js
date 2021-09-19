const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const telephone = document.getElementById('phone');
const message = document.getElementById('message');
const rgpd = document.getElementById('rgpd');
let helpText = document.getElementById('help-text');
let status = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    Validator.useLang('fr');
    let validation = new Validator({
        FirstName: firstName.value.trim(),
        LastName: lastName.value.trim(),
        Email: email.value.trim(),
        Telephone: telephone.value.trim(),
        Message: message.value.trim(),
        ToS: rgpd.checked
    }, {
        FirstName: 'required|alpha',
        LastName: 'required|alpha',
        Email: 'required|email',
        Telephone: ['required', 'regex:/^(\\+?33|0)[67]\\d{8}$/'],
        Message: 'required',
        ToS: 'accepted'
    });
    validation.setAttributeNames({
        FirstName: 'Prénom',
        LastName: 'Nom',
        ToS: 'Conditions de récoltes des données'
    });
    if(validation.fails()) {
        status = Object.values(validation.errors.all())
    } else {
        await sendMessage()
        clearInputs();
    }
    displayStatus(status);
    return status = [];
});

//Create loop for display the status in the help-text div //
const displayStatus = (status) => {
    cleanHelpText()
    helpText.style.display = 'flex';
    for(let i = 0; i < status.length; i++) {
        const span = document.createElement('li');
        span.textContent = status[i];
        helpText.appendChild(span);
    }
}

// Delete child of help-text div //
const cleanHelpText = () => {
    let helpTextLength = helpText.children.length;
    for(let i = helpTextLength - 1; i >= 0; i--) {
        helpText.children[i].remove();
    }
}

// Clear the inputs after send the message //
const clearInputs = () => {
    for(let i = 0; i < form.elements.length; i++) {
        form.elements[i].value = ''
    }
    rgpd.checked = false;
}