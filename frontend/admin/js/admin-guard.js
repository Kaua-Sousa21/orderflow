function protectAdminPage() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "ADMIN") {
        alert("Acesso permitido apenas para administradores.");
        window.location.href = "login.html";
    }
}

protectAdminPage();