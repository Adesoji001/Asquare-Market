import{cart, updateCart, saveQuantity, deleteButton, saveStorage} from '../data/cart.js';
import { products } from '../data/products.js';
import {formatCurrency}from '../utils/money.js';
import {deliveryOptions} from '../data/deliveryoption.js';
import{renderCheckOut} from './display-checkout.js';


// function for product container UI
export function displayOrderSummary(){
  let orderSummary='';
cart.forEach((cartItem)=>{
     let matchingItem;
     let matchingDeliveryOptionId;
     products.forEach((product)=>{
            if(product.id===cartItem.productId){
                  matchingItem=product;
            }
     });
     deliveryOptions.forEach((deliveryOption)=>{
                    if(cartItem.deliveryOptionId===deliveryOption.id){
                          matchingDeliveryOptionId=deliveryOption;
                    }
     });
            const today=dayjs();
            const expectedDeliveryDate=today.add(matchingDeliveryOptionId.day,'days').format('dddd,MMMM,D');
          const html=`
                <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${expectedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="input-quantity js-input-quantity js-input-quantity-${cartItem.productId}" data-product-id="${matchingItem.id}">
                  <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingItem.id}">
                      save                  
                  </span> 
                 <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliverOptionDisplay(cartItem)}
              </div>
            </div>
          </div>
          `;
        orderSummary+=html;
    });
      //deliveryBtn();
      return orderSummary;
}

// The event listener for updating the cart
export function update(){
       const updateButton=document.querySelectorAll('.js-update-quantity');
updateButton.forEach((updateBtn)=>{
    updateBtn.addEventListener('click', ()=>{
        const productId=updateBtn.dataset.productId;
        updateCart(productId);
       
   
       
    });
});

}

// the event listener for saving quantity to the cart
export function save(){
const saveButton= document.querySelectorAll('.js-save-quantity');
saveButton.forEach((saveBtn)=>{
        saveBtn.addEventListener('click', ()=>{
           const productId=saveBtn.dataset.productId;
            saveQuantity(productId);
              renderCheckOut();
              //deliverOptionDisplay();
        });
});
}

// function for the input button
export function inputBtn(){
      const inputValue=document.querySelectorAll('.js-input-quantity');
inputValue.forEach((input)=>{
        input.addEventListener('keydown', (event)=>{
                 if(event.key === 'Enter'){
                  const productId=input.dataset.productId;
                 saveQuantity(productId);
                  renderCheckOut();
                 }
        });
});
}

// function for deleteProduct
export function deleteProduct(){
      const deleteBtn=document.querySelectorAll('.js-delete-quantity');
          deleteBtn.forEach((deleteItem)=>{
            deleteItem.addEventListener('click',()=>{
              const productId=deleteItem.dataset.productId;
              deleteButton(productId);
             renderCheckOut();
      });
});
}


// function for deliveryoptionsUI
function deliverOptionDisplay(cartItem){
  let displayOptions='';
  let matchingOption;
  deliveryOptions.forEach((deliveryOption)=>{       
              const today=dayjs();  
              const expectedDeliveryDate= today.add(deliveryOption.day,'days').format('dddd, MMMM, D');
              const priceString=deliveryOption.priceCents===0? 'FREE-Shipping':`$${formatCurrency(deliveryOption.priceCents)}-Shipping`;

              const isChecked=deliveryOption.id===cartItem.deliveryOptionId? 'checked':'';
              
        const html = `
                  <div class="delivery-option js-delivery-option" data-product-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}" >
                  <input type="radio" ${isChecked}
                    class="delivery-option-input js-delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      ${expectedDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                     ${priceString}
                    </div>
                  </div>
                </div>
        `;
        displayOptions+=html;
  });
        
      return displayOptions;
}

// function for the delivery buttons
export function deliveryBtn(){
      const optionButtons= document.querySelectorAll('.js-delivery-option');
            optionButtons.forEach((optionButton)=>{
                  optionButton.addEventListener('click', ()=>{
                      const radioBtn=optionButton.querySelector('.js-delivery-option-input');
                        const productId=optionButton.dataset.productId;
                        const deliveryOptionId=optionButton.dataset.deliveryOptionId;
                        cart.forEach((cartItem)=>{
                          if(cartItem.productId===productId){
                                cartItem.deliveryOptionId=deliveryOptionId;
                          }                                
                        });
                     radioBtn.checked=true;
                     renderCheckOut();
                     saveStorage();
                  });
            });
  }
    // function for shipping and Handling


    /*
  function shippingHandling(cartItem){
                let matchingId;
               let totalShippingCost=0;
              deliveryOptions.forEach((deliveryOption)=>{           
                      if(cartItem.deliveryOptionId===deliveryOption.id){
                              matchingId=deliveryOption;
                      }
                      
                        totalShippingCost+=matchingId.priceCents;
              });
              
              
              console.log(totalShippingCost);
              return totalShippingCost;
    }
  //shippingHandling(cartItem);
  */