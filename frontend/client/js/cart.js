function loadCart() {

    const cart = getCart();

    const container =
        document.getElementById("cartItems");

    container.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        container.innerHTML = `
            <p>Seu carrinho está vazio.</p>
        `;

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        const card = document.createElement("div");

        card.className = "cart-item";

        card.innerHTML = `
            <div>
                <h3>${item.name}</h3>

                <p>
                    Quantidade: ${item.quantity}
                </p>
            </div>

            <strong>
                ${(item.price * item.quantity)
                    .toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
            </strong>
        `;

        container.appendChild(card);
    });

    document.getElementById("cartTotal")
        .innerText = total.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );
}

async function finishOrder() {

    const customerName =
        document.getElementById("customerName").value;

    const address =
        document.getElementById("address").value;

    const cart = getCart();

    if (!customerName || !address) {

        alert("Preencha nome e endereço.");
        return;
    }

    if (cart.length === 0) {

        alert("Carrinho vazio.");
        return;
    }

    const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
    }));

    const response = await fetch(
        `${API_URL}/orders`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                customerName,
                address,
                items
            })
        }
    );

    if (!response.ok) {

        alert("Erro ao criar pedido.");
        return;
    }

    const createdOrder = await response.json();

    localStorage.removeItem("cart");
    localStorage.setItem("lastOrderId", createdOrder.id);

    window.location.href = "success.html";
}

loadCart();