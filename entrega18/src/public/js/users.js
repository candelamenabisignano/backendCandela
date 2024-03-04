const eliminateUser = document.body.querySelectorAll(".eliminateUser");
const modifyRole = document.body.querySelectorAll(".modifyRole");
eliminateUser.forEach((button) => {
  button.addEventListener("click", async (e) => {
    try {
      e.preventDefault();
      const { name: id } = e.target;

      const deleteUser = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (deleteUser.status != 200)
        throw new Error(
          `the user wasnt deleted because of an status ${deleteUser.status}`
        );
      const users = await fetch("/api/sessions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { payload: usersToJson } = await users.json();
      const wasntDeleted = usersToJson.some((u) => u._id === id);
      if (wasntDeleted) {
        throw new Error("the user wasnt deleted, please try again");
      } else {
        return window.location.replace("/users");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  });
});

modifyRole.forEach((button) => {
  button.addEventListener("click", async (e) => {
    try {
      e.preventDefault();
      const { name: id } = e.target;
      const modifyUserRole = await fetch(`/api/users/premium/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (modifyUserRole.status != 200) {
        const { error } = await modifyUserRole.json();
        throw new Error(
          `the user role wasnt modified because of an status ${modifyUserRole.status}: ${error}`
        );
      } else {
        return window.location.reload();
      }
    } catch (error) {
      throw new Error(error.message);
    }
  });
});
