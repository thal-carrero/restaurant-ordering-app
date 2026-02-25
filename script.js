import { menuArray  } from "./data.js";

// Taking control of the components of the DOM

const menu = document.getElementById("menu")
const checkout = document.getElementById("checkout-section")
const cart = document.querySelector(".cart-elements")
const order = []
const checkoutTotal = document.getElementById("checkout-total")
const orderBtn = document.getElementById("order-btn")
const paymentModal = document.getElementById("payment-modal")
const paymentForm = document.getElementById("payment-form")
const orderComplete = document.getElementById("order-complete")


// Render the content of the menu 
renderMenu()
function renderMenu() {
    const menuHtml = menuArray.map(item => {
        return `
        <div class="menu-item">
                 <p class="item-graphic">${item.emoji}</p>
                 <div class="item-text">
                   <p class="item-name">${item.name}</p>
                   <p class="item-ingredients">${item.ingredients.join(', ')}</p>
                   <p class="item-price">$${item.price}</p>
                 </div>
                 <button class="add-btn" data-item-id="${item.id}">+</button>
               </div>
        
        `
    }).join('')
    menu.innerHTML = menuHtml
}


// Checkout functionality

menu.addEventListener("click", function addToCart(e){
  if(e.target.dataset.itemId){
    checkout.classList.remove('hidden')
    orderItem(e.target.dataset.itemId)
  
  }})

  function orderItem(id) {
    menuArray.forEach(item => {
        if(item.id === Number(id)){
            order.push(menuArray[id])
        }
    })
  renderOrder()
  }

  function renderOrder(){
    let cartHtml = order.map(item => {
       return `
         <div class="checkout-item">
            <p class="item-name">${item.name}</p>
            <button class="remove-btn" data-remove-id="${item.id}">Remove</button>
            <p class="item-price">$${item.price}</p>
        </div>
        `
    }).join('')
    let orderTotal = order.reduce((total, currentItem) => total + currentItem.price, 0 )
     if(order.length > 1){
      const mealDiscount = (orderTotal * 0.20).toFixed(2) // 20% Discount if you order 2 or more items of the menu
       orderTotal -= mealDiscount
       cartHtml += `
        <div class="checkout-item">
            <p class="item-name">Discount  20%</p>
            <p class="item-price">-$${mealDiscount}</p>
        </div>
       `
      
    }
    checkoutTotal.textContent = '$' + orderTotal
    cart.innerHTML = cartHtml
  }

  // Remove item logic
checkout.addEventListener("click", function removeFromCart(e){
    if(e.target.dataset.removeId){
        order.splice(e.target.dataset.removeId, 1)
        renderOrder() // Its nit working properly 
    }
})


// Payment 
orderBtn.addEventListener("click", function openPaymentModal(){
    paymentModal.classList.toggle('hidden')
})

paymentForm.addEventListener('submit', function (e){
    e.preventDefault()
    paymentModal.classList.toggle('hidden')
    checkout.classList.add("hidden")
    orderComplete.classList.remove("hidden")

}) 