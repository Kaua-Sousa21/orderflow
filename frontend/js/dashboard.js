async function loadDashboard() {
    const token = getToken();

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const response = await fetch(`${API_URL}/dashboard/summary`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        alert("Sessão expirada. Faça login novamente.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
        return;
    }

    const data = await response.json();

    document.getElementById("totalOrders").innerText = data.totalOrders;
    document.getElementById("pendingOrders").innerText = data.pendingOrders;
    document.getElementById("totalRevenue").innerText =
        data.totalRevenue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

loadDashboard();