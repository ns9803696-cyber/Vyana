const productsEl = document.getElementById("products");
let cart = [];

// Load products from JSON
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}"/>
        <h4>${p.name}</h4>
        <div class="price">₹${p.price}</div>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      `;
      productsEl.appendChild(card);
    });
  });

function addToCart(id){
  cart.push(id);
  document.getElementById("cartCount").textContent = cart.length;
  alert("Product added to cart!");
}