import MovimentacaoService from "../services/MovimentacaoService.js";
import ValidarMovimentacao from "./validadores/ValidarMovimentacao.js";

class MovimentacaoController {
  /**
   * Retorna uma movimentação específica com base no ID.
   */
  async show(req, res) {
    try {
      const { id } = req.params;
      const movimentacao = await MovimentacaoService.show(id);
      res.status(200).json(movimentacao);
    } catch (error) {
      res.status(400).json({
        mensagem: "Erro ao listar movimentação específica.",
        error: error.message,
      });
    }
  }

  //  Cria uma nova movimentação para um produto (entrada ou saída).

  async create(req, res) {
    try {
      const {
        id_produto,
        data_movimentacao,
        quantidade,
        justificativa,
        tipo_movimentacao,
      } = req.body;

      ValidarMovimentacao.validarCreate({
        id_produto,
        quantidade,
        justificativa,
        tipo_movimentacao,
      });

      const movimentacao = await MovimentacaoService.criarMovimentacao({
        data_movimentacao,
        id_produto,
        quantidade,
        justificativa,
        tipo_movimentacao,
      });

      res.status(201).json({
        sucesso: true,
        mensagem: "Sucesso ao criar movimentação do produto!",
        movimentacao,
      });
    } catch (error) {
      res.status(401).json({
        sucesso: false,
        mensagem: "Erro ao criar movimentação do produto.",
        error: error.message,
      });
    }
  }

  /**
   * Lista movimentações de um produto (com ou sem filtro) ou todas.
   * Se for passado um ID, lista do produto. Senão, lista todas.
   */
  async list(req, res) {
    try {
      const { id } = req.params;
      const { tipo } = req.query;

      if (id) {
        const movimentacoes = await MovimentacaoService.listProdutoMovimentacao(
          id,
          tipo
        );
        return res.status(200).json(movimentacoes);
      }

      const movimentacoes = await MovimentacaoService.list();
      return res.status(200).json(movimentacoes);
    } catch (error) {
      res.status(400).json({
        mensagem: "Erro ao listar movimentações.",
        error: error.message,
      });
    }
  }
}

export default new MovimentacaoController();
