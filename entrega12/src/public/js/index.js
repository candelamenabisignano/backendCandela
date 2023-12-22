const buttons= document.body.querySelectorAll(".addToCart");
const cart= document.body.querySelector('.cartId');
const cartArray=cart.innerHTML.split('')
const cartId= cartArray.splice(10,cartArray.length-1).join('')

buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        const {id}= e.target;
        addProduct(cartId,id)
    })
});

const addProduct=async(cartId,productId)=>{
    try {
        const data= await fetch(`/api/carts/${cartId}/product/${productId}`, {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            }
        });
        return data;
    } catch (error) {
        console.log(error.message)
    }
};