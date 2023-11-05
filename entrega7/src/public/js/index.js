const buttons= document.body.querySelectorAll(".addToCart");

buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        const{id}=e.target;
        addProduct(id)
    })
});

const addProduct=async(id)=>{
    try {
        const data= await fetch(`/api/carts/6546e3b3d3c3ed69d46e4474/product/${id}`, {
            method:'POST',
            headers:{
                "Content-type":"application/json"
            }
        });
        console.log(data)
        return data;
    } catch (error) {
        console.log(error.message)
    }
};