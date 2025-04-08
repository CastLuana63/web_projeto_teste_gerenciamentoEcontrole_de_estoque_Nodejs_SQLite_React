# 🧪 Projeto Teste – Aplicação Web para Controle de Estoque

---

## 📌 Sobre o Projeto

Este projeto consiste em uma aplicação web desenvolvida com **React.js** no frontend e **Node.js** no backend, utilizando **SQLite** como banco de dados. O objetivo é oferecer um sistema simples e funcional para **controle de estoque**, incluindo cadastro, movimentação e consulta de produtos.

### 🔧 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Yarn
- **Frontend**: React.js, Vite, Axios
- **Banco de dados**: SQLite
- **Versionamento**: Git / GitHub

---

## 🗎 Levantamento de Requisitos

### 🎯 Objetivo

Permitir o gerenciamento completo de um estoque, com controle sobre as entradas e saídas de produtos.

### ✅ Requisitos Funcionais

- Cadastro de novos produtos
- Atualização de produtos com dados modificados
- Inativação de produtos
- Verificação das quantidades recebidas em relação às notas fiscais
- Registro das quantidades recebidas nas planilhas de entrada
- Armazenamento dos produtos no estoque
- Atendimento de demandas, separação e entrega de produtos
- Registro dos produtos retirados nas planilhas de saída
- Geração semanal de relatórios de estoque (quantidades atual, entrada e saída)
- Ajuste mensal das planilhas conforme saldo físico dos produtos

### 🧩 Acessibilidade

- Suporte visual com **ajuste de cores para daltônicos**

---

## 🧱 Modelagem do Banco de Dados

### 🔹 Diagrama Entidade-Relacionamento

Disponível em:  
🔗 [Ver Diagrama no DBDiagram](https://dbdiagram.io/d/Sarsdev_teste_webapp_reactjs-67df124675d75cc84416d48a)

---

## 🛠️ Construção do Banco de Dados

### **Tabelas**

#### 🧾 Produto

Campos:

- `ID_PRODUTO`: identificador único do produto
- `DESCRICAO`: nome ou descrição do produto
- `QUANTIDADE`: quantidade atual em estoque
- `UNIDADE`: unidade de medida (ex: kg, un, l)
- `QUANTIDADE_EMBALAGEM`: quantidade por embalagem
- `DISPONIVEL`: flag booleana (1 = sim, 0 = não)

Estrutura:

#### 🔄 Movimentação

Campos:

- `ID_MOVIMENTACAO`: identificador único da movimentação
- `DATA`: data da movimentação
- `ID_PRODUTO`: referência ao produto movimentado
- `QUANTIDADE`: quantidade movimentada
- `JUSTIFICATIVA`: motivo da movimentação
- `TIPO_MOVIMENTACAO`: tipo (Entrada ou Saída)

Estrutura:

#### 🔗 Relacionamento

- **Produto (1) : (N) Movimentações**

Um produto pode estar associado a várias movimentações.

#### 📘 Documentação de Apoio (SQLite)

- [Node.js - SQLite (Documentação Oficial)](https://nodejs.org/api/sqlite.html)
- [node-sqlite3 (GitHub)](https://github.com/TryGhost/node-sqlite3)

---

## 🔹 Backend (Node.js)

### 🔌 API RESTful

- API estruturada seguindo os princípios REST:
  - Client-Server
  - Stateless
  - Cacheable
  - Layered System
  - Code-on-Demand

Referência:  
🔗 [Boas Práticas API RESTful](https://github.com/CastLuana63/Boas_pr-ticas_api_rest_ful/tree/main)

### 🔄 Operações CRUD

#### Create

- [ ] Cadastrar produtos
- [ ] Registrar movimentações

#### Read

- [ ] Listar produtos
- [ ] Listar produtos específicos
- [ ] Listar movimentações
- [ ] Listar movimentações específicos
- [ ] Listar movimentações de produto
- [ ] Listar movimentações de produto específicos (Entrada ou Saída)

#### Update

- [ ] Atualizar todos dados de produtos
- [ ] Atualizar alguns dados de produtos
- [ ] Ativar e Inativar produtos

---

## 🔹 Frontend (React.js)

### ⚙️ Ferramentas

- Projeto criado com **Vite**
- Consumo da API via **Axios**
