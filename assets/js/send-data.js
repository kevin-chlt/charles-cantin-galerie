// Request for get a JWT //
const jwtRequest = {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
        identifier: 'admin@admin.fr',
        password: 'administrator'
    })
};


// Send the request, get JWT and call the sendMessage method //
const getJwt = async () => {
   let response = await fetch('https://api-charles-cantin.herokuapp.com/auth/local', jwtRequest)
    if(response.ok) {
        let jwtData = await response.json()
        await sendMessage(jwtData.jwt)
    }
}


// Create a new request with the JWT and form data then sent them to the API //
const sendMessage = async (jwt) => {
    const newMessageRequest = {
        method: 'POST',
        headers: new Headers({

            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+jwt,
        }),
        body: JSON.stringify({
            firstname: firstName.value,
            lastname: lastName.value,
            telephone: telephone.value,
            email: email.value,
            message: message.value
        })
    }
    let response = await fetch('https://api-charles-cantin.herokuapp.com/contacts', newMessageRequest)
    if(response.ok && response.status === 200) {
        status.push('Votre message à été envoyé avec succès.')
    } else {
        status.push('Une erreur est apparu sur le formulaire, merci de retaper votre requête.')
    }
}


