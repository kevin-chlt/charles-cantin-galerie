const galery = document.getElementById('container-images-1');

// Clean the galery image list //
const clearGalery = () => {
    let galeryLength = galery.children.length -1;
    for(let i = galeryLength; i >= 0; i--) {
        galery.children[i].remove()
    }
};

// Do the category request and create the img in DOM //
const  requestCategory = (id) => {
    fetch(`https://api-charles-cantin.herokuapp.com/categories/${id}`)
        .then(response => response.json())
        .then((data) => {
            data.image_id.forEach((e) => {
                const img = document.createElement('img');
                let url = e.image.formats.small.url;
                img.src = `https://api-charles-cantin.herokuapp.com${encodeURI(url)}`;
                galery.appendChild(img);
            })
        })
        .catch((err) => console.log(err));
};
requestCategory(8);

