const galery = document.getElementById('container-images-1');
const list = document.getElementById('category-list');
let categoryActiveId = 8;


// Create event for each category title & add function to put the "active" CSS class to the category item clicked //
const createEvent = () => {
    for(let i = 1; i < list.children.length +1; i++) {
        const category = document.getElementById('category-'+ i);
        category.addEventListener('click', () => {
            const oldCategory = document.getElementById('category-'+ categoryActiveId);
            oldCategory.classList.remove('active-category');
            category.className = 'active-category';
            clearGalery();
            requestCategory(i);
            return categoryActiveId = i;
        });
    }
}
createEvent();


// Do the category request by ID, take a picture related in the response and create the img items in DOM //
const requestCategory = (id) => {
    fetch(`https://api-charles-cantin.herokuapp.com/categories/${id}`)
        .then(response => response.json())
        .then((data) => {
            for(let i = 0; i < 6; i++) {
                const img = document.createElement('img');
                if(data.image[i] !== undefined) {
                    img.src = `${encodeURI(data.image[i].image.formats.small.url)}`;
                } else {
                    img.src = 'assets/images/charles-cantin-accueil_background.png';
                }
                galery.appendChild(img);
            }
        })
        .catch((err) => console.log(err));
};
requestCategory(categoryActiveId);


// Clean the galery image list //
const clearGalery = () => {
    let galeryLength = galery.children.length -1;
    for(let i = galeryLength; i >= 0; i--) {
        galery.children[i].remove()
    }
};

