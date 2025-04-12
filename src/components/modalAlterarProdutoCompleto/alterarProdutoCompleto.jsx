import React, { useState } from "react";
import { alterarProduto } from "../../utils/requisicaoProduto";
import "./alterarProdutoCompleto.css";

function ModalAlterarCompleto({
  produtos,
  setProdutos,
  setMostrarModalAlterar,
}) {
  // Dados criar ou alterar produto
  const [produtoSelecionado, setProdutoSelecionado] = useState();
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
            setProdutoSelecionado(produto);
          }}
        >
          <option value="">Selecione um Produto</option>
          {produtos.map((produto) => (
            <option key={produto.id_produto} value={JSON.stringify(produto)}>
              {produto.id_produto} - {produto.descricao}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="text"
          placeholder="Unidade"
          value={unidade}
          onChange={(e) => setUnidade(e.target.value)}
        />
        <input
          type="number"
          placeholder="Qtd por Embalagem"
          value={quantidadeEmbalagem}
          onChange={(e) => setQuantidadeEmbalagem(e.target.value)}
        />

        <button onClick={() => setDisponivel(!disponivel)}>
          {disponivel ? "Disponível" : "Indisponível"}
        </button>

        <div className="modal-botoes">
          <button onClick={() => setMostrarModalAlterar(false)}>
            Cancelar
          </button>
          <button
            className="adicionar"
            onClick={() =>
              alterarProduto({
                setMostrarModalAlterar,
                setProdutos,
                produtoSelecionado,
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

export default ModalAlterarCompleto;
