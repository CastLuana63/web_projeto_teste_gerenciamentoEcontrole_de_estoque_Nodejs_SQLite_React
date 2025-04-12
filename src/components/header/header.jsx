import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../assets/caixa.png";
import "./header.css";

function Header({
  ativo,
  setAtivo,
  temaDaltonico,
  mudarTema,
  menuAberto,
  setMenuAberto,
}) {
  return (
    <div className="header">
      <ul className="nav-link">
        <img src={logo} alt="Logo" style={{ width: "40px" }} />
        <li className="link">
          <a
            className={ativo === "Produto" ? "ativo" : ""}
            onClick={() => setAtivo("Produto")}
          >
            Produto
          </a>
        </li>
        <li className="link">
          <a
            className={ativo === "Movimentação" ? "ativo" : ""}
            onClick={() => setAtivo("Movimentação")}
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
