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
    const { payload } = await users.json();
    const exists = payload.some((user) => user.email === obj.email);
    if (!exists) {
      return window.location.reload();
    }
    const login = await fetch("/api/sessions/login", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (login.status != 201) {
      return window.location.reload();
    }
    const reqUser = await fetch("/api/sessions/current", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (reqUser.status === 200) {
      return window.location.replace("/products");
    } else {
      return window.location.reload();
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
