const title = document.getElementById('category-title');
let open = false;
// Revert class at each click on categories button dropdown //


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

