import React, { useState } from "react";
import "./tabelas.css";
import EditarParcial from "../modalAlteraProdutoParcial/editarProdutoParcial";
import { buscarMovimentacoesProduto } from "../../utils/requisicaoMovimentacao";
import TabelaHeader from "./tabelaHeader/tabelaHeader";
import TabelaLinha from "./tabelaLinha/tabelaLinha";

function Tabelas({ dados, colunas, tipo, setProdutos }) {
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

    const movimentacoes = await buscarMovimentacoesProduto({
      idProduto: produtoId,
      tipo: tipoMov,
    });

    setMovimentacoesFiltradas(movimentacoes);
    setProdutoExpandido(chave);
  };

  return (
    <div className={containerClasse}>
      <table className="tabela">
        <TabelaHeader
          colunas={colunas}
          tipo={tipo}
          setAbrirModalAlterar={setAbrirModalAlterar}
          setTipoCampo={setTipoCampo}
        />

        <tbody>
          {dados && dados.length > 0 ? (
            dados.map((linha, index) => {
              const chaveEntrada = `${linha.id_produto}-Entrada`;
              const chaveSaida = `${linha.id_produto}-Saída`;
              const expandido =
                produtoExpandido === chaveEntrada ||
                produtoExpandido === chaveSaida;

              return (
                <React.Fragment key={index}>
                  <TabelaLinha
                    linha={linha}
                    colunas={colunas}
                    tipo={tipo}
                    abrirMovProduto={abrirMovProduto}
                    index={index}
                  />

                  {tipo === "produto" && expandido && (
                    <>
                      <tr
                        className={`linha-expandida ${
                          index % 2 === 0 ? "linha-branca" : "linha-sem-cor"
                        }`}
                      >
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
                                      <th>Justificativa</th>
                                      <th>Quantidade</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {movimentacoesFiltradas.map((mov) => (
                                      <tr
                                        key={mov.id_movimentacao}
                                        className="tabelaMini"
                                      >
                                        <td>{mov.id_movimentacao}</td>
                                        <td>
                                          {
                                            String(mov.data_movimentacao).split(
                                              "T"
                                            )[0]
                                          }
                                        </td>
                                        <td>{mov.justificativa}</td>
                                        <td>{mov.quantidade}</td>
                                      </tr>
                                    ))}
                                    <tr className="total-movimentacao">
                                      <td></td>
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
                </React.Fragment>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={colunas.length + (tipo === "produto" ? 1 : 0)}
                className="alerta"
              >
                {tipo === "produto"
                  ? "Nenhum Produto Encontrado"
                  : "Nenhuma Movimentação Encontrada"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {abrirModalAlterar && (
        <EditarParcial
          tipo={tipoCampo}
          setAbrirModalAlterar={setAbrirModalAlterar}
          produtos={tipo === "produto" ? dados : []}
          setProdutos={setProdutos}
        />
      )}
    </div>
  );
}

export default Tabelas;
