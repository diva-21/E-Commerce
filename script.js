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