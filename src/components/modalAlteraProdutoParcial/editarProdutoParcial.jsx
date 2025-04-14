import React, { useState } from "react";
import { alterarProdutoParcial } from "../../utils/requisicaoProduto";

function EditarParcial({
  tipo,
  setAbrirModalAlterar,
  produtos = [],
  setProdutos,
}) {
  // Dados alterar produto
  const [produtoId, setProdutoId] = useState();
  const [descricao, setDescricao] = useState();
  const [unidade, setUnidade] = useState();
  const [quantidadeEmbalagem, setQuantidadeEmbalagem] = useState();
  const [disponivel, setDisponivel] = useState(true);

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
            placeholder="Quantidade por Embalagem"
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
          <button
            className="adicionar"
            onClick={() =>
              alterarProdutoParcial({
                setAbrirModalAlterar,
                setProdutos,
                produtoId,
                descricao,
                unidade,
                quantidadeEmbalagem,
                disponivel,
              })
            }
          >
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarParcial;
