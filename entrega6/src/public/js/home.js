const socket= io();

const user= document.body.querySelector('#user');
const message= document.body.querySelector('#message');
const submit= document.body.querySelector('#submit');
const form= document.body.querySelector('form')
const container=document.body.querySelector('.container');

add= async (message)=>{
    try {
        await fetch('/api/messages',{
            method:'POST',
            body:JSON.stringify(message),
            headers:{
                "Content-type":"application/json"
            }
        }) 
    } catch (error) {
        console.log(error.message)
    }
};

submit.addEventListener('click', async(e)=>{
    try {
        e.preventDefault()
        const {user, message}=form.elements;
        console.log(`${user} y ${message}`)
        const newMessage={
            user:user.value,
            message: message.value
        };
        await add(newMessage);
        
    } catch (error) {
        console.log(error.message)
    }
});


socket.on('messages', data=>{
    container.innerHTML='';
    data.forEach(m=> {
        container.innerHTML+=`
        <div>
        <h2>${m.user}</h2>
        <p>${m.message}</p>
        </div>
        `
    });
});