document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 59.99 },
  ];

  const productsList = document.getElementById("products-list");
  const cartItemsDisplay = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalDisplay = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  let cart = [];

  loadItems();

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList =
      "flex gap-20 bg-slate-600 pt-2 pr-5 pl-5 mb-4 border-none text-white rounded-sm shadow-lg";
    productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${
          product.id
        }" class="bg-black shadow-md text-white rounded-sm mb-2 pl-1 pr-1 cursor-pointer hover:bg-white hover:text-black hover:transition hover:delay-75 hover:decoration-white">Add to Cart</button>
        `;
    productsList.appendChild(productDiv);
  });

  productsList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  cartItemsDisplay.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      removeFromCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    renderCart();
    saveItems();
  }

  function removeFromCart(product) {
    cart.pop(product);
    renderCart();
    saveItems();
  }

  function renderCart() {
    cartItemsDisplay.innerText = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalDisplay.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList =
          "flex gap-20 bg-slate-600 pt-2 pr-5 pl-5 mb-4 border-none text-white rounded-sm shadow-lg";
        cartItem.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}
            </span>
            <button data-id="${index}" class="bg-black shadow-md text-white rounded-sm mb-2 pl-1 pr-1 cursor-pointer hover:bg-white hover:text-black hover:transition hover:delay-75 hover:decoration-white">Remove</button>
            `;
        cartItemsDisplay.appendChild(cartItem);
        totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      });
    } else {
      emptyCartMessage.classList.remove("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
      alert("Proceeding to checkout!");
      cart.length = 0;
      saveItems();
    } else {
      alert("Cart is empty!");
    }
    renderCart();
  });

  function saveItems() {
    localStorage.setItem("Products", JSON.stringify(cart));
  }

  function loadItems() {
    const saved = localStorage.getItem("Products");
    if (saved) {
      cart = JSON.parse(saved);
    }
    renderCart();
  }
});
