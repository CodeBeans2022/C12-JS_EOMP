let data = fetch('../data/data.json')
.then((response)=>response.json())
.then((data)=>{
    setProducts = JSON.parse(localStorage.getItem('setProducts')) ? JSON.parse(localStorage.getItem('setProducts')) : data;
    localStorage.setItem('defaultProducts', JSON.stringify(data))
    renderProducts(data)
});

let cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];

let productsDisplayElement = document.querySelector('.products-display');
let saveBtns;
let deleteBtns;
let setProducts;

function renderProducts(products){
    productsDisplayElement.innerHTML = '';
    products.forEach((item, index)=>{
        productsDisplayElement.innerHTML += `
        <div class="col-12 col-sm-6 col-md-4 d-flex flex-column justify-content-between">
        <h3>${item.gameTitle}</h3>
        <img src="${item.image}" class="mx-auto" width="300px" height="300px">
        <p><b>Genre:</b> ${item.genre}</p>
        <p><b>Price:</b> R${item.price}</p>
        
        <button type="button" class="btn btn-primary mb-5 delete-button" data-id="${index}">Add To Cart ${item.gameTitle}</button>
        <button type="button" class="btn btn-primary mb-1" data-bs-toggle="modal" data-bs-target="#${item.stringId}">
        Edit ${item.gameTitle}
        </button>
        <button type="button" class="btn btn-danger mb-5 delete-button" data-id="${index}">Delete ${item.gameTitle}</button>
        </div>
        
        <div class="modal fade" id="${item.stringId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">${item.gameTitle}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
          <div class="modal-body">
            <input type="text" class="form-control new-title-${item.stringId}" placeholder="New Title">
            <input type="number" class="form-control new-price-${item.stringId}" placeholder="New Price">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary saveBtn" data-id="${index}" data-bs-dismiss="modal">Save changes</button>
          </div>
        </div>
      </div>
    </div>
     `
    });
    saveBtns = [...document.querySelectorAll('.saveBtn')]
    saveBtns.forEach((btn)=>{
        btn.addEventListener('click', changeValues)
    })
    deleteBtns = [...document.querySelectorAll('.delete-button')]
    deleteBtns.forEach((btn)=>{
        btn.addEventListener('click', removeItem)
    })
}

function changeValues(){
    let itemIndex = this.getAttribute('data-id');
    let newTitle = document.querySelector(`.new-title-${setProducts[itemIndex].stringId}`)
    let newPrice = document.querySelector(`.new-price-${setProducts[itemIndex].stringId}`)
    setProducts[itemIndex].gameTitle = newTitle.value;
    setProducts[itemIndex].price = newPrice.value
    renderProducts(setProducts);
}

function removeItem(){
    let confirmation = prompt('Are you sure?\ny/n: ')
    let itemIndex = this.getAttribute('data-id')
    if(confirmation.toLocaleLowerCase() == 'y'){
        setProducts.splice(itemIndex, 1);
        alert('ITEM WAS REMOVED')
        renderProducts()
    } else if(confirmation.toLocaleLowerCase() == 'n'){
        alert('ITEM WAS NOT REMOVED!')
    } 
    else {
        alert("Invalid Input, Please reconfirm")
    }
}