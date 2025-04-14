# 📦 Projeto Teste – Aplicação Web para Controle de Estoque

## 📌 Sobre o Projeto

Este projeto consiste em uma aplicação web desenvolvida com **React.js** no frontend e **Node.js** no backend, utilizando **SQLite** como banco de dados. O objetivo é oferecer um sistema simples e funcional para **controle de estoque**, incluindo cadastro, movimentação e consulta de produtos.

### 🔧 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Yarn
- **Frontend**: React.js, Vite, Axios, npm
- **Banco de dados**: SQLite
- **Versionamento**: Git / GitHub

---

## 🗎 Levantamento de Requisitos

### 🎯 Objetivo

Permitir o gerenciamento e consulta completa de um estoque, com controle sobre as entradas e saídas de produtos.

#### ✅ Requisitos Funcionais

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

#### 🧩 Acessibilidade

- Suporte visual com **ajuste de cores para daltônicos**

---

## 🎲 Modelagem do Banco de Dados

### 🔹 Diagrama Entidade-Relacionamento (DER)

![DER](./assets/DER.png)

➜ Disponível em:  
🔗 [Ver Diagrama no DBDiagram](https://dbdiagram.io/d/Sarsdev_teste_webapp_reactjs-67df124675d75cc84416d48a)

---

## 📁 Estrutura do Projeto

Este repositório é dividido em três partes principais:

### 🧠 `api/` – Backend

Contém o servidor da aplicação, criado com **Node.js** e **Express**. Essa API RESTful é responsável por todas as regras de negócio e persistência de dados, utilizando um banco de dados **SQLite**.

📌 Funcionalidades:

- CRUD de produtos e movimentações
- Geração de relatórios de estoque
- Controle de entrada e saída de produtos
- Validações e boas práticas REST

🔗 [Documentação detalhada da API](./api/README.md)

---

### 🎨 `spa/` – Frontend

O frontend foi desenvolvido em **React.js** com Vite, consumindo a API via **Axios**. Apresenta uma interface amigável para usuários consultarem e gerenciarem o estoque.

🎯 Destaques:

- Páginas modulares com componentes reutilizáveis
- Acessibilidade com suporte a daltonismo
- Integração com API
- Layout adaptado para diferentes dispositivos

🔗 [Documentação detalhada do Frontend](./spa/README.md)

---

## 📸 Exemplo Prático – Funcionalidades em Ação

Nesta seção, apresentamos o funcionamento prático da aplicação, com capturas de tela e exemplos reais de uso da interface e API. Cada etapa representa uma parte essencial do fluxo de controle de estoque.

> Tela Principal
> ![Tela Inicial](./assets/00-tela-principal.png)

---

### 🧾 Exibição dos Produtos e Movimentações

A tela inicial exibe a **lista de produtos cadastrados**, com suas respectivas **quantidades**, **status (ativo/inativo)** e botão para visualizar o histórico de movimentações (entradas e saídas).

📌 **Funcionalidades envolvidas**:

- Integração direta com a API
- Consulta de produtos via API
- Listagem paginada e/ou com scroll
- Visualização de movimentações associadas ao produto

> Produtos
> ![Lista de Produtos](./assets/01-tela-produto.png)
> Movimentações
> ![Lista de Movimentação](./assets/02-tela-movimentacao.png)

---

### ➕ Criando um Novo Produto

Nesta etapa, o usuário realiza o cadastro do **primeiro item de estoque**, preenchendo informações como nome, descrição, unidade, categoria, quantidade mínima e quantidade inicial.

📌 **Funcionalidades envolvidas**:

- Formulário de criação de produto
- Requisição `POST` para o endpoint de produtos
- Validação de campos
- Feedback visual (ex: Toast de sucesso)
- Atualização dinâmica da lista de produtos

> Produto Disponível
> ![Novo Produto](./assets/video/01-criar-produto.gif)
> Produto Indisponível
> ![Novo Produto](./assets/video/02-criar-produto-indisponivel.gif)

---

### 🔄 Criando uma Movimentação

Ao acessar um produto, o usuário pode registrar uma **movimentação de entrada ou saída**, informando a quantidade, o motivo e a data.

📌 **Funcionalidades envolvidas**:

- Seleção de tipo de movimentação (entrada/saída)
- Atualização do estoque em tempo real
- Registro histórico da movimentação

> Movimentação de Saída
> ![Movimentação Produto Saída](./assets/video/03-criar-movimentacao-saida.gif)
> Movimentação de Entrada
> ![Movimentação Produto Entrada](./assets/video/04-criar-movimentacao-entrada.gif)

---

### 🧑‍🔧 Editando um Produto (Informações Completas)

Exemplo de edição completa: alterando nome, unidade, categoria e quantidades. Ideal para atualizações importantes no cadastro do produto.

📌 **Funcionalidades envolvidas**:

- Pré-preenchimento de campos no formulário
- Requisição `PUT` com dados modificados
- Atualização visual do item na lista

![Editar Produto]()

---

### ✏️ Editando um Produto (Edição Parcial)

Edição rápida de um ou dois campos, como apenas a **quantidade mínima** ou o **status** (ativo/inativo).

📌 **Funcionalidades envolvidas**:

- Requisição parcial (ex: `PATCH`, se implementado)
- Manutenção de dados não modificados

![Edição Parcial]()

---

### 🔍 Utilizando o Mecanismo de Pesquisa

A barra de pesquisa permite filtrar produtos por nome, código, categoria ou status. O resultado aparece dinamicamente.

📌 **Funcionalidades envolvidas**:

- Pesquisa client-side ou via API (`GET /produtos?q=...`)
- Atualização em tempo real conforme o usuário digita

![Pesquisa]()

---

> ⚙️ Em breve: Exemplo de **relatórios semanais**, **ajuste de planilhas** e **exportação de dados**.
