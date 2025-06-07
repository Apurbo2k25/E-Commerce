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

displayProducts(products);

const searchBar = document.getElementById("searchBar");

searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
});

// Optional: dummy addToCart function so no error on button click
function addToCart(id) {
    alert(`Product ${id} added to cart!`);
}
