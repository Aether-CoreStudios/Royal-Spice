// DATABASE

const DB = {
  menuItems: [
    {
      id: 1,
      name: "Smoked Burrata",
      category: "starters",
      price: 680,
      desc: "Creamy burrata with tomatoes",
      emoji: "🧀",
      orders: 47,
    },

    {
      id: 2,
      name: "Tandoori Prawns",
      category: "starters",
      price: 760,
      desc: "Tiger prawns with smoked yoghurt",
      emoji: "🦐",
      orders: 52,
    },

    {
      id: 3,
      name: "Wood-Fired Lamb Chops",
      category: "mains",
      price: 1480,
      desc: "French rack with rosemary jus",
      emoji: "🍖",
      orders: 71,
    },

    {
      id: 4,
      name: "Chocolate Lava Cake",
      category: "desserts",
      price: 420,
      desc: "Warm chocolate fondant",
      emoji: "🍫",
      orders: 88,
    },
  ],
};

let cart = [];

// NAVIGATION

function showPage(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));

  document.getElementById("page-" + page).classList.add("active");

  if (page === "menu") {
    renderMenu("all");
  }

  if (page === "cart") {
    renderCart();
  }
}

// MENU

function renderMenu(cat) {
  const grid = document.getElementById("menu-grid");

  const items =
    cat === "all"
      ? DB.menuItems
      : DB.menuItems.filter((i) => i.category === cat);

  grid.innerHTML = items
    .map(
      (item) => `
    <div class="menu-card">

      <div class="menu-card-img">
        ${item.emoji}
      </div>

      <div class="menu-card-body">

        <div class="menu-card-top">
          <h3>${item.name}</h3>
          <span class="menu-price">₹${item.price}</span>
        </div>

        <p class="menu-desc">${item.desc}</p>

        <button class="add-btn"
          onclick="addToCart(${item.id})">
          Add to Cart
        </button>

      </div>

    </div>
  `,
    )
    .join("");
}

function filterMenu(cat, btn) {
  document
    .querySelectorAll(".cat-tab")
    .forEach((b) => b.classList.remove("active"));

  btn.classList.add("active");

  renderMenu(cat);
}

// CART

function addToCart(id) {
  const item = DB.menuItems.find((i) => i.id === id);

  const existing = cart.find((c) => c.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  updateCartCount();

  showToast(`${item.name} added to cart!`);
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);

  document.getElementById("cart-count").textContent = count;
}

function renderCart() {
  const list = document.getElementById("cart-items-list");

  if (cart.length === 0) {
    list.innerHTML = `
      <p>Your cart is empty.</p>
    `;

    return;
  }

  list.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">

      <div style="font-size:2rem">
        ${item.emoji}
      </div>

      <div style="flex:1">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
      </div>

      <div>
        Qty: ${item.qty}
      </div>

    </div>
  `,
    )
    .join("");
}

// TOAST

let toastTimer;

function showToast(msg) {
  const toast = document.getElementById("toast");

  toast.textContent = msg;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// INIT

renderMenu("all");
// NAV CLICK EVENTS

document.querySelectorAll("nav *").forEach((link) => {
  link.addEventListener("click", () => {
    const page = link.textContent.trim().toLowerCase();

    if (page === "api / db") return;

    showPage(page);
  });
});
