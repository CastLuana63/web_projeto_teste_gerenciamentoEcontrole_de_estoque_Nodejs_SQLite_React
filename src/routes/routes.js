import { Router } from "express";
import Produtos from "../controllers/ProdutosController.js";
import Movimentacao from "../controllers/MovimentacaoController.js";

const routes = Router();

// Rotas de Produtos
routes.post("/produtos", Produtos.create); // Criar produto
routes.get("/produtos", Produtos.list); // Listar todos os produtos
routes.get("/produtos/:id", Produtos.show); // Exibir um produto específico
routes.put("/produtos/:id", Produtos.updateCompleto); // Atualização completa do produto
routes.patch("/produtos/:id", Produtos.updateParcial); // Atualização parcial do produto

// Rotas de Movimentações
routes.post("/movimentacao", Movimentacao.create); // Criar movimentação (entrada/saída)
routes.get("/movimentacao", Movimentacao.list); // Listar todas as movimentações
routes.get("/movimentacao/:id", Movimentacao.show); // Exibir movimentação específica

/*
  -> Rota adicionais: Listar movimentações de um produto específico
    - /produtos/:id/movimentacoes?tipo=Entrada  -> movimentações de entrada
    - /produtos/:id/movimentacoes?tipo=Saída    -> movimentações de saída
 */
routes.get("/produtos/:id/movimentacoes", Movimentacao.list);

export default routes;
