const galery = document.getElementById('container-images-1');
const list = document.getElementById('category-list');
const helpText = document.getElementById('help-text');
const loadingIcon = document.getElementById('loading-icon');

let categoryActiveId = 8;
let itemBegin = 0;
let itemEnd = 6;


// Create event for each category title & add function to put the "active" CSS class to the category item clicked //
const createEvent = () => {
    for(let i = 1; i < list.children.length +1; i++) {
        const category = document.getElementById('category-'+ i);
        category.addEventListener('click', () => {
            const oldCategory = document.getElementById('category-'+ categoryActiveId);
            oldCategory.classList.remove('active-category');
            category.className = 'active-category';
            itemBegin = 0
            itemEnd = 6;
            requestCategory(i, itemBegin, itemEnd);
            return categoryActiveId = i;
        });
    }
}
createEvent();


// Clean the galery image list //
const clearGalery = () => {
    let galeryLength = galery.children.length -1;
    for(let i = galeryLength; i >= 0; i--) {
        galery.children[i].remove()
    }
};


// Request API, sort the pictures and call the displays functions //
const requestCategory = async (id, itemBegin, itemEnd) => {
    if(itemBegin === 0){
        clearGalery();
    }
    loadingIcon.style.display = 'flex'
    let response = await fetch (`https://api-charles-cantin.herokuapp.com/categories/${id}`);
    loadingIcon.style.display = 'none';
    if(response.ok && response.status === 200) {
        let data = await response.json();
        const categoryPictures = data.image.filter((e) => e.category === parseInt(id)) // Filter the image where the relation "category" field is = to id //
        const sortedPictures = categoryPictures.sort((a, b) => a.id < b.id) // Sort the picture by id //
        const sixFirstPictures = sortedPictures.slice(itemBegin, itemEnd); // Take the 6th last added first pictures //
        displayPictures(sixFirstPictures);
        displayBtnMore(categoryPictures)
    } else {
        helpText.style.display = 'flex'
        helpText.textContent = 'Une erreur est apparu, merci de réessayer ultérieurement.'
    }

}
requestCategory(categoryActiveId, itemBegin, itemEnd)


// Verify if the click is from a new category request or a btn-more click then create 6 pictures, if no 6 pic in DB, set default picture //
const displayPictures = (pictures) => {
    let length =  pictures.length < 6 ? 6 : pictures.length
    for(let i = 0; i < length; i++) {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');
        figure.appendChild(img);
        figure.appendChild(figcaption)
        if(pictures[i] !== undefined) {
            img.src = encodeURI(pictures[i].image.url);
            figcaption.textContent = pictures[i].name;
        } else if(itemBegin !== 0) {
            break;
        }
        else {
            img.src = 'assets/images/charles-cantin-accueil_background.png';
            figcaption.textContent = 'Logo Entreprise'
        }
        galery.appendChild(figure);
    }
}




