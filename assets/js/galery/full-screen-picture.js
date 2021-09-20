// Create the modal when click on the image //
window.addEventListener('click', (e) => {
    if(e.target.nodeName === 'IMG' && e.target.parentElement.nodeName === 'FIGURE') {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const picture = document.createElement('img');
        picture.className = 'full-screen-pic'
        picture.src = e.target.src;

        modal.append(picture)
        document.body.append(modal);
    }
})

// Delete the modal when click on the background modal //
window.addEventListener('click', (e) => {
    if(e.target.className === 'modal'){
        e.target.remove();
    }
})
