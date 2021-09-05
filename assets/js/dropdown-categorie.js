// Revert class at each click on categories button dropdown //
const list = document.getElementById('category-list');
const title = document.getElementById('category-title');
let open = false;

title.addEventListener('click', () => {
    if (!open) {
        title.className = 'title-open';
        list.className = 'open';
        return open = true;
    }
        title.className = 'title-close';
        list.className = 'close';
        return open = false;
});


// Put ID on category items //
const setIdOnCategory = () => {
    const listLength = list.children.length;
    const allLi = list.children;

    for(let i = 0; i < listLength; i++) {
        allLi[i].setAttribute('id', 'category-'+ i);
    }

    createEvent(listLength);
}
// Create event listener for each category & add function to put the "active" CSS class to the category item clicked   //


const createEvent = (listLength) => {
    let categoryActiveIndex = 7;
    for(let i = 0; i < listLength; i++) {

        const category = document.getElementById('category-'+ i);
        category.addEventListener('click', () => {
            const oldCategory = document.getElementById('category-'+ categoryActiveIndex);
            oldCategory.classList.remove('active-category');
            category.className = 'active-category';
            return categoryActiveIndex = i;
        });

    }
}
setIdOnCategory();

