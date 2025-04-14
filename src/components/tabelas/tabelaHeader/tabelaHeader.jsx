import React from "react";
import { MdEditSquare } from "react-icons/md";
import "../tabelas.css";

function TabelaHeader({ colunas, tipo, setAbrirModalAlterar, setTipoCampo }) {
  return (
    <thead>
      <tr>
        {colunas.map((col, index) => (
          <th key={index}>
            {col.titulo}
            {tipo === "produto" &&
              col.titulo !== "ID do Produto" &&
              col.titulo !== "Quantidade" && (
                <MdEditSquare
                  className="iconEditar"
                  onClick={() => {
                    setAbrirModalAlterar(true), setTipoCampo(col.titulo);
                  }}
                />
              )}
          </th>
        ))}
        {tipo === "produto" && (
          <>
            <th>Entrada</th>
            <th>Saída</th>
          </>
        )}
      </tr>
    </thead>
  );
}

export default TabelaHeader;
