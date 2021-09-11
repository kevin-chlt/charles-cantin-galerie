// Create a new request with the message from user in her body //
const newMessageRequest = {
    method: 'POST',
    headers: new Headers({
        'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        telephone: telephone.value,
        email: email.value,
        message: message.value
    })
}

// Sent the message to the API //
const sendMessage = async () => {
    let response = await fetch('https://api-charles-cantin.herokuapp.com/contacts', newMessageRequest)
    if(response.ok && response.status === 200) {
        status.push('Votre message à été envoyé avec succès.')
    } else {
        status.push('Une erreur est apparu sur le formulaire, merci de retaper votre requête.')
    }
}


