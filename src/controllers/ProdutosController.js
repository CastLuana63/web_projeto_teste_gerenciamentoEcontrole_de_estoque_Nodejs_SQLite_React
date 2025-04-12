import ProdutoService from "../services/ProdutoService.js";
import ValidarProdutos from "./validadores/ValidarInfoProdutos.js";

class ProdutosController {
  // Exibe um único produto pelo ID
  async show(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutoService.show(id);
      res.status(200).json(produto);
    } catch (error) {
      res.status(401).json({ mensagem: "Erro ao listar produto", error });
    }
  }

  // Cria um novo produto
  async create(req, res) {
    try {
      const { descricao, quantidade, unidade, quantidade_embalagem } = req.body;

      ValidarProdutos.validarCreate({
        descricao,
        quantidade,
        unidade,
        quantidade_embalagem,
      });

      const produto = await ProdutoService.create({
        descricao,
        quantidade,
        unidade,
        quantidade_embalagem,
      });

      res.status(201).json({
        sucesso: true,
        produto: produto,
        mensagem: "Produto criado com sucesso!",
      });
    } catch (error) {
      res.status(401).json({ mensagem: "Erro ao criar produto", error });
    }
  }

  // Lista todos os produtos
  async list(req, res) {
    try {
      const produtos = await ProdutoService.list();
      res.status(201).json(produtos);
    } catch (error) {
      res.status(401).json({ mensagem: "Erro ao listar produtos", error });
    }
  }

  // Atualiza completamente os dados de um produto
  async updateCompleto(req, res) {
    try {
      const { id } = req.params;
      const { descricao, unidade, quantidade_embalagem, disponivel } = req.body;

      const resultado = await ProdutoService.updateCompletoDoProduto({
        id,
        descricao,
        unidade,
        quantidade_embalagem,
        disponivel,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: resultado.mensagem,
        produto: resultado.dados,
      });
    } catch (error) {
      res.status(400).json({
        sucesso: false,
        mensagem: "Erro ao realizar atualização completa do produto",
        erro: error.message,
      });
    }
  }

  // Atualiza parcialmente os dados de um produto
  async updateParcial(req, res) {
    try {
      const { id } = req.params;
      const { descricao, unidade, quantidade_embalagem, disponivel } = req.body;

      ValidarProdutos.validarUpdateParcial({
        id,
        descricao,
        unidade,
        quantidade_embalagem,
        disponivel,
      });

      const resultado = await ProdutoService.updateParcialDoProduto({
        id,
        descricao,
        unidade,
        quantidade_embalagem,
        disponivel,
      });

      res.status(200).json({
        sucesso: true,
        mensagem: resultado.mensagem,
        produto: resultado.produtoAlterado,
      });
    } catch (error) {
      res.status(400).json({
        sucesso: false,
        mensagem: "Erro ao realizar atualização parcial do produto",
        erro: error.message,
      });
    }
  }
}

export default new ProdutosController();
