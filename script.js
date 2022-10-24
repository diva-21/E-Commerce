const bar=document.getElementById('bar');
const nav=document.getElementById('navbar');
const close=document.getElementById('close');
// console.log("This is bar", bar);
if(bar){
    bar.addEventListener('click',()=>{
        nav.classList.add('active');
    })
}
// to remove from the screen
if('close'){
    close.addEventListener('click',()=>{
        nav.classList.remove('active');
    })
}
// carts and products
document.querySelector('.add-cart').addEventListener('click', function(event) {
    event.preventDefault();
  });
let products=[
    {
        name:'Cartton T-shirt rainbow',
        tag:'tshirtrainbow',
        price:15,
        inCart:0
    },
    {
        name:'Cartton T-shirt green',
        tag:'tshirtgreen',
        price:15,
        inCart:0
    },
    {
        name:'Cartton T-shirt red',
        tag:'tshirtred',
        price:15,
        inCart:0
    },{
        name:'Cartton T-shirt pink',
        tag:'tshirtpink',
        price:15,
        inCart:0
    }
]
const carts=document.querySelectorAll('.add-cart');
for(let i=0;i<carts.length;i++){
    carts[i].addEventListener('click',(event)=>{
        cartNumbers();
        event.preventDefault(); // on click it will not refresh the whole page
    })
}
// to keep he cart count as constant even on refresh
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart-num span').textContent=productNumbers;
    }
}
function cartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    productNumbers=parseInt(productNumbers);
    if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers+1);
        document.querySelector('.cart-num span').textContent=productNumbers+1;
    }
    else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart-num span').textContent=1;
    }
}
onLoadCartNumbers();
