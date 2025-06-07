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
const cartDiv = document.getElementById("cart");

// --- Cart Data ---
let cart = [];

// Load cart from local storage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Save cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Display products
function displayProducts(products) {
    productList.innerHTML = "";

    if (products.length === 0) {
        productList.innerHTML = `<p class="no-products">No products found.</p>`;
        return;
    }

    products.forEach((product) => {
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

// Add item to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        alert(`${product.name} added to the cart!`);
        saveCart();
        displayCart();
    }
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// Display cart contents
function displayCart() {
    cartDiv.innerHTML = "<h2>Shopping Cart</h2>";

    if (cart.length === 0) {
        cartDiv.innerHTML += "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((item, index) => {
        cartDiv.innerHTML += `
            <div>
                <p>${item.name} - $${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartDiv.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Search functionality
searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
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
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => displayProducts(data));
  });
  
  // Remove the hardcoded 'products' array from script.js (it’s now fetched from JSON Server)
  