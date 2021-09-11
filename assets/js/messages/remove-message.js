const helpText = document.getElementById('help-text');


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

// Event delegation //
document.addEventListener('click',(e) => {
    if(e.target.className === 'trash'){
        removeMessage(e.target.id);
    }
});