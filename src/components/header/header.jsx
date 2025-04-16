import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/caixa.png";
import "./header.css";
import { mostrarMovimentacao } from "../../utils/requisicaoMovimentacao";
import { mostrarProdutos } from "../../utils/requisicaoProduto";

function Header({
  ativo,
  setAtivo,
  temaDaltonico,
  mudarTema,
  menuAberto,
  setMenuAberto,
  setMovimentacoes,
  setProdutos,
}) {
  return (
    <div className="header">
      <ul className="nav-link">
        <img src={logo} alt="Logo" style={{ width: "40px" }} />
        <li className="link">
          <a
            className={ativo === "Produto" ? "ativo" : ""}
            onClick={() => {
              setAtivo("Produto");
              mostrarProdutos({ setProdutos });
            }}
          >
            Produto
          </a>
        </li>
        <li className="link">
          <a
            className={ativo === "Movimentação" ? "ativo" : ""}
            onClick={() => {
              setAtivo("Movimentação");
              mostrarMovimentacao({ setMovimentacoes });
            }}
          >
            Movimentação
          </a>
        </li>
      </ul>

      <div className="desktop-actions">
        <button
          onClick={mudarTema}
          className={`btn ${temaDaltonico ? "lightMode" : ""}`}
        >
          <span className="indicator"></span>
        </button>
      </div>

      <button className="menu-btn" onClick={() => setMenuAberto(!menuAberto)}>
        <GiHamburgerMenu className="icone" />
      </button>
    </div>
  );
}

export default Header;
