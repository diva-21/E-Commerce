const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");
// console.log("This is bar", bar);
if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
// to remove from the screen
if ("close") {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
// carts and products

const carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Cartton T-shirt rainbow",
    tag: "tshirtrainbow",
    price: 55,
    inCart: 0,
  },
  {
    name: "Cartton T-shirt green",
    tag: "tshirtgreen",
    price: 25,
    inCart: 0,
  },
  {
    name: "Cartton T-shirt red",
    tag: "tshirtred",
    price: 35,
    inCart: 0,
  },
  {
    name: "Cartton T-shirt pink",
    tag: "tshirtpink",
    price: 45,
    inCart: 0,
  },
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", (event) => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    event.preventDefault(); // on click it will not refresh the whole page
  });
}
// to keep the cart count as constant even on refresh
function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart-num span").textContent = productNumbers;
  }
}

// function cartNumbers(product,action) {

//   let productNumbers = localStorage.getItem("cartNumbers");
//   productNumbers = parseInt(productNumbers);
//   let cartItems = localStorage.getItem("productsInCart");
//   cartItems = JSON.parse(cartItems);
//   if (action) {
//     localStorage.setItem("cartNumbers", productNumbers - 1);
//     document.querySelector(".cart-num span").textContent = productNumbers - 1;
//   }
// //   console.log("The product clicked is", product);
//   if (productNumbers) {
//     localStorage.setItem("cartNumbers", productNumbers + 1);
//     document.querySelector(".cart-num span").textContent = productNumbers + 1;
//   } else {
//     localStorage.setItem("cartNumbers", 1);
//     document.querySelector(".cart-num span").textContent = 1;
//   }
//   setItems(product); // which will keep the whole product in the local storage
// }
function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if( action ) {
      localStorage.setItem("cartNumbers", productNumbers - 1);
      document.querySelector('.cart-num span').textContent = productNumbers - 1;
      console.log("action running");
  } else if( productNumbers ) {
      localStorage.setItem("cartNumbers", productNumbers + 1);
      document.querySelector('.cart-num span').textContent = productNumbers + 1;
  } else {
      localStorage.setItem("cartNumbers", 1);
      document.querySelector('.cart-num span').textContent = 1;
  }
  setItems(product);
}
function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems); // to convert the string into json object
  if (cartItems != null) {
    // if some object is already present,
    // then we will check if the product is already present or not
    if (cartItems[product.tag] == undefined) {
      // if not, then we will add the product with existing old keys
      cartItems = {
        ...cartItems, // spread operator for destructuring the key value pairs of the object
        [product.tag]: product, // this will add the new key value pair
      };
    }
    // if its a new item then it will increase the inCart from 0 to 1,
    // else the old value inCaart will be increased
    cartItems[product.tag].inCart += 1;
  } else {
    // if initially its empty with null value
    //setting the product in the local storage
    // keeping inCart as 1 as we are adding the product for the first time
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }
  // setting the cartItems in the local storage where value is of string type
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
// function totalCost(product){
//     // console.log("The product price is", product.price);
//     let cartCost = localStorage.getItem('totalCost');
//     if(cartCost != null){
//         cartCost = parseInt(cartCost);
//         localStorage.setItem("totalCost", cartCost + product.price);
//     }else{
//         localStorage.setItem("totalCost", product.price);
//     }
// }

function totalCost( product, action ) {
  let cart = localStorage.getItem("totalCost");

  if( action) {
      cart = parseInt(cart);

      localStorage.setItem("totalCost", cart - product.price);
  } else if(cart != null) {
      
      cart = parseInt(cart);
      localStorage.setItem("totalCost", cart + product.price);
  
  } else {
      localStorage.setItem("totalCost", product.price);
  }
}
let imgmapper={
    "tshirtrainbow":"img/products/f1.jpg",
    "tshirtgreen":"img/products/f2.jpg",
    "tshirtred":"img/products/f3.jpg",
    "tshirtpink":"img/products/f4.jpg",
}
function displayCart(){
    let cartItems=localStorage.getItem('productsInCart');
    let cartCost=localStorage.getItem('totalCost');
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector('.products');
    if(cartItems && productContainer){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item=>{
          productContainer.innerHTML += `
          <tr>
              <td><a href="#"><i class="far fa-times-circle"></i></a></td>
              <td><img src=${imgmapper[item.tag]} alt=""></td>
              <td>${item.tag}</td>
              <td>Rs ${item.price}</td>
              <td><input type="number" value="${item.inCart}"></td>
              <td>Rs ${item.price*item.inCart}</td>
          </tr>
          `
      });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Basket Total</h4>
            <h4 class="basketTotal">Rs ${cartCost}</h4>
        </div>
        <div class="checkout"><button class="normal" onclick="checkout()">Place Order</button></div>
        `
    }

}
function checkout(){
  emptyCart();
  alert("Your order has been placed successfully.");
}

function emptyCart(){
  localStorage.clear();
  location.reload();
}
displayCart();
onLoadCartNumbers();
