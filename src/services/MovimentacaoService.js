import { openDb } from "../helpers/configdb.js";
import { converterPraNumero } from "./utils/converterPraNumero.js";

class MovimentacaoService {
  async show(id) {
    try {
      const db = await openDb();
      const id_movimentacao = converterPraNumero(id);
      const movimentacao = await db.get(
        `SELECT * FROM movimentacao WHERE id_movimentacao = ?`,
        [id_movimentacao]
      );
      return movimentacao;
    } catch (error) {
      console.error("Erro ao tentar mostrar a movimentação específica!");
      throw new Error("Erro ao tentar mostrar a movimentação!");
    }
  }

  async criarMovimentacao(data) {
    try {
      const db = await openDb();
      let {
        data_movimentacao,
        id_produto,
        justificativa,
        tipo_movimentacao,
        quantidade,
      } = data;

      id_produto = converterPraNumero(id_produto);
      quantidade = converterPraNumero(quantidade ?? 0);

      const produto = await db.get(
        `SELECT * FROM produto WHERE id_produto = ?`,
        [id_produto]
      );

      if (!produto) throw new Error("O ID do produto não existe!");

      if (tipo_movimentacao === "Saída") {
        if (produto.quantidade < quantidade) {
          throw new Error(
            "Não há produtos suficientes para a quantidade de saída."
          );
        }

        await db.run(
          `UPDATE produto SET quantidade = quantidade - ? WHERE id_produto = ?`,
          [quantidade, id_produto]
        );
      } else {
        await db.run(
          `UPDATE produto SET quantidade = quantidade + ? WHERE id_produto = ?`,
          [quantidade, id_produto]
        );
      }

      const novaData = data_movimentacao
        ? new Date(data_movimentacao).toISOString()
        : new Date().toISOString();

      const novaMovimentacao = await db.run(
        `INSERT INTO movimentacao (id_produto, quantidade, tipo_movimentacao, justificativa, data_movimentacao)
         VALUES (?, ?, ?, ?, ?)`,
        [
          id_produto,
          quantidade,
          tipo_movimentacao ?? "",
          justificativa ?? "",
          novaData,
        ]
      );

      return {
        sucesso: true,
        movimentacao: {
          id_movimentacao: novaMovimentacao.lastID,
          id_produto,
          quantidade,
          tipo_movimentacao,
          justificativa,
          data_movimentacao: novaData,
        },
      };
    } catch (error) {
      console.error("Erro ao criar movimentação:", error.message);
      throw new Error("Erro ao tentar criar movimentação.");
    }
  }

  async list() {
    try {
      const db = await openDb();
      const movimentacoes = await db.all(`SELECT * FROM movimentacao`);
      return movimentacoes;
    } catch (error) {
      console.error("Erro ao tentar mostrar todas as movimentações!");
      throw new Error("Erro ao tentar mostrar todas as movimentações!");
    }
  }

  async listProdutoMovimentacao(id, tipo = null) {
    try {
      const db = await openDb();
      const id_produto = converterPraNumero(id);

      const produto = await db.get(
        `SELECT * FROM produto WHERE id_produto = ?`,
        [id_produto]
      );
      if (!produto) throw new Error("O ID do produto não existe!");

      if (tipo === "Entrada" || tipo === "Saída") {
        const movimentacoes = await db.all(
          `SELECT * FROM movimentacao WHERE id_produto = ? AND tipo_movimentacao = ?`,
          [id_produto, tipo]
        );
        return movimentacoes;
      }

      const movimentacoes = await db.all(
        `SELECT * FROM movimentacao WHERE id_produto = ?`,
        [id_produto]
      );

      return movimentacoes;
    } catch (error) {
      console.error("Erro ao listar movimentações do produto:", error.message);
      throw new Error("Erro ao listar movimentações do produto.");
    }
  }
}

export default new MovimentacaoService();
