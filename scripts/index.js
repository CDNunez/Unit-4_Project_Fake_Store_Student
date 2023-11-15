//?Global

let productApi = 'https://fakestoreapi.com/products';
fetch(productApi)
.then(response => response.json())
.then(json => console.log(json))