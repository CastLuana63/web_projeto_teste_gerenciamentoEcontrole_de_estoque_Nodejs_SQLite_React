import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import "./home.css";
import logo from "../../assets/caixa.png";

export default function Home() {
  const [ativo, setAtivo] = useState("Produto");
  const [temaDaltonico, setTemaDaltonico] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const mudarTema = () => {
    setTemaDaltonico(!temaDaltonico);
  };

  useEffect(() => {
    const menuFechar = () => {
      if (window.innerWidth > 600 && menuAberto) {
        setMenuAberto(false);
      }
    };

    window.addEventListener("resize", menuFechar);

    return () => {
      window.removeEventListener("resize", menuFechar);
    };
  }, [menuAberto]);

  return (
    <div className={`container ${temaDaltonico ? "tema-daltonico" : ""}`}>
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
          <IoIosNotifications className="notificacao" />
          <button
            onClick={mudarTema}
            className={`btn ${temaDaltonico ? "lightMode" : ""}`}
          >
            <span className="indicator"></span>
          </button>
        </div>

        <button className="menu-btn" onClick={() => setMenuAberto(!menuAberto)}>
          <GiHamburgerMenu className="notificacao" />
        </button>
      </div>

      {menuAberto && (
        <div className="sidebar">
          <IoIosNotifications className="notificacao" />
          <button
            onClick={mudarTema}
            className={`btn ${temaDaltonico ? "lightMode" : ""}`}
          >
            <span className="indicator"></span>
          </button>
        </div>
      )}

      <div style={{ marginTop: "5rem", color: "var(--cor-texto)" }}>
        <h1>Home</h1>
      </div>
    </div>
  );
}
