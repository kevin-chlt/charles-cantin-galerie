//Create a new request with the message from user in her body and sent the message to the API //
const sendMessage = async () => {
    let response = await fetch('https://api-charles-cantin.herokuapp.com/contacts',{
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
    })

    if(response.ok && response.status === 200) {
        status.push('Votre message à été envoyé avec succès.')
    } else {
        status.push('Une erreur est apparu, merci de réessayer ultérieurement.')
    }
}


