

const formLogin = document.body.querySelector("#loginForm");

formLogin.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(formLogin);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });

    const users = await fetch("/api/sessions/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const usersJson = await users.json();

    const { status, payload } = usersJson;

    const exists = payload.find((user) => user.email === obj.email);

    if (!exists) {
      return window.location.replace("/login");
    };

    const login = await fetch("/api/sessions/login", {
      method: "POST",
      body: JSON.stringify(exists),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (login.status != 200) {
      return window.location.replace('/login')
    }

    const reqUser = await fetch("/api/sessions/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reqUserJson= await reqUser.json();


    if(reqUser.status == 200){
        console.log(reqUserJson);
        window.location.replace('/products');
    }else{
        window.location.replace('/login')
    }

    // if(reqUser.status === 200){
    //     window.location.replace('/products');
    // }else{
    //     window.location.replace('/login')
    // }

    //         const user= await fetch('/api/sessions/login', {
    //             method:'POST',
    //             body:JSON.stringify()
    //             headers:{

    //             }
    //         })

    //         const reqUser= await fetch('/api/sessions/current', {
    //             method:'GET',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             }
    //         });

    //         if(reqUser.status === 200){
  } catch (error) {
    console.log(error.message);
  }
});
