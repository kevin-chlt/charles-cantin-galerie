const galery = document.getElementById('container-images-1');
const list = document.getElementById('category-list');
const btnMoreContainer = document.getElementById('btn-more-container');
const btnMore = document.getElementById('btn-more');

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


// Request API, sort the pictures and call the display function //
const requestCategory = async (id, itemBegin, itemEnd) => {
    let response = await fetch (`https://api-charles-cantin.herokuapp.com/categories/${id}`);
    let data = await response.json();
    const categoryPictures = data.image.filter((e) => e.category === parseInt(id)) // Filter the image where the relation "category" field is = to id //
    const sortedPictures = categoryPictures.sort((a, b) => a.id < b.id) // Sort the picture by id //
    const sixFirstPictures = sortedPictures.slice(itemBegin, itemEnd); // Take the 6th last added first pictures //
    displayPictures(sixFirstPictures);
    displayBtnMore(categoryPictures)
}
requestCategory(categoryActiveId, itemBegin, itemEnd)


// Verify if the click is from a new category request or a btn-more click then create 6 pictures, if no 6 pic in DB, set default picture //
const displayPictures = (pictures) => {
    if(itemBegin === 0){
        clearGalery();
    }
    let length =  pictures.length < 6 ? 6 : pictures.length
    for(let i = 0; i < length; i++) {
        const figure = document.createElement('figure');
        const figcaption = document.createElement('figcaption');
        const img = document.createElement('img');
        figure.appendChild(img);
        figure.appendChild(figcaption)
        if(pictures[i] !== undefined) {
            img.src = encodeURI(pictures[i].image.url);
            figcaption.textContent = pictures[i].image.name;
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

// Clean the galery image list //
const clearGalery = () => {
    let galeryLength = galery.children.length -1;
    for(let i = galeryLength; i >= 0; i--) {
        galery.children[i].remove()
    }
};


// Check if the new array from API is bigger than the 6 div create by DisplayPicture() and display or not the div Btn-more"
const displayBtnMore = (pictures) => {
    if(pictures.length <= galery.children.length) {
        btnMoreContainer.style.display = 'none';
        btnMore.removeEventListener('click', eventBtnMore);
    }
    else{
        btnMoreContainer.style.display = 'flex';
        btnMore.addEventListener('click', eventBtnMore)
    }
}

// Refresh counter of the element in the DOM at each click on btn-more //
const eventBtnMore = () => {
    itemBegin += 6;
    itemEnd += 6;
    requestCategory(categoryActiveId, itemBegin, itemEnd)
}
