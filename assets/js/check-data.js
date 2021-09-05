const form = document.getElementById('form');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const telephone = document.getElementById('phone');
const message = document.getElementById('message');
let errors = [];

requirejs(['node_modules/validator/validator.min'], (validator) => {
    form.addEventListener('submit', (e) => {
        if(validator.isEmpty(firstName.value) || !validator.isAlpha(firstName.value) ) {
            e.preventDefault();
            errors.push('Veuillez saisir un nom composé uniquement de lettres.') ;
        }
        if (validator.isEmpty(firstName.value) || !validator.isAlpha(lastName.value)){
            e.preventDefault();
            errors.push('Veuillez saisir un prénom composé uniquement de lettres.');
        }
        if(validator.isEmpty(email.value) || !validator.isEmail(email.value)) {
            e.preventDefault();
            errors.push('Veuillez saisir une adresse email valide.');
        }
        if(!validator.isMobilePhone(telephone.value, 'fr-FR')) {
            e.preventDefault();
            errors.push('Veuillez saisir un numéro de téléphone valide.')
        }
        if(validator.isLength(message.value, [{min: 10, max: 2400}])){
            validator.escape(message.value);
        }else {
            e.preventDefault();
            errors.push('Veuillez entrer un message valide.')
        }
        displayErrors(errors);
        return errors = [];
    });
});


//Create loop for display the errors in the help-text div //
const helpText = document.getElementById('help-text');
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

