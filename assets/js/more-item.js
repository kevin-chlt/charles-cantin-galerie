// Put ID on category items //
const setIdOnCategory = () => {
    const list = document.getElementById('category-list');
    const listLength = list.children.length;
    const allLi = list.children;

    for(let i = 0; i < listLength; i++) {
        allLi[i].setAttribute('id', 'category-'+ i);
    }
}
setIdOnCategory();

// Create event listener for each category //
const createEvent = () => {
    for(let i = 0; i < 7; i++) {
        const category = document.getElementById('category-'+ i);
        category.addEventListener('click', () =>{
            category.classList.add('open');
        });
    }
}
createEvent();