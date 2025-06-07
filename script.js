const products = [
    { id: 1, name: "Laptop", price: 2099, image: "laptop.jpg" },
    { id: 2, name: "Headphones", price: 399, image: "headphone.jpg" },
    { id: 3, name: "Smartphone", price: 3599, image: "phone.jpg" },
    { id: 4, name: "Camera", price: 5099, image: "camera.jpg" },
    { id: 5, name: "PS5", price: 1699, image: "ps5.jpg" },
    { id: 6, name: "Gaming PC", price: 3000, image: "gaming_pc.jpg" },
    { id: 7, name: "Guitar", price: 499, image: "guitar.jpg" },
    { id: 8, name: "Nintendo", price: 599, image: "nintendo.jpg" },
  ];
  
  const productList = document.getElementById("productList");
  const searchBar = document.getElementById("searchBar");
  const cartList = document.getElementById("cartList");
  const totalPrice = document.getElementById("totalPrice");
  const checkoutButton = document.getElementById("checkoutButton");
  
  let cart = [];
  
  // Load cart from localStorage
  function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cart = JSON.parse(storedCart);
    } else {
      cart = [];
    }
  }
  
  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Display products
  function displayProducts(productsToShow) {
    productList.innerHTML = "";
  
    if (productsToShow.length === 0) {
      productList.innerHTML = `<p class="no-products">No products found.</p>`;
      return;
    }
  
    productsToShow.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Add product to cart
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (product) {
      cart.push(product);
      alert(`${product.name} added to the cart!`);
      saveCart();
      displayCart();
    }
  }
  
  // Remove product from cart by index
  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
  }
  
  // Display cart items & total
  function displayCart() {
    cartList.innerHTML = ""; // Clear previous items
  
    if (cart.length === 0) {
      cartList.innerHTML = "<p>Your cart is empty.</p>";
      totalPrice.textContent = "Total: $0";
      return;
    }
  
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartList.appendChild(itemDiv);
    });
  
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalPrice.textContent = `Total: $${total}`;
  }
  
  // Checkout button click handler
  checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    cart = [];
    saveCart();
    displayCart();
  });
  
  // Search bar functionality
  searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
  });
  
  // On page load
  document.addEventListener("DOMContentLoaded", () => {
    loadCart();
    displayProducts(products);
    displayCart();
  });
  