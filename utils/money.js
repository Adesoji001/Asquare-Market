 import{cart} from '../data/cart.js';
 
 
 export function formatCurrency(priceCents){
      return (priceCents/100).toFixed(2);
      
 }

 //formatCurrency(200);

 /*

export function totalAmount(priceCents, quantity){
               let totalPrice=0;
          cart.forEach((cartItem)=>{
               
          });
     }
          */