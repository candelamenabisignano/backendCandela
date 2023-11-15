const formLogin= document.body.querySelector("#loginForm");


formLogin.addEventListener("submit", (e)=>{
    e.preventDefault();
    const data= new FormData(formLogin);
    const obj={};
    data.forEach((value,key)=>{
        obj[key]=value
    });

    fetch('/api/sessions/login', {
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((res)=>{
        if(res.status === 200){
            window.location.replace('/products') //si el user se registra correctamente, que lo mande a la ruta del profile 
                                        // y lo va a redirijir a la ruta del progilr por el middleware que creamos
                                //que indica que si la session ya tiene un usuario, que se redirija al profile.
        }
    }).catch((err)=> console.log(err))
});