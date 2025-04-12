import React, { useState } from "react";
import "./CriarMovimentacao.css";
import { criarMov } from "../../utils/requisicaoMovimentacao";

function CriarMovimentacao({
  setMostrarModalCriarMov,
  produtos,
  setProdutos,
  setMovimentacoes,
}) {
  const [tipoMov, setTipoMov] = useState("Entrada");
  const [idProduto, setIdProduto] = useState();
  const [justificativa, setJustificativa] = useState();
  const [quantidadeMov, setQuantidadeMov] = useState(0);
  const [dataMovimentacao, setDataMovimentacao] = useState();

  return (
    <div className="modal-overlay">
      <div className="modal modal-criar">
        <h2>Nova Movimentação</h2>

        <select
          className="select-estilizado"
          onChange={(e) => {
            const produto = JSON.parse(e.target.value);
            setIdProduto(produto.id_produto);
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
          placeholder="Justificativa"
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
        />

        <input
          type="number"
          placeholder="Quantidade"
          value={quantidadeMov}
          onChange={(e) => setQuantidadeMov(Number(e.target.value))}
        />

        <input
          type="date"
          value={dataMovimentacao}
          onChange={(e) => setDataMovimentacao(e.target.value)}
          className="input-data"
        />

        <button
          onClick={() =>
            setTipoMov(tipoMov === "Entrada" ? "Saída" : "Entrada")
          }
        >
          {tipoMov}
        </button>

        <div className="modal-botoes">
          <button onClick={() => setMostrarModalCriarMov(false)}>
            Cancelar
          </button>
          <button
            className="adicionar"
            onClick={() =>
              criarMov({
                setMostrarModalCriarMov,
                setMovimentacoes,
                setProdutos,
                idProduto,
                quantidadeMov,
                dataMovimentacao,
                justificativa,
                tipoMov,
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

export default CriarMovimentacao;
