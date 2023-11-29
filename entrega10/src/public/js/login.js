const formLogin= document.body.querySelector("#loginForm");


formLogin.addEventListener("submit", async(e)=>{
    try {

        e.preventDefault();
        const data= new FormData(formLogin);
        const obj={};
        data.forEach((value,key)=>{
            obj[key]=value
        });

        const user= await fetch('/api/sessions/login', {
            method:'POST',
            body:JSON.stringify()
            headers:{
                
            }
        })
    
        const reqUser= await fetch('/api/sessions/current', {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });

        if(reqUser.status === 200){

        }
        
    } catch (error) {
        
    }
});