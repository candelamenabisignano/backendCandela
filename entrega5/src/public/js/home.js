const socket=io();


const submitAdd= document.body.querySelector('#submitAdd');
const submitDelete= document.body.querySelector('#submitDelete');
const container= document.body.querySelector("#productsContainer");
const formAdd= document.body.querySelector('#addProducts')
const inputId= document.body.querySelector('#inputId')

const addProducts= async(product)=>{
    try {
       await fetch("/api/products",{
        method:"POST",
        body:JSON.stringify(product),
        headers:{
            "Content-type":"application/json"
        }
       }) 
    } catch (error) {
        console.log(error)
    }
};

submitAdd.addEventListener('click', async(e)=>{
    try {

        e.preventDefault();
        const {title, description, code,price, stock, category}=formAdd.elements;
        const product={
            title:title.value,
            description:description.value,
            code:code.value,
            price:price.value,
            stock:stock.value, 
            category:category.value
        };
        await addProducts(product)
        
    } catch (error) {
        console.log(error)
    }

});

submitDelete.addEventListener('click', async(e)=>{

    try {
        e.preventDefault();
        const id= Number(inputId.value);
        socket.emit('deleteProducts', id);
        inputId.value=''
    } catch (error) {
        console.log(error)
    }

});

socket.on('productsNew', data=>{
    container.innerHTML='';
    data.forEach(p => {
        container.innerHTML+=`
        <div>
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <p>${p.id}</p>
        </div>
        `
    });
});











