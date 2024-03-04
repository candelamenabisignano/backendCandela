const endPurchase = document.body.querySelector(".endPurchase");
const listOrder = document.body.querySelector(".listOrder");
const sectionProducts = document.body.querySelector(".sectionProducts");
const socket = io();
endPurchase.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    const { name: id } = e.target;
    const cart = await fetch(`/api/carts/${id}/purchase/`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (cart.status != 200) {
      const { error } = await cart.json();
      throw new Error(
        `the purchase hasnt been completed because of an status ${cart.status}:${error}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

socket.on("purchase", async () => {
  sectionProducts.innerHTML = "";
  listOrder.innerHTML = `<h2>compra exitosa!</h2>
    <br>
    <h3 class="counter">redirigiendo al perfil en:</h3>
    `;
  let counter = 4;
  const counterParagraph = document.body.querySelector(".counter");
  setInterval(() => {
    counter -= 1;
    counterParagraph.innerHTML = `redirigiendo al perfil en: ${counter}`;
  }, 1000);
  setTimeout(() => {
    window.location.replace("/products");
  }, 4000);
});
