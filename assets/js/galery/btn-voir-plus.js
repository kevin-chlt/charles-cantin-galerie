const btnMoreContainer = document.getElementById('btn-more-container');
const btnMore = document.getElementById('btn-more');


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
