let setProducts;
let cart;
let data = fetch('../data/data.json')
.then((response)=>response.json())
.then((data)=>{
    setProducts = JSON.parse(localStorage.getItem('setProducts')) ? JSON.parse(localStorage.getItem('setProducts')) : data;
    cart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    localStorage.setItem('setProducts', JSON.stringify(setProducts))
    renderItems(setProducts)
});
let adminTableDisplay = document.querySelector('.item-display');
let saveBtns;
let deleteBtns;

function renderItems(items){
adminTableDisplay.innerHTML = '';
setProducts.forEach((item, index) => {
    adminTableDisplay.innerHTML += `
    <tr>
        <td class="px-0 text-center">${item.id}</td>
        <td class="px-0 text-center">${item.gameTitle}</td>
        <td class="px-0 text-center">${item.price}</td>
        <td class="px-0 text-center"><img src="${item.image}" width="40px"></td>
        <td class="px-0 text-center">
        <button type="button" class="btn btn-primary my-1" data-bs-toggle="modal" data-bs-target="#${item.stringId}">Edit</button>
        <button type="button" class="btn btn-danger delete-button my-auto" data-id="${index}">Delete</button>
        </td>
    </tr>
    <div class="modal fade" id="${item.stringId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="exampleModalLabel">${item.gameTitle}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
        <div class="modal-body">
          <input type="text" class="form-control mb-1 new-title-${item.stringId}" placeholder="${item.gameTitle}" required>
          <input type="number" class="form-control mb-1 new-price-${item.stringId}" placeholder="${item.price}" required>
          <input type="url" class="form-control new-url-${item.stringId}" placeholder="${item.image}">
        </div>
        <div class="modal-footer d-flex justify-content-center">
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
    let newImageURL = document.querySelector(`.new-url-${setProducts[itemIndex].stringId}`)

    //* SHORTER METHOD
    setProducts[itemIndex].gameTitle = newTitle.value == '' ? setProducts[itemIndex].gameTitle : newTitle.value;
    setProducts[itemIndex].price = newPrice.value == '' ? setProducts[itemIndex].price : newPrice.value;
    setProducts[itemIndex].image = newImageURL.value == '' ? setProducts[itemIndex].image : newImageURL.value;
    localStorage.setItem('setProducts', JSON.stringify(setProducts))
    renderItems(setProducts)


    //* LONGER METHOD (DELETE IF YOU WANT I GUESS)
    // if(newTitle.value == '' && newPrice.value == ''){
    //     alert('Please fill in the required fields.')
    // } else if(newTitle.value != '' && newPrice.value == '' && newImageURL.value == '') {
    //     console.log('reached 1')
    //     setProducts[itemIndex].gameTitle = newTitle.value;
    //     localStorage.setItem('setProducts', JSON.stringify(setProducts))
    //     renderItems(setProducts);
    // } else if(newTitle.value != '' && newPrice.value != '' && newImageURL.value == ''){
    //     console.log('Reached 2')
    //     setProducts[itemIndex].gameTitle = newTitle.value;
    //     setProducts[itemIndex].price = newPrice.value
    //     localStorage.setItem('setProducts', JSON.stringify(setProducts))
    //     renderItems(setProducts);
    // } else {
    //     console.log('reached 3')
    //     setProducts[itemIndex].gameTitle = newTitle.value;
    //     setProducts[itemIndex].price = newPrice.value
    //     setProducts[itemIndex].image = newImageURL.value
    //     localStorage.setItem('setProducts', JSON.stringify(setProducts))
    //     renderItems(setProducts);
    // }
}

function removeItem(){
    let confirmation = prompt('Are you sure?\ny/n: ')
    let itemIndex = this.getAttribute('data-id')
    try{
        if(confirmation.toLocaleLowerCase() == 'y'){
            setProducts.splice(itemIndex, 1);
            localStorage.setItem('setProducts', JSON.stringify(setProducts))
            alert('ITEM WAS REMOVED')
            renderItems(setProducts)
        } else if(confirmation.toLocaleLowerCase() == 'n'){
            alert('ITEM WAS NOT REMOVED!')
        } else {
            alert("Invalid Input, Please reconfirm")
        }
    } catch(err){
        throw err
    }
}