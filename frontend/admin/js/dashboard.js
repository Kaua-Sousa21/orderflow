let ordersStatusChart = null;

async function loadDashboard() {

    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(
        `${API_URL}/dashboard/summary`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "login.html";
        return;
    }

    const data = await response.json();

    document.getElementById("totalOrders").innerText = data.totalOrders;
    document.getElementById("activeOrders").innerText = data.activeOrders;
    document.getElementById("pendingOrders").innerText = data.pendingOrders;
    document.getElementById("preparingOrders").innerText = data.preparingOrders;
    document.getElementById("readyOrders").innerText = data.readyOrders;

    document.getElementById("totalRevenue").innerText =
        data.totalRevenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    renderOrdersStatusChart(data);
}

function renderOrdersStatusChart(data) {
    const canvas = document.getElementById("ordersStatusChart");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const chartData = {
        labels: [
            "Pendentes",
            "Preparando",
            "Prontos",
            "Entregues",
            "Cancelados"
        ],
        datasets: [
            {
                label: "Pedidos",
                data: [
                    data.pendingOrders,
                    data.preparingOrders,
                    data.readyOrders,
                    data.deliveredOrders,
                    data.canceledOrders
                ],
                borderWidth: 1
            }
        ]
    };

    if (ordersStatusChart) {
        ordersStatusChart.data = chartData;
        ordersStatusChart.update();
        return;
    }

    ordersStatusChart = new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}

loadDashboard();

setInterval(loadDashboard, 10000);