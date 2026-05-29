async function loadMenuProducts() {
    const response = await fetch(`${API_URL}/products`);

    if (!response.ok) {
        alert("Erro ao carregar produtos.");
        return;
    }

    const products = await response.json();
    const availableProducts = products.filter(product => product.available);

    const container = document.getElementById("menuProducts");
    container.innerHTML = "";

    if (availableProducts.length === 0) {
        container.innerHTML = `
            <div class="empty-menu">
                <h2>Nenhum produto disponível</h2>
                <p>Volte mais tarde para conferir o cardápio.</p>
            </div>
        `;
        return;
    }

    availableProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "menu-card";

        card.innerHTML = `
            <img src="${product.imageUrl || 'https://via.placeholder.com/400x250'}" alt="${product.name}">

            <div class="menu-card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="menu-card-footer">
                    <strong>
                        ${product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </strong>

                    <button onclick='addToCart(${JSON.stringify(product)})'>
                        Adicionar
                    </button>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    updateCartCount();
}

function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert("Produto adicionado ao carrinho!");
}

loadMenuProducts();