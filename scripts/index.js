//?Global

//*API in use and pathways to categories
const productApi = 'https://fakestoreapi.com/products';
const electronicsCat = '/category/electronics';
const jeweleryCat = "/category/jewelery";
const mensCat = "/category/men's clothing";
const womensCat = "/category/women's clothing";

//*variables targeting navbar elements
const electornicsLink = document.querySelector('.electronics');
const jeweleryLink = document.querySelector('.jewelery');
const mensLink = document.querySelector(".mens");
const womensLink = document.querySelector('.womens');

//*variables targeting nav and display
const navbar = document.querySelector('nav');
const display = document.getElementById('display');

let cart = []; //toDO : add cart functionality


//?Functions
const removeElements = element => {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//*fakestore async function to call upon API and jsonify
const fakeStore = async(endpoint) => {
    const response = await fetch(productApi + endpoint);
    const data = await response.json();
    //console.log(data); //does log product info

    removeElements(display); //*clears previously displayed cards
    displayCards(data);//*gives displayCard function access to the objects within the specified api
}

function displayCards(api) {
    console.log(api);

    /////toDo: loop through the api data with a method
    //toDo : create accordion
    /////toDo : display proper category
    /////toDo : Clear previous category display

    api.map(obj => {
    //*Create Elements
    let card = document.createElement('div');
    let img = document.createElement('img');
    let body = document.createElement('div');
    let title = document.createElement('h5');
    let accordion = document.createElement('div');
    let accordItemOne = document.createElement('div');
    let accordItemTwo = document.createElement('div');
    let accordHeaderOne = document.createElement('h2');
    let accordHeaderTwo = document.createElement('h2');
    let accordBtnOne = document.createElement('div');
    let accordBtnTwo = document.createElement('div');
    let collapseOne = document.createElement('div');
    let collapseTwo = document.createElement('div');
    let text = document.createElement('p');
    let price = document.createElement('p');
    let anchor = document.createElement('a'); //change to button
    //*Set Attributes
    card.className = "card";
    card.style.width = "18rem";

    img.src = obj.image; //need object from array
    img.alt = obj.title;
    img.className = "card-img-top";

    body.className = "card-body";
    title.className = "card-title";
    title.textContent = obj.title;

    accordion.className = "accordion";
    accordion.id = "accordionExample";
    accordItemOne.className = "accordion-item";
    accordItemTwo.className = "accordion-item";
    accordHeaderOne.className = "accordion-header";
    accordHeaderTwo.className = "accordion-header";
    accordBtnOne.className = "accordion-button";
    accordBtnOne.setAttribute("data-bs-toggle", "collapse")
    accordBtnOne.setAttribute("data-bs-target", `#collapseOne${obj.id}`)
    accordBtnOne.setAttribute("aria-expanded", "true")
    accordBtnOne.setAttribute("aria-controls", "collapseOne")
    accordBtnOne.textContent = "Description";
    accordBtnTwo.className = "accordion-button";
    accordBtnTwo.setAttribute("data-bs-toggle", "collapse")
    accordBtnTwo.setAttribute("data-bs-target", `#collapseTwo${obj.id}`)
    accordBtnTwo.setAttribute("aria-expanded", "false")
    accordBtnTwo.setAttribute("aria-controls", "collapseTwo")
    accordBtnTwo.textContent = "Price";
    collapseOne.className = "accordion-collapse collapse show";
    collapseOne.setAttribute("accordion-collapse", "collapse show")
    collapseOne.setAttribute("data-bs-parent", "#accordionExample")
    collapseOne.id = `collapseOne${obj.id}`;
    collapseTwo.id = `collapseTwo${obj.id}`;
    collapseTwo.className = "accordion-collapse collapse";
    collapseTwo.setAttribute('data_bs_parent', '#accordionExample')


    text.className = "card-text";
    text.textContent = obj.description;
    price.className = "card-text";
    price.textContent = `$${obj.price.toFixed(2)}`;
    anchor.className = "btn btn-primary";
    anchor.textContent = "Add to Cart";
    anchor.onclick = () => {
       let item = {
            id: obj.id,
            title: obj.title,
            cost: obj.price.toFixed(2),
            quantity: 1,
        }

        submitToCart(item);
    }
    //*Append
    body.appendChild(title);

    body.appendChild(accordion);
    accordion.appendChild(accordItemOne);
    accordion.appendChild(accordItemTwo);

    accordItemOne.appendChild(accordHeaderOne);
    accordHeaderOne.appendChild(accordBtnOne);
    accordItemOne.appendChild(collapseOne);
    collapseOne.appendChild(text);

    accordItemTwo.appendChild(accordHeaderTwo);
    accordHeaderTwo.appendChild(accordBtnTwo);
    accordItemTwo.appendChild(collapseTwo);
    collapseTwo.appendChild(price);
    // body.appendChild(text);
    // body.appendChild(price);
    body.appendChild(anchor);

    card.appendChild(img);
    card.appendChild(body);

    display.appendChild(card);
    });
}

function submitToCart(item) {
    cart.push(item);
    console.log(cart);
}

//*onload method targeting window and calling upon fakestore function
window.onload = (endpoint) => {
    // console.log("SOmething");//test
    fakeStore(""); //loads in the api
}

//?Event Listeners

//*onclick each listener will load the specific api categories for the specified nav bar element
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