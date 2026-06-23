import{cart, updateCart, saveQuantity, deleteButton} from '../data/cart.js';
import { cartQuantity } from './display-checkout.js';
import {formatCurrency} from '../utils/money.js';
import { products } from '../data/products.js';
//import { shippingHandling } from './display-order.js';
import { deliveryOptions } from '../data/deliveryoption.js';

export function OrderSummary(){        
  let displayOrder='';
  let totalAmount=0;
  let totalShipping=0;
let totalQuantity=0;
let totalPriceCents=0;
let totalBeforeTax=0;
let estimatedTax=0;
let totalOrder=0;
    cart.forEach((cartItem)=>{
     
            let matchingProduct;
            products.forEach((product)=>{
                      if(product.id===cartItem.productId){
                            matchingProduct=product;            
                          
                      } 
            });
            if(matchingProduct){              
                  totalQuantity=cartItem.quantity;
                totalPriceCents=matchingProduct.priceCents;
            }       

                totalAmount+=totalPriceCents*totalQuantity;

               deliveryOptions.forEach((deliveryOption)=>{
                      if(cartItem.deliveryOptionId===deliveryOption.id){
                        totalShipping+=deliveryOption.priceCents;
                      }
                      totalBeforeTax=totalShipping+totalAmount;
                      estimatedTax= totalBeforeTax*0.1;
                      totalOrder=totalBeforeTax+estimatedTax;
               });
    });
      totalShipping=formatCurrency(totalShipping);
    totalAmount=formatCurrency(totalAmount);
    totalBeforeTax=formatCurrency(totalBeforeTax);
    estimatedTax=formatCurrency(estimatedTax);
    totalOrder=formatCurrency(totalOrder);
    
    
  const html=`
              <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity()}):</div>
            <div class="payment-summary-money">$${totalAmount}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShipping}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${estimatedTax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalOrder}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
      displayOrder=html;
      return displayOrder;
}