const passwordForm = document.body.querySelector("#password-form");

passwordForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(passwordForm);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });

    const user = await fetch(`/api/sessions/users/password-link?email=${obj.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const {status, token} = await user.json();

    console.log(token);

  } catch (error) {
    console.log(error.message);
  }
});
