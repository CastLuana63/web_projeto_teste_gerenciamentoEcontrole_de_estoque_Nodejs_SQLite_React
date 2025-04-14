import React, { useState, useEffect } from "react";
import { colunasMov, colunasProduto } from "../../utils/tabelasTitulos.js";
import "./home.css";

import { mostrarProdutos } from "../../utils/requisicaoProduto.js";
import { mostrarMovimentacao } from "../../utils/requisicaoMovimentacao.js";

import Header from "../../components/header/header";
import Cabecalho from "../../components/cabecalho/cabecalho.jsx";
import Tabelas from "../../components/tabelas/tabelas";
import CriarProduto from "../../components/modalCriarProduto/criarProduto.jsx";
import ModalAlterarCompleto from "../../components/modalAlterarProdutoCompleto/alterarProdutoCompleto.jsx";
import CriarMovimentacao from "../../components/modalCriarMovimentacao/criarMovimentacao.jsx";

export default function Home() {
  // Estados principais de controle da tela
  const [ativo, setAtivo] = useState("Produto"); // Controla as abas do Header (Produto ou Movimentação)
  const [temaDaltonico, setTemaDaltonico] = useState(false); // Alterna entre tema normal e acessível (Daltonico)
  const [menuAberto, setMenuAberto] = useState(false); // Controla visibilidade do menu lateral

  // Estados que armazenam dados da API
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Estados para exibição dos modais
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false); // Modal para criar produto
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false); // Modal para alterar produto
  const [mostrarModalCriarMov, setMostrarModalCriarMov] = useState(false); // Modal para criar movimentação

  // Alterna o tema da aplicação para modo acessível
  const mudarTema = () => {
    setTemaDaltonico(!temaDaltonico);
  };

  // Abre o modal de acordo com a aba ativa
  const abrirModalCriar = () => {
    if (ativo === "Produto") return setMostrarModalCriar(true);
    else return setMostrarModalCriarMov(true);
  };

  // Fecha automaticamente o menu lateral se a largura da tela for maior que 600px
  useEffect(() => {
    const menuFechar = () => {
      if (window.innerWidth > 600 && menuAberto) {
        setMenuAberto(false);
      }
    };
    window.addEventListener("resize", menuFechar);
    return () => window.removeEventListener("resize", menuFechar);
  }, [menuAberto]);

  // Carrega dados da API ao montar o componente
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
            setMovimentacoes={setMovimentacoes}
            setProdutos={setProdutos}
            produtos={produtos}
            movimentacoes={movimentacoes}
          />

          {ativo === "Produto" ? (
            <Tabelas
              tipo="produto"
              dados={produtos}
              colunas={colunasProduto}
              setProdutos={setProdutos}
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

        {mostrarModalAlterar && (
          <ModalAlterarCompleto
            produtos={produtos}
            setProdutos={setProdutos}
            setMostrarModalAlterar={setMostrarModalAlterar}
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
