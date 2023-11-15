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
        const data= await fetch(`/api/carts/6547bba0e6a73dd65b6adc1d/product/${id}`, {
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