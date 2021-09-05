const list = document.getElementById('category-list');
const title = document.getElementById('category-title');

let open = false;

title.addEventListener('click', () => {
    if (!open) {
        title.classList.add('title-open');
        title.classList.remove('title-close');
        list.classList.add('open');
        list.classList.remove('close');
        open = true;
    } else {
        title.classList.add('title-close')
        title.classList.remove('title-open');
        list.classList.add('close');
        list.classList.remove('open');
        open = false;
    }
});