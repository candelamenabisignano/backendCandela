const resetPasswordForm = document.body.querySelector("#reset-password-form");
const email = document.body.querySelector("#email-reset-password");
resetPasswordForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(resetPasswordForm);
    const obj = { email: email.innerHTML };
    data.forEach((value, key) => {
      obj[key] = value;
    });
    const newUser = await fetch("/api/sessions/password-uptade", {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (newUser.status === 200) {
      window.location.replace("/login");
    } else {
      alert("ocurrio un error, intenta de nuevo");
    }
  } catch (error) {
    console.log(error.message);
  }
});
