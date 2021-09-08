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

const getJwt = async () => {
   let response = await fetch('https://api-charles-cantin.herokuapp.com/auth/local', jwtRequest)
    if(response.ok) {
        let jwtData = await response.json()
        await sendMessage(jwtData.jwt)
    }
}

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
            telephone: telephone.value.toString(),
            email: email.value,
            message: message.value
        })
    }

    let response = await fetch('https://api-charles-cantin.herokuapp.com/contacts', newMessageRequest)
    if(response.ok) {
        let status = await response.json();
        console.log(status)
    }
}

