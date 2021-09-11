const main = document.getElementById('main');
const token = localStorage.getItem('token');

// Make the API request with the token and get the content message, then call displayFonction //
const getMessages = async () => {
    let response = await fetch('https://api-charles-cantin.herokuapp.com/contacts', {
        headers: new Headers({
            'Authorization': 'Bearer '+token
        })
    })
    if (response.ok && response.status === 200) {
        let data = await response.json();
        let dataSorted = data.sort((a, b) => a.id < b.id);
        dataSorted.forEach(e => displayMessages(e));
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
