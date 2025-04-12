import React, { useState } from "react";
import "./tabelas.css";
import { FiArrowUp, FiArrowDown } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import EditarParcial from "../editarParcial/editarParcial";

function Tabelas({ dados, colunas, tipo, buscarMovimentacoesProduto }) {
  const [produtoExpandido, setProdutoExpandido] = useState(null);
  const [movimentacoesFiltradas, setMovimentacoesFiltradas] = useState([]);
  const [abrirModalAlterar, setAbrirModalAlterar] = useState(false);
  const [tipoCampo, setTipoCampo] = useState();

  const containerClasse = `tabela-container${
    dados?.length >= 10 ? " tabela-scroll" : ""
  }`;

  const abrirMovProduto = async (produtoId, tipoMov) => {
    const chave = `${produtoId}-${tipoMov}`;

    if (produtoExpandido === chave) {
      setProdutoExpandido(null);
      setMovimentacoesFiltradas([]);
      return;
    }

    const movimentacoes = await buscarMovimentacoesProduto(produtoId, tipoMov);
    setMovimentacoesFiltradas(movimentacoes);
    setProdutoExpandido(chave);
  };

  return (
    <div className={containerClasse}>
      <table className="tabela">
        <thead>
          <tr>
            {colunas.map((col, index) => (
              <th key={index}>
                {col.titulo}
                {col.titulo !== "ID do Produto" &&
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

        {dados && dados.length > 0 ? (
          dados.map((linha, index) => {
            const chaveEntrada = `${linha.id_produto}-Entrada`;
            const chaveSaida = `${linha.id_produto}-Saída`;
            const expandido =
              produtoExpandido === chaveEntrada ||
              produtoExpandido === chaveSaida;

            return (
              <React.Fragment key={index}>
                <tbody>
                  <tr
                    className={
                      index % 2 === 0 ? "linha-branca" : "linha-sem-cor"
                    }
                  >
                    {colunas.map((col, i) => {
                      const valor = linha[col.chave];
                      const isProdutoDisponivel =
                        tipo === "produto" &&
                        col.chave === "disponivel" &&
                        valor.toLowerCase() === "disponível";

                      const isMovimentacaoEntrada =
                        tipo === "mov" &&
                        col.chave === "tipo_movimentacao" &&
                        valor.toLowerCase() === "entrada";

                      return (
                        <td key={i} data-label={col.titulo}>
                          {isProdutoDisponivel || isMovimentacaoEntrada ? (
                            <span className="trDisponivel">
                              {valor.toUpperCase()}
                            </span>
                          ) : col.chave === "disponivel" ||
                            col.chave === "tipo_movimentacao" ? (
                            <span className="trIndisponivel">
                              {valor.toUpperCase()}
                            </span>
                          ) : (
                            valor
                          )}
                        </td>
                      );
                    })}

                    {tipo === "produto" && (
                      <>
                        <td>
                          <button
                            className="adicionar"
                            onClick={() =>
                              abrirMovProduto(linha.id_produto, "Entrada")
                            }
                          >
                            <FiArrowUp />
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              abrirMovProduto(linha.id_produto, "Saída")
                            }
                          >
                            <FiArrowDown />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>

                  {tipo === "produto" && expandido && (
                    <>
                      <tr className="linha-expandida linha-branca">
                        <td
                          colSpan={colunas.length + 2}
                          style={{ background: "white" }}
                        >
                          <div
                            className={`sub-tabela-container ${
                              produtoExpandido.includes("Entrada")
                                ? "entrada"
                                : "saida"
                            }`}
                          >
                            <table className="sub-tabela">
                              {movimentacoesFiltradas.length > 0 ? (
                                <>
                                  <thead>
                                    <tr>
                                      <th>ID</th>
                                      <th>Data</th>
                                      <th>Quantidade</th>
                                      <th>Justificativa</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {movimentacoesFiltradas.map((mov) => (
                                      <tr
                                        key={mov.id_movimentacao}
                                        className="tabelaMini"
                                      >
                                        <td>{mov.id_movimentacao}</td>
                                        <td>{mov.data_movimentacao}</td>
                                        <td>{mov.quantidade}</td>
                                        <td>{mov.justificativa}</td>
                                      </tr>
                                    ))}
                                    <tr className="total-movimentacao">
                                      <td
                                        colSpan="2"
                                        style={{ fontWeight: "bold" }}
                                      >
                                        Total
                                      </td>
                                      <td style={{ fontWeight: "bold" }}>
                                        {movimentacoesFiltradas.reduce(
                                          (contagem, mov) =>
                                            contagem + Number(mov.quantidade),
                                          0
                                        )}
                                      </td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                </>
                              ) : (
                                <tbody>
                                  <tr>
                                    <td colSpan="4">
                                      <div className="mensagem-vazia">
                                        <p>Nenhuma movimentação encontrada.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              )}
                            </table>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={colunas.length + 2}>
                          <hr className="divisoria" />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </React.Fragment>
            );
          })
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={colunas.length + (tipo === "produto" ? 2 : 0)}
                className="alerta"
              >
                {tipo === "produto"
                  ? "Nenhum Produto Encontrado"
                  : "Nenhuma Movimentação Encontrada"}
              </td>
            </tr>
          </tbody>
        )}
      </table>
      {abrirModalAlterar && (
        <EditarParcial
          tipo={tipoCampo}
          setAbrirModalAlterar={setAbrirModalAlterar}
          produtos={tipo === "produto" ? dados : []}
        />
      )}
    </div>
  );
}

export default Tabelas;
