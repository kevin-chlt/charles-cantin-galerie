const galery = document.getElementById('container-images-1');
const btnMore = document.getElementById('btn-more');

// Clean the galery image list //
const clearGalery = () => {
    let galeryLength = galery.children.length -1;
    for(let i = galeryLength; i >= 0; i--) {
        galery.children[i].remove()
    }
};

// Do the category request and create the img in DOM //
const requestCategory = (id) => {
    fetch(`https://api-charles-cantin.herokuapp.com/categories/${id}`)
        .then(response => response.json())
        .then((data) => {
            for(let i = 0; i < 6; i++) {
                const img = document.createElement('img');
                if(data.image_id[i] !== undefined) {
                    img.src = `${encodeURI(data.image_id[i].image.formats.small.url)}`;
                } else {
                    img.src = 'assets/images/charles-cantin-accueil_background.png';
                    //btnMore.remove();
                }
                galery.appendChild(img);
            }
        })
        .catch((err) => console.log(err));
};
requestCategory(8);


btnMore.addEventListener('click', () => {
    fetch(`https://api-charles-cantin.herokuapp.com/upload/files?${url}`)
        .then((res) => res.json())
        .then((data) => {
            for (let i = 0; i < 6; i++) {
                const img = document.createElement('img');
                img.src = 'assets/images/charles-cantin-accueil_background.png';
                galery.appendChild(img);
            }
        })
});

