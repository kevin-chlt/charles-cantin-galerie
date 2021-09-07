const request = (id) =>
    fetch(`http://192.168.1.145:1337/categories/${id}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data.name)
    });
