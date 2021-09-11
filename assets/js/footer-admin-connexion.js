const adminSubmitBtn = document.getElementById('admin-submit-btn');
const adminForm = document.getElementById('form-admin');
const adminFormDisplayBtn = document.getElementById('admin-open-btn');
let adminMail = document.getElementById('admin-mail');
let adminPass = document.getElementById('password-admin');
let adminFormOpen = false;


adminFormDisplayBtn.addEventListener('click' , () => {
        if(!adminFormOpen) {
            adminForm.style.display = 'flex';
            return adminFormOpen = true;
        } else {
            adminForm.style.display = 'none';
            return adminFormOpen = false
        }
    })

requirejs(['node_modules/validator/validator.min'], (validator) => {
    adminForm.addEventListener('submit', async(e) => {
        e.preventDefault()
        if(validator.isEmpty(adminMail.value) || !validator.isEmail(adminMail.value)){
            adminMail.value = '';
            adminMail.placeholder = 'Adresse email invalide'
        }else if (validator.isEmpty(adminPass.value)) {
            adminPass.value = '';
            adminPass.placeholder = "Mot de passe invalide";
        } else {
            localStorage.setItem('token', await getJwt(adminMail.value, adminPass.value))
            //location.href = 'https://galerie-charles-cantin.herokuapp.com/messages.html'
        }
    })
})


// Send the request, get JWT and store it in the localstorage of user //
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
        console.log(jwtData.jwt);
        return JSON.stringify(jwtData.jwt)
    }
}
