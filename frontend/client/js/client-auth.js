async function clientLogin(event) {
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

    if (data.role === "ADMIN") {
        alert("Administradores devem acessar pelo painel admin.");
        return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    window.location.href = "menu.html";
}

async function clientRegister(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
        alert("Erro ao cadastrar usuário.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html";
}