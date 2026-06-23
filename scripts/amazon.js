import {products} from '../data/products.js';
import {formatCurrency} from '../utils/money.js';
import { saveStorage, addToCart, cart } from '../data/cart.js';

 
function renderPage(){
  const productsGrid=document.querySelector('.js-products-grid');
  let displayHTML='';
  products.forEach((product)=>{
                const html=`
                        <div class="product-container">
                <div class="product-image-container">
                  <img class="product-image"
                    src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                          ${product.name}
                </div>

                <div class="product-rating-container">
                 <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
                  <div class="product-rating-count link-primary">
                    ${product.rating.count}
                  </div>
                </div>

                <div class="product-price">
                  $${formatCurrency(product.priceCents)}
                </div>

                <div class="product-quantity-container">
                  <select class="js-select-input-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-to-cart-${product.id}">
                
                </div>

                <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
                  Add to Cart
                </button>
              </div>
                `;
                displayHTML+=html;
        });
        productsGrid.innerHTML=displayHTML;
        upadteCartQuantity();
}
renderPage();


const addToCartBtn= document.querySelectorAll('.js-add-to-cart-button');
addToCartBtn.forEach((addBtn)=>{
        addBtn.addEventListener('click', ()=>{
          const cartQuantity=document.querySelector('.js-cart-quantity');
          const productId= addBtn.dataset.productId;
          addToCart(productId);
          upadteCartQuantity();
        
        });
});

function upadteCartQuantity(){
  const showCartQuantity=document.querySelector('.js-cart-quantity');
      let cartQuantity=0;
      cart.forEach((cartItem)=>{
            cartQuantity+=cartItem.quantity;
      });
      showCartQuantity.innerHTML=cartQuantity;
}
