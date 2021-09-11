const main = document.getElementById('main');
const helpText = document.getElementById('help-text');
const token = localStorage.getItem('token');


// Fetch function for remove message by id //
const removeMessage = async (id) => {
    let response = await fetch(`https://api-charles-cantin.herokuapp.com/contacts/${parseInt(id)}`, {
        method: 'DELETE',
        headers: new Headers({
            'Authorization': 'Bearer '+token
        }),
    })
    helpText.style.display = 'flex';
    if(response.ok && response.status === 200) {
        helpText.textContent = 'Message supprimé avec succès';
        document.getElementById(id).remove();
    } else {
        helpText.textContent = 'Une erreur est apparu, merci de réessayer ultérieurement';
    }
}


// Create the message section in the DOM dynamically //
const displayMessages = (data) => {
    const section = document.createElement('section');
        const containerUserInfos = document.createElement('div');
        const containerMessage = document.createElement('div');
        const userInfosText = document.createElement('h2');
        const userMessage = document.createElement('p');
        const imgDeleteMessage = document.createElement('img');

        imgDeleteMessage.className = 'trash';
        userInfosText.className = 'full-name'
        const formatDate = new Date(data.created_at)

        userInfosText.textContent = `De  ${data.lastname.toUpperCase()} ${data.firstname} - ${data.email} - ${data.telephone} - ${formatDate.toLocaleString('fr-FR')}`;
        userMessage.textContent = data.message
        imgDeleteMessage.src = 'assets/images/effacer.png';
        imgDeleteMessage.id = data.id.toString();

        containerUserInfos.append(userInfosText)
        containerMessage.append(userMessage);
        containerUserInfos.append(imgDeleteMessage)

        section.id = data.id.toString();
        section.append(containerUserInfos);
        section.append(containerMessage);

        main.append(section);
}

// Verify easily if user is allow to access this page and redirect him when he isn't //
if (!token) {
    window.location.href = 'https://api-charles-cantin.herokuapp.com/index.html';
} else {
     getMessages();
}

// Event delegation //
document.addEventListener('click',(e) => {
    if(e.target.className === 'trash'){
        removeMessage(e.target.id);
    }
});
