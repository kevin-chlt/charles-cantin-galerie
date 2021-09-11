const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const telephone = document.getElementById('phone');
const message = document.getElementById('message');
const rgpd = document.getElementById('rgpd');
let helpText = document.getElementById('help-text');
let status = [];

requirejs(['node_modules/validator/validator.min'], (validator) => {
    form.addEventListener('submit', async(e) => {
        e.preventDefault()
        if(validator.isEmpty(firstName.value) || !validator.isAlpha(firstName.value || firstName.value.length > 50) ) {
            status.push('Veuillez saisir un prénom composé uniquement de lettres.') ;
        }
        if(validator.isEmpty(lastName.value) || !validator.isAlpha(lastName.value) || lastName.value.length > 50){
            status.push('Veuillez saisir un nom composé uniquement de lettres.');
        }
        if(validator.isEmpty(email.value) || !validator.isEmail(email.value)) {
            status.push('Veuillez saisir une adresse email valide.');
        }
        if(!validator.isMobilePhone(telephone.value, 'fr-FR')) {
            status.push('Veuillez saisir un numéro de téléphone valide.')
        }
        if(!validator.isLength(message.value, {min: 10, max: 2400})){
            status.push('Veuillez entrer un message valide.')
        }
        if(rgpd.checked === false) {
            status.push('Vous devez accepter nos termes concernant vos données.')
        }
        if(status.length === 0) {
            await sendMessage()
            clearInputs();
        }
        displayStatus(status);
        return status = [];
    });
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