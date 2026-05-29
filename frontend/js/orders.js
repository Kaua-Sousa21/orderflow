async function loadOrders() {
    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Erro ao carregar pedidos.");
        return;
    }

    const orders = await response.json();
    const list = document.getElementById("ordersList");

    list.innerHTML = "";

    if (orders.length === 0) {
        list.innerHTML = `
            <div class="panel">
                <h2>Nenhum pedido encontrado</h2>
                <p>Quando novos pedidos forem criados, eles aparecerão aqui.</p>
            </div>
        `;
        return;
    }

    orders.forEach(order => {
        const card = document.createElement("div");
        card.className = "order-card";

        const itemsHtml = order.items.map(item => `
            <li>
                ${item.quantity}x ${item.product.name}
                <span>${item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}</span>
            </li>
        `).join("");

        card.innerHTML = `
            <div class="order-header">
                <div>
                    <h2>Pedido #${order.id}</h2>
                    <p>Cliente: ${order.customerName}</p>
                    <p>Endereço: ${order.address || "Não informado"}</p>
                </div>

                <span class="order-status status-${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </div>

            <ul class="order-items">
                ${itemsHtml}
            </ul>

            <div class="order-footer">
                <strong>
                    Total: ${order.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </strong>

                <div class="status-actions">
                    <button onclick="updateOrderStatus(${order.id}, 'PREPARING')">Preparando</button>
                    <button onclick="updateOrderStatus(${order.id}, 'READY')">Pronto</button>
                    <button onclick="updateOrderStatus(${order.id}, 'DELIVERED')">Entregue</button>
                    <button onclick="updateOrderStatus(${order.id}, 'CANCELED')">Cancelar</button>
                </div>
            </div>
        `;

        list.appendChild(card);
    });
}

async function updateOrderStatus(id, status) {
    const token = getToken();

    const response = await fetch(`${API_URL}/orders/${id}/status?status=${status}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Erro ao atualizar status.");
        return;
    }

    loadOrders();
}

loadOrders();