const socket=io();


const submit= document.body.querySelector('#submit');
const container= document.body.querySelector("#productsContainer")

submit.addEventListener('click', async(e)=>{

    try {

        socket.on('productsNew', data=>{
            container.innerHTML+=`${data.forEach(p => {
                return `<li>${p.title}</li><br>`
            })}`
        })
        
    } catch (error) {
        console.log(error)
    }
})




