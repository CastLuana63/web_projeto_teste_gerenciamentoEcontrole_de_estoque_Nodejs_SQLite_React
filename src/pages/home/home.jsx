import React, { useState, useEffect } from "react";
import { colunasMov, colunasProduto } from "../../utils/tabelasTitulos.js";
import "./home.css";

import api from "../../services/api.js";
import { mostrarProdutos } from "../../utils/requisicaoProduto.js";
import { mostrarMovimentacao } from "../../utils/requisicaoMovimentacao.js";
import Header from "../../components/header/header";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import Tabelas from "../../components/tabelas/tabelas";
import CriarProduto from "../../components/modalCriarProduto/criarProduto.jsx";
import ModalAlterarCompleto from "../../components/modalAlterarProdutoCompleto/alterarProdutoCompleto.jsx";
import CriarMovimentacao from "../../components/modalCriarMovimentacao/criarMovimentacao.jsx";

export default function Home() {
  const [ativo, setAtivo] = useState("Produto");
  const [temaDaltonico, setTemaDaltonico] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalCriarMov, setMostrarModalCriarMov] = useState(false);

  // Armazena todas os produtos e Movimentações
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Abre o modal para alterar e armazena o id do produto
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false);

  // Muda o tema visual da aplicação para o modo de acessibilidade
  const mudarTema = () => {
    setTemaDaltonico(!temaDaltonico);
  };

  // Abre o modal para criar produto
  const abrirModalCriar = () => {
    if (ativo === "Produto") return setMostrarModalCriar(true);
    else return setMostrarModalCriarMov(true);
  };

  // Mostra as movimentações de saída ou entrada de um produto
  const buscarMovimentacoesProduto = async (idProduto, tipo) => {
    try {
      const resposta = await api.get(
        `/produtos/${idProduto}/movimentacoes?tipo=${tipo}`
      );
      return resposta.data;
    } catch (error) {
      console.log("Erro ao buscar movimentações do produto:", error);
      return [];
    }
  };

  // Hook do React que abre ou fecha o menuSideBar quando a interface tenha um certo tamanho (600px)
  useEffect(() => {
    const menuFechar = () => {
      if (window.innerWidth > 600 && menuAberto) {
        setMenuAberto(false);
      }
    };
    window.addEventListener("resize", menuFechar);
    return () => window.removeEventListener("resize", menuFechar);
  }, [menuAberto]);

  // Hook do React que atualiza os dados da api e exibem na interface assim que há um reload na página
  useEffect(() => {
    mostrarProdutos({ setProdutos });
    mostrarMovimentacao({ setMovimentacoes });
  }, []);

  return (
    <div className={`container ${temaDaltonico ? "tema-daltonico" : ""}`}>
      <Header
        ativo={ativo}
        setAtivo={setAtivo}
        temaDaltonico={temaDaltonico}
        mudarTema={mudarTema}
        menuAberto={menuAberto}
        setMenuAberto={setMenuAberto}
      />
      <div className="scroll-area">
        <div className="box">
          <Cabecalho
            setMostrarModalAlterar={setMostrarModalAlterar}
            abrirModalCriar={abrirModalCriar}
            ativo={ativo}
          />
          {ativo === "Produto" ? (
            <Tabelas
              tipo="produto"
              dados={produtos}
              colunas={colunasProduto}
              buscarMovimentacoesProduto={buscarMovimentacoesProduto}
            />
          ) : (
            <Tabelas tipo="mov" dados={movimentacoes} colunas={colunasMov} />
          )}
        </div>

        {mostrarModalCriar && (
          <CriarProduto
            setMostrarModalCriar={setMostrarModalCriar}
            setProdutos={setProdutos}
          />
        )}

        {mostrarModalCriarMov && (
          <CriarMovimentacao
            setMostrarModalCriarMov={setMostrarModalCriarMov}
            produtos={produtos}
            setProdutos={setProdutos}
          />
        )}

        {mostrarModalCriarMov && (
          <CriarMovimentacao
            setMostrarModalCriarMov={setMostrarModalCriarMov}
            produtos={produtos}
            setProdutos={setProdutos}
            setMovimentacoes={setMovimentacoes}
          />
        )}
      </div>

      {menuAberto && (
        <div className="sidebar">
          <button
            onClick={mudarTema}
            className={`btn ${temaDaltonico ? "lightMode" : ""}`}
          >
            <span className="indicator"></span>
          </button>
        </div>
      )}
    </div>
  );
}
