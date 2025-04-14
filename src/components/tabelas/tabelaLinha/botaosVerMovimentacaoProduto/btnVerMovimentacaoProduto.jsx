import React from "react";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import "../../tabelas.css";

function BtnVerMovimentacaoProduto({ abrirMovProduto, idProduto }) {
  return (
    <>
      <td>
        <button
          className="adicionar"
          onClick={() => abrirMovProduto(idProduto, "Entrada")}
        >
          <FiArrowUp />
        </button>
      </td>
      <td>
        <button onClick={() => abrirMovProduto(idProduto, "Saída")}>
          <FiArrowDown />
        </button>
      </td>
    </>
  );
}

export default BtnVerMovimentacaoProduto;
