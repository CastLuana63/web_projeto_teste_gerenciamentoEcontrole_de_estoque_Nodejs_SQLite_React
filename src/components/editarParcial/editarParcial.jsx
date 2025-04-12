import React, { useState } from "react";
import api from "../../services/api.js";

function EditarParcial({ tipo, setAbrirModalAlterar, produtos = [] }) {
  // Dados alterar produto
  const [produtoId, setProdutoId] = useState();
  const [descricao, setDescricao] = useState();
  const [unidade, setUnidade] = useState();
  const [quantidadeEmbalagem, setQuantidadeEmbalagem] = useState();
  const [disponivel, setDisponivel] = useState(true);

  // Função que altera parcialmente as informações do produto
  const alterarProduto = async () => {
    try {
      await api.patch(`/produtos/${produtoId}`, {
        descricao,
        unidade,
        quantidade_embalagem: quantidadeEmbalagem,
        disponivel,
      });

      console.log({
        data: {
          produtoId,
          descricao,
          unidade,
          quantidadeEmbalagem,
          disponivel,
        },
      });
      alert("Produto alterado com sucesso!");
      setAbrirModalAlterar(false);
    } catch (error) {
      console.log("Erro ao alterar c produto:", error);
      alert("Erro ao tentar alterar produto!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-criar">
        <h2>Alterar Produto</h2>
        <select
          className="select-estilizado"
          onChange={(e) => {
            const produto = JSON.parse(e.target.value);
            setProdutoId(produto.id_produto);
          }}
        >
          <option value="">Selecione um Produto</option>
          {produtos.map((produto) => (
            <option key={produto.id_produto} value={JSON.stringify(produto)}>
              {produto.id_produto} - {produto.descricao}
            </option>
          ))}
        </select>
        {tipo === "Descrição" && (
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        )}
        {tipo === "Unidade" && (
          <input
            type="text"
            placeholder="Unidade"
            value={unidade}
            onChange={(e) => setUnidade(e.target.value)}
          />
        )}
        {tipo === "Qtd/Embalagem" && (
          <input
            type="number"
            placeholder="Qtd por Embalagem"
            value={quantidadeEmbalagem}
            onChange={(e) => setQuantidadeEmbalagem(e.target.value)}
          />
        )}

        {tipo === "Status" && (
          <button onClick={() => setDisponivel(!disponivel)}>
            {disponivel ? "Disponível" : "Indisponível"}
          </button>
        )}

        <div className="modal-botoes">
          <button onClick={() => setAbrirModalAlterar(false)}>Cancelar</button>
          <button className="adicionar" onClick={alterarProduto}>
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarParcial;
