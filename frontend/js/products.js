async function loadProducts() {
    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${API_URL}/products`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Erro ao carregar produtos.");
        return;
    }

    const products = await response.json();
    const list = document.getElementById("productsList");

    list.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.imageUrl || 'https://via.placeholder.com/300x180'}" alt="${product.name}">

            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>

                <strong>
                    ${product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </strong>

                <span class="${product.available ? 'status available' : 'status unavailable'}">
                    ${product.available ? 'Disponível' : 'Indisponível'}
                </span>

                <div class="product-actions">
                    <button onclick='editProduct(${JSON.stringify(product)})'>Editar</button>
                    <button class="danger-btn" onclick="deleteProduct(${product.id})">Excluir</button>
                </div>
            </div>
        `;

        list.appendChild(card);
    });
}

function openProductModal() {
    document.getElementById("productModal").classList.add("show");
    document.getElementById("modalTitle").innerText = "Novo Produto";

    document.getElementById("productId").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImageUrl").value = "";
    document.getElementById("productAvailable").checked = true;
}

function closeProductModal() {
    document.getElementById("productModal").classList.remove("show");
}

function editProduct(product) {
    document.getElementById("productModal").classList.add("show");
    document.getElementById("modalTitle").innerText = "Editar Produto";

    document.getElementById("productId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productImageUrl").value = product.imageUrl;
    document.getElementById("productAvailable").checked = product.available;
}

async function saveProduct(event) {
    event.preventDefault();

    const token = getToken();
    const id = document.getElementById("productId").value;

    const product = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        price: Number(document.getElementById("productPrice").value),
        imageUrl: document.getElementById("productImageUrl").value,
        available: document.getElementById("productAvailable").checked
    };

    const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;
    const method = id ? "PUT" : "POST";

    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        alert("Erro ao salvar produto.");
        return;
    }

    closeProductModal();
    loadProducts();
}

async function deleteProduct(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmDelete) return;

    const token = getToken();

    const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Erro ao excluir produto.");
        return;
    }

    loadProducts();
}

loadProducts();