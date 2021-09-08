const list = document.getElementById('category-list');
const title = document.getElementById('category-title');

// Revert class at each click on categories button dropdown //
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
let categoryActiveId = 8;
// Create event listener for each category & add function to put the "active" CSS class to the category item clicked   //
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