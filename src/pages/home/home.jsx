import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import { IoMdSearch, IoMdCreate } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import Tabelas from "../../components/tabelas/tabelas";
import "./home.css";
import api from "../../services/api.js";
import { colunasMov, colunasProduto } from "../../utils/tabelasTitulos.js";

export default function Home() {
  const [ativo, setAtivo] = useState("Produto");
  const [temaDaltonico, setTemaDaltonico] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [mostrarModalCriar, setMostrarModalCriar] = useState(false);
  const [mostrarModalCriarMov, setMostrarModalCriarMov] = useState(false);

  // Armazena todas os produtos e Movimentações
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);

  // Dados criar ou alterar produto
  const [descricao, setDescricao] = useState();
  const [quantidade, setQuantidade] = useState();
  const [unidade, setUnidade] = useState();
  const [quantidadeEmbalagem, setQuantidadeEmbalagem] = useState();
  const [disponivel, setDisponivel] = useState(true);

  // Dados Mov
  const [idProduto, setIdProduto] = useState();
  const [tipoMov, setTipoMov] = useState("Entrada" || "Saída");
  const [justificativa, setJustificativa] = useState();
  const [quantidadeMov, setQuantidadeMov] = useState();
  const [dataMovimentacao, setDataMovimentacao] = useState();

  // Abre o modal para alterar e armazena o id do produto
  const [mostrarModalAlterar, setMostrarModalAlterar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState();

  // Muda o tema visual da aplicação para o modo de acessibilidade
  const mudarTema = () => {
    setTemaDaltonico(!temaDaltonico);
  };

  // Abre o modal para criar produto
  const abrirModalCriar = () => {
    if (ativo === "Produto") return setMostrarModalCriar(true);
    else return setMostrarModalCriarMov(true);
  };

  // Mostra todos os Produtos
  const mostrarProdutos = async () => {
    try {
      const resposta = await api.get("/produtos");
      setProdutos(resposta.data);
      console.log(resposta.data);
    } catch (error) {
      console.log("Erro ao tentar mostrar produtos!!");
    }
  };

  // Mostra todas as movimentações
  const mostrarMovimentacao = async () => {
    try {
      const resposta = await api.get("/movimentacao");
      setMovimentacoes(resposta.data);
      console.log(resposta.data);
    } catch (error) {
      console.log("Erro ao tentar mostrar movimentações!!");
    }
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

  // Função que cria um produto novo
  const criarProduto = async () => {
    try {
      const resposta = await api.post("/produtos", {
        descricao,
        quantidade,
        unidade,
        quantidade_embalagem: quantidadeEmbalagem,
        disponivel,
      });
      console.log(resposta.data);
      alert("Produto Criado com Sucesso!");
      setMostrarModalCriar(false);
      mostrarProdutos();
    } catch (error) {
      console.log("Erro ao tentar criar produto:", error);
      alert("Erro ao tentar criar produto!");
    }
  };

  const criarMov = async () => {
    try {
      console.log("QuantidadeMov:", quantidadeMov);
      const resposta = await api.post("/movimentacao", {
        id_produto: idProduto,
        quantidade: quantidadeMov,
        data_movimentacao: dataMovimentacao,
        justificativa,
        tipo_movimentacao: tipoMov,
      });
      console.log(resposta.data);
      alert("Movimentação Criado com Sucesso!");
      setMostrarModalCriarMov(false);
      mostrarMovimentacao();
      mostrarProdutos();
    } catch (error) {
      console.log("Erro ao tentar criar produto:", error);
      alert("Erro ao tentar criar produto!");
    }
  };

  // Função que altera todas as informações do produto
  const alterarProduto = async () => {
    try {
      await api.put(`/produtos/${produtoSelecionado.id_produto}`, {
        descricao,
        unidade,
        quantidade_embalagem: quantidadeEmbalagem,
        disponivel,
      });
      alert("Produto alterado com sucesso!");
      setMostrarModalAlterar(false);
      mostrarProdutos();
    } catch (error) {
      console.log("Erro ao alterar produto:", error);
      alert("Erro ao tentar alterar produto!");
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
    mostrarProdutos();
    mostrarMovimentacao();
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

      <div className="scroll-area">
        <div className="box">
          <div className="top">
            <div className="pesquisar">
              <IoMdSearch />
              <input type="text" placeholder={`Pesquisar ${ativo}...`} />
            </div>
            <div className="boxBtn">
              {ativo === "Produto" && (
                <button onClick={() => setMostrarModalAlterar(true)}>
                  <IoMdCreate className="iconeBtn" />
                  ALTERAR
                </button>
              )}
              <button className="adicionar" onClick={abrirModalCriar}>
                <FaPlus className="iconeBtn" />
                {ativo}
              </button>
            </div>
          </div>
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
                <button onClick={() => setMostrarModalCriar(false)}>
                  Cancelar
                </button>
                <button className="adicionar" onClick={criarProduto}>
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarModalCriarMov && (
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
                  <option
                    key={produto.id_produto}
                    value={JSON.stringify(produto)}
                  >
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
                <button className="adicionar" onClick={criarMov}>
                  Criar
                </button>
              </div>
            </div>
          </div>
        )}

        {mostrarModalAlterar && (
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
                  <option
                    key={produto.id_produto}
                    value={JSON.stringify(produto)}
                  >
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
                <button className="adicionar" onClick={alterarProduto}>
                  Alterar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
