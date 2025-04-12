import React, { useState } from "react";
import { criarProduto } from "../../utils/requisicaoProduto";
import "./criarProduto.css";

function CriarProduto({ setMostrarModalCriar, setProdutos }) {
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("");
  const [quantidadeEmbalagem, setQuantidadeEmbalagem] = useState("");
  const [disponivel, setDisponivel] = useState(true);

  return (
    <div className="modal-overlay">
      <div className="modal modal-criar">
        <h2>Novo Produto</h2>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
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
          <button onClick={() => setMostrarModalCriar(false)}>Cancelar</button>
          <button
            className="adicionar"
            onClick={() =>
              criarProduto({
                setMostrarModalCriar,
                descricao,
                quantidade,
                unidade,
                quantidadeEmbalagem,
                disponivel,
                setProdutos,
              })
            }
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CriarProduto;
