//?Global

//API in use and pathways to categories
const productApi = 'https://fakestoreapi.com/products';
const electronicsCat = '/category/electronics';
const jeweleryCat = "/category/jewelery";
const mensCat = "/category/men's clothing";
const womensCat = "/category/women's clothing";

//variables targeting navbar elements
const electornicsLink = document.querySelector('.electronics');
const jeweleryLink = document.querySelector('.jewelery');
const mensLink = document.querySelector(".mens");
const womensLink = document.querySelector('.womens');

//variables targeting nav and display
const navbar = document.querySelector('nav');
const display = document.getElementById('display');


//?Functions
//fakestore async function to call upon API and jsonify
const fakeStore = async(endpoint) => {
    const response = await fetch(productApi + endpoint);
    const data = await response.json();
    console.log(data); //does log product info
    // console.log(data[0].category);
    // console.log(data[0]);
    // console.log(Object.keys(data));
    // console.log(Object.keys(data[0]));
}


//onload method targeting window and calling upon fakestore function
window.onload = (endpoint) => {
    // console.log("SOmething");//test
    fakeStore(""); //loads in the api
}

//?Event Listeners

//onclick each listener will load the specific api categories for the specified nav bar element
electornicsLink.addEventListener('click', e => {
    fakeStore(electronicsCat);
})
jeweleryLink.addEventListener('click', e => {
    fakeStore(jeweleryCat);
})
mensLink.addEventListener('click', e => {
    fakeStore(mensCat);
})
womensLink.addEventListener('click', e => {
    fakeStore(womensCat);
})