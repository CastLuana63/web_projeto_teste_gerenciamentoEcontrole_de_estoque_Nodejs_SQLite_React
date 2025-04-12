import React from "react";
import { IoReload } from "react-icons/io5";
import { IoMdSearch, IoMdCreate } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import "./cabecalho.css";

function Cabecalho({ setMostrarModalAlterar, abrirModalCriar, ativo }) {
  return (
    <div className="top">
      <div className="pesquisar">
        <IoMdSearch />
        <input type="text" placeholder={`Pesquisar ${ativo}...`} />
        <IoReload
          className="iconeBtn"
          size={30}
          style={{ fontWeight: "bold", cursor: "pointer" }}
          onClick={() => location.reload()}
        />
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
