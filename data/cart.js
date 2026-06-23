
export let cart;

loadFromStorage();


function loadFromStorage(){
        cart=JSON.parse(localStorage.getItem('cart'))||
            [];
}


export function addToCart(productId){
  let message='product';
              const displayMessage=document.querySelector(`.js-added-to-cart-${productId}`);
          const selectedItem=document.querySelector(`.js-select-input-${productId}`);
          const selectedInput=Number(selectedItem.value);
              let matchingItem;
              cart.forEach((cartItem)=>{
                  if(productId===cartItem.productId){
                        matchingItem=cartItem;
                  }
              });
              if(matchingItem){
                    matchingItem.quantity+=selectedInput;
              }else{
                 cart.push({
                productId:productId,
                quantity:selectedInput,
                deliveryOptionId:'1'
              });
              }
              if(selectedInput>1){
                    message='products';
              }
              displayMessage.innerHTML=`<img src="images/icons/checkmark.png">
              ${selectedInput} ${message}
                  Added
              `;
              displayMessage.classList.add('added');
              setInterval(()=>{
                displayMessage.classList.remove('added');
              },2000);
             
              console.log(cart);
              saveStorage();

}

export function updateCart(productId){
      const container= document.querySelector(`.js-cart-item-container-${productId}`);
      if(productId){
          container.classList.add('container');
      }

}

// fucntion to add more quantity
export function saveQuantity(productId){
          const inputElement=document.querySelector(`.js-input-quantity-${productId}`);
          const inputEle= Number(inputElement.value);
          cart.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                  if(inputEle===0 || isNaN(inputEle) || inputEle<0 || inputEle>1000){
                        alert('input value is invalid');
                  }else{
                     cartItem.quantity+=inputEle; 
                  }
              
              };            
            saveStorage();
}
)};

export function deleteButton(productId){
      const newCart=[];
      cart.forEach((cartItem)=>{
            if(cartItem.productId!==productId){
                  newCart.push(cartItem);
            }
      });
      cart=newCart;
      saveStorage();
     
}

export function saveStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}