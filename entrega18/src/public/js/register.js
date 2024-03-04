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
      window.location.replace("/login");
    } else {
      const { error } = await request.json();
      throw new Error(
        `the user wasnt registered because of an status ${request.status}: ${error}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
