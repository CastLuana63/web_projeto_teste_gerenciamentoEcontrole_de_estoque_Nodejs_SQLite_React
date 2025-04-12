# 🧪 Projeto Teste – Aplicação Web para Controle e Movimentação de Estoque

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
- [ ] Listar movimentações específicas
- [ ] Listar movimentações de produto
- [ ] Listar movimentações de produto específicos (Entrada ou Saída)

#### Update

- [ ] Atualizar todos dados de produtos
- [ ] Atualizar alguns dados de produtos
- [ ] Ativar e Inativar produtos

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
