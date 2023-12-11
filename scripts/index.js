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

//*cart array that will contain items 
let cart = [];

//*variable targeting cart button
const cartBtn = document.querySelector('.cart');

//*variables targeting the table in the cart modal
const tBodyOne = document.querySelector('.tableBodyOne');
const subTotal = document.querySelector('.subTotal');
const tax = document.querySelector('.tax');
const shipping = document.querySelector('.shipping');
const total = document.querySelector('.total');

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
    let anchor = document.createElement('a'); ////change to button
    //*Set Attributes
    card.className = "card";
    card.style.width = "18rem";

    img.src = obj.image;
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

        submitToCart(item); //invokes submitToCart function passing the newly created object as the parameter
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

function submitToCart(item) {//pushes the item to the cart array -- if item already exists, it updates existing item's qty 
    let itemFilter = cart.find(match => {
        return match.id === item.id
    });
    
    if(itemFilter) {
        itemFilter.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    console.log(cart);
}

function displayCart() {
    console.log("Cart inside of modal", cart);
    removeElements(tBodyOne);
    removeElements(subTotal);
    removeElements(tax);
    removeElements(shipping);
    removeElements(total);
    cart.map(item =>{
        //*Create
        //item to display
        let tableRow = document.createElement('tr');
        let tableHeading = document.createElement('th');
        let itemTitle = document.createElement('td');
        let itemPrice = document.createElement('td');
        
        //*Attributes
        //items to display - calculating the price of item
        tableHeading.textContent = item.quantity;
        tableHeading.setAttribute("scope", "row");
        itemTitle.textContent = `${item.title} at $${item.cost} ea`;
        
        let itemFinder = cart.find(match => {
            return match.id === item.id
        });
        
        if(itemFinder.quantity > 1) { //updates the price of the item in cart if there is multiples of the same item
            item.cost = Number (item.cost);//transform item.cost to number instead of string
            item.cost = item.cost * item.quantity;//multiplies item.cost by item.quantity
            let roundNumber = item.cost;//variable to round number
            let price = roundNumber.toFixed(2);//price rounded to two digits (my computer was not allowing me to write item.cost.toFixed(2))
            itemPrice.textContent = `$${price}`;//displays price
            item.cost = item.cost / item.quantity;//resets item.cost so it doesn't endlessly add the price each time the cart is displayed and if conditional returns true
        } else {
            itemPrice.textContent = `$${item.cost}`;
        }
        
        
        
        //*Append
        //items to display
        tableRow.appendChild(tableHeading);
        tableRow.appendChild(itemTitle);
        tableRow.appendChild(itemPrice);
        
        tBodyOne.appendChild(tableRow);
    })
        //*Create
        //subtotal
        let subHeading = document.createElement('th');
        let subData = document.createElement('td');
        
        //tax
        let taxHeading = document.createElement('th');
        let taxData = document.createElement('td');
        
        //shipping
        let shippingHeading = document.createElement('th');
        let shippingData = document.createElement('td');

        //total
        let totalHeading = document.createElement('th');
        let totalData = document.createElement('td');

        //*Attributes
        //subtotal
        subHeading.textContent = 'Subtotal:';
        subHeading.setAttribute = ("scope", "row");
        subData.setAttribute = ("scope", "row");
        let sum = 0;
         /////toDo: try a forEach loop
        cart.forEach(item =>{
            num = Number (item.cost);
            qty = Number (item.quantity);
            sub = num * qty;
            sum += sub;
        })
        console.log('sum', sum.toFixed(2));
        subData.innerText =`$${sum.toFixed(2)}`;
        //tax
        taxHeading.textContent = 'Tax:';
        taxHeading.setAttribute = ('scope', 'row');
        taxData.setAttribute = ("scope", "row");

        let calcTax = .07;
        let taxSub = sum * calcTax;

        taxData.textContent = `$${taxSub.toFixed(2)}`;
 
         //shipping
         shippingHeading.textContent = 'Shipping';
         shippingHeading.setAttribute = ('scope', 'row');
         shippingData.setAttribute = ('scope', 'row');
         
         let calcShip = .10;
         let ship = sum * calcShip;
         
         shippingData.textContent = `$${ship.toFixed(2)}`;
         //total
         totalHeading.textContent = 'Total:';
         totalHeading.setAttribute = ('scope', 'row');
         totalHeading.className = 'table-success';
         totalData.setAttribute = ('scope', 'row');
         totalData.className = 'table-success';
         
        let calcTotal = sum + ship + taxSub;

         totalData.textContent = `$${calcTotal.toFixed(2)}`;
        
        //*Append
        subTotal.appendChild(subHeading);
        subTotal.appendChild(subData);

        tax.appendChild(taxHeading);
        tax.appendChild(taxData);

        shipping.appendChild(shippingHeading);
        shipping.appendChild(shippingData);

        total.appendChild(totalHeading);
        total.appendChild(totalData);
    
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

cartBtn.addEventListener('click', e => {
    console.log('click');
        displayCart();
})