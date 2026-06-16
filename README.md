# 🍔 OrderFlow

Sistema completo de gerenciamento de pedidos online desenvolvido com Java Spring Boot, MySQL, HTML, CSS e JavaScript.

O OrderFlow permite que clientes realizem pedidos através de um cardápio online e que administradores gerenciem produtos, acompanhem pedidos e visualizem métricas de vendas em tempo real.

---

## ✨ Funcionalidades

### 👤 Cliente

- Visualização do cardápio online
- Carrinho de compras
- Finalização de pedidos
- Acompanhamento do status do pedido
- Histórico de pedidos

### 🔐 Administrador

- Login seguro com JWT
- Dashboard administrativo
- Cadastro de produtos
- Edição de produtos
- Ativação e desativação de produtos
- Gerenciamento de pedidos
- Atualização de status dos pedidos
- Histórico de pedidos finalizados
- Estatísticas de vendas

---

## 📊 Status dos Pedidos

- PENDING
- PREPARING
- READY
- DELIVERED
- CANCELED

---

## 🛠 Tecnologias Utilizadas

### Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- Maven

### Banco de Dados

- MySQL

### Frontend

- HTML5
- CSS3
- JavaScript

### Deploy

- Railway
- GitHub

---

## 📂 Estrutura do Projeto

```text
orderflow
│
├── backend
│   ├── controllers
│   ├── entities
│   ├── repositories
│   ├── security
│   ├── dtos
│   └── services
│
├── frontend
│   ├── admin
│   └── client
│
└── database
```

---

## 🔑 Autenticação

O sistema utiliza autenticação JWT para proteger rotas administrativas.

Fluxo:

```text
Login
 ↓
JWT Token
 ↓
Frontend armazena token
 ↓
Acesso às rotas protegidas
```

---

## 🚀 Executando Localmente

### Clone o projeto

```bash
git clone https://github.com/Kaua-Sousa21/orderflow.git
```

### Entre na pasta

```bash
cd orderflow
```

### Configure o banco MySQL

```sql
CREATE DATABASE orderflow;
```

### Configure o application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/orderflow
spring.datasource.username=root
spring.datasource.password=
```

### Execute o projeto

```bash
mvn spring-boot:run
```

---

## 📈 Próximas Funcionalidades

- [ ] Relatórios em PDF
- [ ] Dashboard com gráficos avançados
- [ ] Upload de imagens para produtos
- [ ] Integração com WhatsApp
- [ ] Notificações em tempo real
- [ ] Aplicativo mobile
- [ ] Controle financeiro mensal

---

## 👨‍💻 Autor

**Kauã Sousa**

Backend Developer

Tecnologias:

- Java
- Spring Boot
- MySQL
- HTML
- CSS
- JavaScript

GitHub:
https://github.com/Kaua-Sousa21
Instagram:
@kzinkkz

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e portfólio.
