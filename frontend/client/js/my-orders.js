async function loadMyOrder() {
    const orderId = localStorage.getItem("lastOrderId");
    const container = document.getElementById("myOrderContent");

    if (!orderId) {
        container.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
        return;
    }

    const response = await fetch(`${API_URL}/orders/${orderId}/public`);

    if (!response.ok) {
        container.innerHTML = "<p>Não foi possível carregar seu pedido.</p>";
        return;
    }

    const order = await response.json();

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

    container.innerHTML = `
        <div class="my-order-card">
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
        </div>
    `;
}

loadMyOrder();