import React, { useState, useEffect } from "react";
import { IoReload } from "react-icons/io5";
import { IoMdSearch, IoMdCreate } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import "./cabecalho.css";
import { gerarTags } from "../../utils/mecanismoPesquisa";
import { mostrarMovimentacao } from "../../utils/requisicaoMovimentacao";
import { mostrarProdutos } from "../../utils/requisicaoProduto";

function Cabecalho({
  setMostrarModalAlterar,
  abrirModalCriar,
  ativo,
  setProdutos,
  setMovimentacoes,
  produtos,
  movimentacoes,
}) {
  const [termo, setTermo] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const novasTags = gerarTags(produtos, movimentacoes);
    setTags([...new Set(novasTags.map((tag) => tag.toLowerCase()))]);
  }, [produtos, movimentacoes]);

  useEffect(() => {
    buscar(termo);

    if (termo.trim() === "") {
      setSugestoes([]);
    } else {
      const filtradas = tags.filter((tag) =>
        tag.includes(termo.trim().toLowerCase())
      );
      setSugestoes(filtradas.slice(0, 5));
    }
  }, [termo]);

  const buscar = (valor) => {
    const termoBusca = valor?.trim().toLowerCase();

    if (!termoBusca) {
      if (ativo === "Produto") setProdutos(produtos);
      else setMovimentacoes(movimentacoes);
      return;
    }

    const resultado =
      ativo === "Produto"
        ? produtos.filter((p) => {
            return (
              p.descricao +
              p.quantidade +
              p.unidade +
              p.quantidade_embalagem +
              p.disponivel
            )
              .toString()
              .toLowerCase()
              .includes(termoBusca);
          })
        : movimentacoes.filter((m) =>
            (
              m.tipo_movimentacao +
              m.justificativa +
              m.id_produto +
              m.quantidade +
              m.data_movimentacao
            )
              .toString()
              .toLowerCase()
              .includes(termoBusca)
          );

    ativo === "Produto" ? setProdutos(resultado) : setMovimentacoes(resultado);
  };

  const aoApertarEnter = (e) => {
    if (e.key === "Enter") {
      buscar(termo);
      setSugestoes([]);
    }
  };

  const selecionarSugestao = (sugestao) => {
    setTermo(sugestao);
    buscar(sugestao);
    setSugestoes([]);
  };

  return (
    <div className="top">
      <div className="area-pesquisa">
        <div className="pesquisar">
          <IoMdSearch />
          <input
            type="text"
            placeholder={`Pesquisar ${ativo}...`}
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            onKeyDown={aoApertarEnter}
          />
          <IoReload
            className="iconeBtn"
            size={30}
            style={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={() => location.reload()}
          />
        </div>
        {sugestoes.length > 0 && (
          <ul className="sugestoes">
            {sugestoes.map((s, index) => (
              <li key={index} onClick={() => selecionarSugestao(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
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
  );
}

export default Cabecalho;
