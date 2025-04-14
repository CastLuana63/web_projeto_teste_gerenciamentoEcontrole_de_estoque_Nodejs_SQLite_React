# 🧪 Projeto Teste – Aplicação Web para Controle e Movimentação de Estoque

## 🔹 Backend (Node.js)

### 🔌 API RESTful

A API foi estruturada com base nos princípios REST:

- **Client-Server**
- **Stateless**
- **Cacheable**
- **Layered System**
- **Code-on-Demand** (opcional)

🔗 Referência:  
[Boas Práticas API RESTful](https://github.com/CastLuana63/Boas_pr-ticas_api_rest_ful/tree/main)

---

## 📁 Estrutura de Pastas do Projeto

### api/ ➜ Diretório raiz da API

#### └── src/ ➜ Contém todo o código-fonte da aplicação

###### ├── app/ ➜ Configuração principal do servidor (Express, middlewares)

###### ├── controllers/ ➜ Lógica de controle das rotas (camada Controller)

###### ├── database/ ➜ Configuração e conexão com o banco de dados (SQLite, migrações, etc.)

###### ├── helpers/ ➜ Funções auxiliares como validações, tratativas e formatações

###### ├── routes/ ➜ Definição das rotas da API

###### ├── services/ ➜ Lógica de negócio (camada Service)

###### └── utils/ ➜ Utilitários diversos: constantes, mensagens padrão, etc.

---

## 🔄 Operações CRUD

### ✅ Create

- [ ] Cadastrar produtos
- [ ] Registrar movimentações

### 🔍 Read

- [ ] Listar todos os produtos
- [ ] Buscar produto específico
- [ ] Listar todas as movimentações
- [ ] Buscar movimentação específica
- [ ] Listar movimentações por produto
- [ ] Listar movimentações específicas (Entrada ou Saída)

### ✏️ Update

- [ ] Atualizar todos os dados dos produtos
- [ ] Atualizar dados parciais dos produtos
- [ ] Ativar / Inativar produtos

---

## 🧱 Modelagem do Banco de Dados

### 🔹 Diagrama Entidade-Relacionamento

🔗 [Ver Diagrama no DBDiagram](https://dbdiagram.io/d/Sarsdev_teste_webapp_reactjs-67df124675d75cc84416d48a)

---

## 🛠️ Construção do Banco de Dados

### 🧾 Tabela: Produto

| Campo                | Tipo          | Descrição                         |
| -------------------- | ------------- | --------------------------------- |
| ID_PRODUTO           | INTEGER       | Identificador único do produto    |
| DESCRICAO            | TEXT          | Nome ou descrição do produto      |
| QUANTIDADE           | INTEGER       | Quantidade atual em estoque       |
| UNIDADE              | TEXT          | Unidade de medida (ex: kg, un, l) |
| QUANTIDADE_EMBALAGEM | INTEGER       | Quantidade por embalagem          |
| DISPONIVEL           | BOOLEAN (0/1) | Produto ativo ou inativo          |

---

### 🔄 Tabela: Movimentação

| Campo             | Tipo       | Descrição                           |
| ----------------- | ---------- | ----------------------------------- |
| ID_MOVIMENTACAO   | INTEGER    | Identificador único da movimentação |
| DATA              | TEXT (ISO) | Data da movimentação                |
| ID_PRODUTO        | INTEGER    | Referência ao produto movimentado   |
| QUANTIDADE        | INTEGER    | Quantidade movimentada              |
| JUSTIFICATIVA     | TEXT       | Motivo da movimentação              |
| TIPO_MOVIMENTACAO | TEXT       | Tipo: "Entrada" ou "Saída"          |

---

### 🔗 Relacionamento

**Produto (1) : (N) Movimentações**

> Um produto pode estar associado a várias movimentações.

---

### 📘 Documentação de Apoio (SQLite)

- [Node.js - SQLite (Documentação Oficial)](https://nodejs.org/api/sqlite.html)
- [node-sqlite3 (GitHub)](https://github.com/TryGhost/node-sqlite3)
