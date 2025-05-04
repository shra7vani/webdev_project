// ========== Cart Feature ==========
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Update cart count badge
const updateCartCount = () => {
    document.getElementById('cart-count').textContent = cart.length;
};

// Get product data by ID
const getProductById = (id) => {
    const el = document.querySelector(`.product-card[data-id="${id}"]`);
    return {
        id,
        name: el.dataset.name,
        price: parseFloat(el.dataset.price),
        image: el.dataset.image || el.querySelector('img')?.src
    };
};

// Add to Cart functionality
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    const productId = button.dataset.id;

    button.addEventListener('click', () => {
        const product = getProductById(productId);
        cart.push(product);  // Add product to the cart array
        saveCart();
        updateCartCount();
    });
});

// Render cart modal
const renderCart = () => {
    const container = document.getElementById('cart-items-container');
    container.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price;
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    });

    // Update the total price
    document.getElementById('cart-total-price').textContent = `$${totalPrice.toFixed(2)}`;
};

// Open cart modal
document.getElementById('cart-btn').addEventListener('click', () => {
    renderCart();
    document.getElementById('cart-modal').style.display = 'flex';
});

// Close modal
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.overlay').style.display = 'none';
    });
});

// Initial load
updateCartCount();
