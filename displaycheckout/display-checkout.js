
import{cart, updateCart, saveQuantity, deleteButton} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryoption.js';
import{displayOrderSummary, save,update, inputBtn,deleteProduct,deliveryBtn} from './display-order.js';
import{OrderSummary} from './display-summary.js';


// function for whole checkoutpage UI
export function renderCheckOut(){
          let checkOut='';
          const checkoutBody=document.querySelector('body');
          const html=`
                   <div class="checkout-header">
      <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png">
            <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
          </a>
        </div>

        <div class="checkout-header-middle-section js-checkout-quantity">
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    </div>

    <div class="main">
      <div class="page-title">Review your order</div>

      <div class="checkout-grid">
        <div class="order-summary js-order-summary">
          ${displayOrderSummary()}
        </div>

        <div class="payment-summary">
          ${OrderSummary()}
        </div>
      </div>
    </div>
        </div>
      </div>
    </div>   
          `;
      checkoutBody.innerHTML=html;
       save();
      update();
      inputBtn();
      deleteProduct();
      cartQuantity();
      deliveryBtn();
      
}

export function cartQuantity(){
         let totalQuantity=0;
    const checkoutQuantity=document.querySelector('.js-checkout-quantity');
            let status='';
    cart.forEach((cartItem)=>{
          totalQuantity+=cartItem.quantity;
  });
  if(totalQuantity===undefined || isNaN(totalQuantity)){
        totalQuantity=0;
  }else if(totalQuantity===1){
       status='item';
  }else if(totalQuantity>1){
        status='items';
  }
    checkoutQuantity.innerHTML=`
        Checkout (<a class="return-to-home-link"
            href="amazon.html">${totalQuantity} ${status}</a>)
    `;
   return totalQuantity;
}





