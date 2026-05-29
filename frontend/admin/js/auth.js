async function login(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        alert("Email ou senha inválidos!");
        return;
    }

    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    if (data.role !== "ADMIN") {
        alert("Acesso permitido apenas para administradores.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return;
    }

    alert("Login realizado com sucesso!");
    window.location.href = "dashboard.html";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "login.html";
}