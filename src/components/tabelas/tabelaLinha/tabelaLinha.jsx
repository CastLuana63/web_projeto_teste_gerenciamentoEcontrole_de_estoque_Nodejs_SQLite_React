import React from "react";
import BtnVerMovimentacaoProduto from "./botaosVerMovimentacaoProduto/btnVerMovimentacaoProduto";
import "../tabelas.css";

function TabelaLinha({ linha, colunas, tipo, abrirMovProduto, index }) {
  return (
    <tr className={index % 2 === 0 ? "linha-branca" : "linha-sem-cor"}>
      {colunas.map((col, i) => {
        const valor = linha[col.chave];
        const disponibilidade =
          typeof valor === "string" ? valor.toLowerCase() : "";

        const temProdutoDisponivel =
          tipo === "produto" &&
          col.chave === "disponivel" &&
          (disponibilidade === "disponível" ||
            disponibilidade === "disponível");

        const temMovimentacaoEntrada =
          tipo === "mov" &&
          col.chave === "tipo_movimentacao" &&
          disponibilidade === "entrada";

        const data = col.chave.toLowerCase().includes("data") && valor;

        function formatarDisponibilidade(texto) {
          if (typeof texto !== "string") return texto;
          return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
        }
        return (
          <td key={i} data-label={col.titulo}>
            {data ? (
              valor.split("T")[0]
            ) : temProdutoDisponivel || temMovimentacaoEntrada ? (
              <span className="trDisponivel">
                {formatarDisponibilidade(valor?.toString())}
              </span>
            ) : col.chave === "disponivel" ||
              col.chave === "tipo_movimentacao" ? (
              <span className="trIndisponivel">
                {formatarDisponibilidade(valor?.toString())}
              </span>
            ) : (
              valor
            )}
          </td>
        );
      })}

      {tipo === "produto" && (
        <BtnVerMovimentacaoProduto
          abrirMovProduto={abrirMovProduto}
          idProduto={linha.id_produto}
        />
      )}
    </tr>
  );
}

export default TabelaLinha;
