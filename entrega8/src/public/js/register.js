const registerForm= document.body.querySelector('#registerForm');


registerForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    const data= new FormData(registerForm)
    const obj={}
    data.forEach((value,key)=>{
        obj[key]=value
    });

    console.log(obj)

    fetch('/api/sessions/register', {
        method:'POST', 
        body:JSON.stringify(obj), 
        headers:{
            'Content-Type': 'application/json'
        }}).then((res)=>{
            if(res.status === 201){
                window.location.replace('/login') //si el user se registra correctamente, que lo mande a la ruta del profile 
                console.log('suceeded register')                           // y lo va a redirijir a la ruta del login por el middleware que creamos
                                            //que indica que si la session no tiene un usuario, que se redirija al login.
            }
        }).catch(err=> console.log(err))
})