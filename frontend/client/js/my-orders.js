async function loadMyOrders() {
    const token = localStorage.getItem("token");
    const container = document.getElementById("myOrderContent");

    if (!token) {
        container.innerHTML = `
            <p>Você precisa fazer login para ver seus pedidos.</p>
            <a href="login.html" class="success-btn">Fazer login</a>
        `;
        return;
    }

    const response = await fetch(`${API_URL}/orders/my`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        container.innerHTML = "<p>Não foi possível carregar seus pedidos.</p>";
        return;
    }

    const orders = await response.json();

    if (orders.length === 0) {
        container.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
        return;
    }

    container.innerHTML = "";

    orders.reverse().forEach(order => {
        const itemsHtml = order.items.map(item => `
            <li>
                ${item.quantity}x ${item.product.name}
                <span>
                    ${item.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </span>
            </li>
        `).join("");

        const card = document.createElement("div");
        card.className = "my-order-card";

        card.innerHTML = `
            <h3>Pedido #${order.id}</h3>

            <p>Cliente: ${order.customerName}</p>
            <p>Endereço: ${order.address}</p>

            <span class="client-order-status status-${order.status.toLowerCase()}">
                ${order.status}
            </span>

            <ul class="order-items">
                ${itemsHtml}
            </ul>

            <strong>
                Total: ${order.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </strong>
        `;

        container.appendChild(card);
    });
}

loadMyOrders();

setInterval(loadMyOrders, 5000);