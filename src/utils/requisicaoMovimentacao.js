import api from "../services/api";
import { mostrarProdutos } from "./requisicaoProduto";

// Mostra todas as movimentações
export async function mostrarMovimentacao({ setMovimentacoes }) {
  try {
    const resposta = await api.get("/movimentacao");
    setMovimentacoes(resposta.data);
  } catch (error) {
    console.log("Erro ao tentar mostrar movimentações!!");
  }
}

export async function criarMov({
  setMovimentacoes,
  setProdutos,
  idProduto,
  quantidadeMov,
  dataMovimentacao,
  justificativa,
  tipoMov,
  setMostrarModalCriarMov,
}) {
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
    mostrarMovimentacao({ setMovimentacoes });
    mostrarProdutos({ setProdutos });
  } catch (error) {
    console.log("Erro ao tentar criar produto:", error);
    alert("Erro ao tentar criar produto!");
  }
}

// Mostra as movimentações de saída ou entrada de um produto
export async function buscarMovimentacoesProduto({ idProduto, tipo }) {
  try {
    const resposta = await api.get(
      `/produtos/${idProduto}/movimentacoes?tipo=${tipo}`
    );
    return resposta.data;
  } catch (error) {
    console.log("Erro ao buscar movimentações do produto:", error);
    return [];
  }
}
