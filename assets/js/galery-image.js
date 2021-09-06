const req = fetch('http://localhost:1337/images')
    .then(response => response.json())
    .then((response) => {
        return response;
    })