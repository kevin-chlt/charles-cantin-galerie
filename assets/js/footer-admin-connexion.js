const adminForm = document.getElementById('form-admin');
const adminFormDisplayBtn = document.getElementById('admin-open-btn');
let adminMail = document.getElementById('admin-mail');
let adminPass = document.getElementById('password-admin');
let adminFormOpen = false;

// Event button display/undisplay //
adminFormDisplayBtn.addEventListener('click' , () => {
    if(!adminFormOpen) {
        adminForm.style.display = 'flex';
        return adminFormOpen = true;
    } else {
        adminForm.style.display = 'none';
        return adminFormOpen = false
    }
})

// Check user input and get JWT with user ID then store it in local storage //
adminForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    Validator.useLang('fr');
    let validation = new Validator({
        Email: adminMail.value.trim(),
        Password: adminPass.value,
    }, {
        Email: 'required|email',
        Password: 'required',
    });
    validation.setAttributeNames({
        Password: 'Mot de passe',
    });

    if(validation.fails()) {
        adminMail.value = '';
        adminMail.placeholder = 'Veuillez remplir correctement le formulaire'
    } else {
        const token = await getJwt(adminMail.value, adminPass.value);
        if(token) {
            localStorage.setItem('token', token);
            window.location.href = 'https://charles-cantin-galerie.herokuapp.com/messages.html'
        } else {
            adminMail.value = '';
            adminMail.placeholder = 'Utilisateur inconnu';
        }
    }
})

// Send the request, get JWT and return it //
const getJwt = async (mail, pass) => {
    let response = await fetch('https://api-charles-cantin.herokuapp.com/auth/local', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            identifier: mail,
            password: pass
        })
    });
    if(response.ok && response.status === 200) {
        let jwtData = await response.json()
        return jwtData.jwt;
    }
}
