const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const telephone = document.getElementById('phone');
const message = document.getElementById('message');
const rgpd = document.getElementById('rgpd');
let errors = [];

requirejs(['node_modules/validator/validator.min'], (validator) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if(validator.isEmpty(firstName.value) || !validator.isAlpha(firstName.value || firstName.value.length > 50) ) {
            errors.push('Veuillez saisir un prénom composé uniquement de lettres.') ;
        }
        if(validator.isEmpty(lastName.value) || !validator.isAlpha(lastName.value) || lastName.value.length > 50){
            errors.push('Veuillez saisir un nom composé uniquement de lettres.');
        }
        if(validator.isEmpty(email.value) || !validator.isEmail(email.value)) {
            errors.push('Veuillez saisir une adresse email valide.');
        }
        if(!validator.isMobilePhone(telephone.value, 'fr-FR')) {
            errors.push('Veuillez saisir un numéro de téléphone valide.')
        }
        if(!validator.isLength(message.value, {min: 10, max: 2400})){
            errors.push('Veuillez entrer un message valide.')
        }
        if(rgpd.checked === false) {
            errors.push('Vous devez accepter nos termes concernant vos données.')
        }

        if(errors.length !== 0) {
            cleanHelpText();
            displayErrors(errors);
        }else {
            getJwt()
        }

        return errors = [];
    });
});


//Create loop for display the errors in the help-text div //
let helpText = document.getElementById('help-text');
const displayErrors = (errors) => {
    if(errors.length !== 0) {
        helpText.style.display = 'flex';
        for(let i = 0; i < errors.length; i++) {
            const span = document.createElement('span');
            span.textContent = errors[i];
            helpText.appendChild(span);
        }
    }
}

// Delete child of help-text div //
const cleanHelpText = () => {
    let helpTextLength = helpText.children.length;
    for(let i = helpTextLength - 1; i >= 0; i--) {
        helpText.children[i].remove();
    }

}
