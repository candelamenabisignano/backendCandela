const registerForm = document.body.querySelector("#registerForm");

registerForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    const request = await fetch("/api/sessions/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.status === 201) {
      window.location.replace("/login"); //si el user se registra correctamente, que lo mande a la ruta del profile
      console.log("suceeded register");
    }
  } catch (error) {
    console.log(error.message);
  }
});
