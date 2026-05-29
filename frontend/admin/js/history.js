async function loadHistory() {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/orders`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        alert("Erro ao carregar histórico.");
        return;
    }

    const orders = await response.json();

    const historyOrders = orders.filter(order =>
        order.status === "DELIVERED" ||
        order.status === "CANCELED"
    );

    const container =
        document.getElementById("historyList");

    container.innerHTML = "";

    if (historyOrders.length === 0) {

        container.innerHTML = `
            <div class="panel">
                Nenhum pedido finalizado.
            </div>
        `;

        return;
    }

    historyOrders.reverse().forEach(order => {

        const card = document.createElement("div");

        card.className = "order-card";

        const itemsHtml = order.items.map(item => `
            <li>
                ${item.quantity}x ${item.product.name}
            </li>
        `).join("");

        card.innerHTML = `
            <div class="order-header">

                <div>
                    <h2>Pedido #${order.id}</h2>
                    <p>${order.customerName}</p>
                </div>

                <span class="order-status status-${order.status.toLowerCase()}">
                    ${order.status}
                </span>

            </div>

            <ul class="order-items">
                ${itemsHtml}
            </ul>

            <strong>
                ${order.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}
            </strong>
        `;

        container.appendChild(card);
    });
}

loadHistory();