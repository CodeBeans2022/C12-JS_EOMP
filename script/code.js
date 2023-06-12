let setProducts;
let cart;
let data = fetch('../data/data.json')
.then((response)=>response.json())
.then((data)=>{
    setProducts = JSON.parse(localStorage.getItem('setProducts')) ? JSON.parse(localStorage.getItem('setProducts')) : data;
    cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    localStorage.setItem('setProducts', JSON.stringify(setProducts))
    renderProducts(setProducts)
});


let productsDisplayElement = document.querySelector('.products-display');

let cartBtns;

function renderProducts(products){
    productsDisplayElement.innerHTML = '';
    products.forEach((item, index)=>{
        productsDisplayElement.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 d-flex flex-column justify-content-between">
        <h3>${item.gameTitle}</h3>
        <img src="${item.image}" class="mx-auto" width="300px" height="300px">
        <p><b>Genre:</b> ${item.genre}</p>
        <p><b>Price:</b> R${item.price}</p>
        
        <button type="button" class="btn btn-primary mb-5 cart-button" data-id="${index}">Add ${item.gameTitle} To Cart</button>
        </div>
        
       
     `
    });
    
    cartBtns = [...document.querySelectorAll('.cart-button')]
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click', addToCart)
    })
}



function addToCart(){
    let itemIndex = this.getAttribute('data-id');
    console.log(itemIndex)
    cart.push(setProducts[itemIndex]);
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Item has been added to your cart!')
}