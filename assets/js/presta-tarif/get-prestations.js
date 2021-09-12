const main = document.querySelector('main');
const loadingIcon = document.getElementById('loading-icon');

const getPrestations = async () => {
    loadingIcon.style.display = 'flex';
    let response = await fetch('https://api-charles-cantin.herokuapp.com/prestations');
    if(response.ok && response.status === 200) {
        let data = await response.json();
        loadingIcon.style.display = 'none';
        displayPrestations(data);
    }
}

const displayPrestations = (data) => {
    for(let i = 0; i < data.length; i++) {
        const section = document.createElement('section');
        const topContainer = document.createElement('div');
        const descriptionContainer = document.createElement('div');
        const prestaTitle = document.createElement('h2');
        const prestaPrice = document.createElement('span');
        const prestaDescription = document.createElement('p');

        prestaTitle.className = 'presta-title';
        prestaTitle.textContent = `« ${data[i].title} » : `
        prestaDescription.textContent = data[i].description;
        prestaPrice.textContent = data[i].price === 0 ? 'Sur devis' : `${data[i].price} euros`;

        topContainer.append(prestaTitle);
        topContainer.append(prestaPrice);
        descriptionContainer.append(prestaDescription);

        section.append(topContainer);
        section.append(descriptionContainer);

        main.append(section);
   }
}



getPrestations()