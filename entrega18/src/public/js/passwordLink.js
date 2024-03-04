const passwordForm = document.body.querySelector("#password-form");
passwordForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    const data = new FormData(passwordForm);
    const obj = {};
    data.forEach((value, key) => {
      obj[key] = value;
    });
    const passwordEmail = await fetch(
      `/api/users/password-link?email=${obj.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (passwordEmail.status != 200) {
      const { error } = await passwordEmail.json();
      throw new Error(
        `an error has occurred because of an status ${passwordEmail.status}: ${error}`
      );
    } else {
      alert("an message to your email has been sent");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
