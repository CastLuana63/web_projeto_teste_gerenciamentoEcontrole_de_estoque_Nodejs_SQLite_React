import { openDb } from "../helpers/configdb.js";
import { converterPraNumero } from "./utils/converterPraNumero.js";

class ProdutosService {
  async show(id) {
    try {
      const db = await openDb();
      id = converterPraNumero(id);
      const produto = await db.get(
        `SELECT id_produto, descricao, quantidade, unidade, quantidade_embalagem, CASE WHEN disponivel = 1 THEN 'disponível' ELSE 'indisponível' END AS Disponivel FROM produto WHERE id_produto = ?`,
        [id]
      );
      return produto;
    } catch (error) {
      console.error("Erro ao tentar mostrar produto:", error);
      throw new Error("Erro ao tentar mostrar produto!");
    }
  }

  async create(data) {
    try {
      const db = await openDb();
      let { descricao, quantidade, unidade, quantidade_embalagem } = data;

      quantidade = converterPraNumero(quantidade ?? 0);
      quantidade_embalagem = converterPraNumero(quantidade_embalagem ?? 0);

      const produto = await db.run(
        `INSERT INTO produto (descricao, quantidade, unidade, quantidade_embalagem) VALUES (?, ?, ?, ?)`,
        [descricao ?? "", quantidade, unidade ?? "", quantidade_embalagem]
      );

      return {
        id: produto.lastID,
        descricao,
        quantidade,
        unidade,
        quantidade_embalagem,
      };
    } catch (error) {
      console.error("Erro ao tentar criar produto:", error);
      throw new Error("Erro ao tentar criar produto!");
    }
  }

  async list() {
    try {
      const db = await openDb();
      const produtos = await db.all(
        `SELECT id_produto, descricao, quantidade, unidade, quantidade_embalagem, CASE WHEN disponivel = 1 THEN 'disponível' ELSE 'indisponível' END AS disponivel FROM produto`
      );
      return produtos;
    } catch (error) {
      console.error("Erro ao tentar listar produtos:", error);
      throw new Error("Erro ao tentar listar produtos!");
    }
  }

  async updateCompletoDoProduto(data) {
    try {
      const db = await openDb();
      let { id, descricao, unidade, disponivel } = data;

      id = converterPraNumero(id);

      const quantidade_embalagem = converterPraNumero(
        data.quantidade_embalagem ?? 0
      );

      const produtoExiste = await db.get(
        `SELECT * FROM produto WHERE id_produto = ?`,
        [id]
      );

      if (!produtoExiste) {
        throw new Error("Produto não existe. Informe um código válido.");
      }

      const resultado = await db.run(
        `UPDATE produto SET descricao = ?, unidade = ?, quantidade_embalagem = ?, disponivel = ? WHERE id_produto = ?`,
        [
          descricao ?? "",
          unidade ?? "",
          quantidade_embalagem,
          disponivel ?? 0,
          id,
        ]
      );

      if (resultado.changes === 0) {
        return {
          mensagem:
            "Nenhuma informação foi alterada. Verifique se os dados enviados são diferentes.",
        };
      }

      return {
        mensagem: "Produto atualizado com sucesso.",
        dados: {
          id,
          descricao,
          unidade,
          quantidade_embalagem,
          disponivel,
        },
      };
    } catch (error) {
      console.error("Erro ao atualizar produto:", error.message);
      throw new Error("Erro ao tentar alterar informações do produto.");
    }
  }

  async updateParcialDoProduto(data) {
    try {
      const db = await openDb();
      let { id, descricao, unidade, quantidade_embalagem, disponivel } = data;

      id = converterPraNumero(id);
      if (quantidade_embalagem !== undefined)
        quantidade_embalagem = converterPraNumero(quantidade_embalagem);

      const produtoExiste = await db.get(
        `SELECT * FROM produto WHERE id_produto = ?`,
        [id]
      );

      if (!produtoExiste) {
        throw new Error("Produto não existe. Informe um código válido.");
      }

      const produtoAlterado = { id };

      if (descricao !== undefined) {
        await db.run(`UPDATE produto SET descricao = ? WHERE id_produto = ?`, [
          descricao,
          id,
        ]);
        produtoAlterado.descricao = descricao;
      }

      if (unidade !== undefined) {
        await db.run(`UPDATE produto SET unidade = ? WHERE id_produto = ?`, [
          unidade,
          id,
        ]);
        produtoAlterado.unidade = unidade;
      }

      if (quantidade_embalagem !== undefined) {
        await db.run(
          `UPDATE produto SET quantidade_embalagem = ? WHERE id_produto = ?`,
          [quantidade_embalagem, id]
        );
        produtoAlterado.quantidade_embalagem = quantidade_embalagem;
      }

      if (disponivel !== undefined) {
        await db.run(`UPDATE produto SET disponivel = ? WHERE id_produto = ?`, [
          disponivel,
          id,
        ]);
        produtoAlterado.disponivel = disponivel;
      }

      return {
        mensagem: "Informações do produto alteradas com sucesso!",
        produtoAlterado,
      };
    } catch (error) {
      console.error(
        "Erro ao tentar alterar informações do produto:",
        error.message
      );
      throw new Error("Erro ao tentar alterar informações do produto.");
    }
  }
}

export default new ProdutosService();
