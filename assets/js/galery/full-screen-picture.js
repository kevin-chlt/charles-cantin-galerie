// Create the modal when click on the pictures //
window.addEventListener('click', (e) => {
    if(e.target.nodeName === 'IMG' && e.target.parentElement.nodeName === 'FIGURE') {
        const modal = document.createElement('div');
        modal.className = 'modal';

        const picture = document.createElement('img');
        picture.className = 'full-screen-pic'
        picture.src = e.target.src;

        modal.append(picture)
        document.body.append(modal);

        if(window.matchMedia("max-width: 500px")) {
            const closeBtn = document.createElement('span');
            closeBtn.textContent = "X";
            closeBtn.className = 'close-modal'
            modal.append(closeBtn);
        }
    }
});


// Delete the modal when click on the background or click on the cross in responsive screen //
window.addEventListener('click', (e) => {
    if(e.target.className === 'modal'){
        e.target.remove();
    }
    if(e.target.className === 'close-modal') {
        document.querySelector('.modal').remove()
    }
})

