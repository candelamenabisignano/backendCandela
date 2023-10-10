const socket=io();


const submitAdd= document.body.querySelector('#submitAdd');
const submitDelete= document.body.querySelector('#submitDelete');
const container= document.body.querySelector("#productsContainer");
const formAdd= document.body.querySelector('#addProducts')
const formDelete=document.body.querySelector('#deleteProducts');

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
const deleteProducts= async(products)=>{
    try {
       await fetch("/api/products/:pid",{
        method:"GET",
        body: JSON.stringify(products.products.filter((p)=>p.id != products.id)),
        headers:{
            "Content-type":"application/json"
        }
       }) 
    } catch (error) {
        console.log(error)
    }
};

submitDelete.addEventListener('click', async(e)=>{
    e.preventDefault();
    socket.on('productsEliminate', async data=>{
        await deleteProducts(data);
        data.products.forEach(p=>{
            container.innerHTML+=`
            <div>
            <p>${p.title}</p>
            <p>${p.description}</p>
            </div>
            `
        })
    })
})

submitAdd.addEventListener('click', async(e)=>{
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
});

socket.on('productsNew', data=>{
    container.innerHTML='';
    data.forEach(p => {
        container.innerHTML+=`
        <div>
        <p>${p.title}</p>
        <p>${p.description}</p>
        </div>
        `
    });
});





