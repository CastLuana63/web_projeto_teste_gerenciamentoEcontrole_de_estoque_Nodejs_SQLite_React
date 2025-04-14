import api from "../services/api";

// Função que mostra todos os produtos
export async function mostrarProdutos({ setProdutos }) {
  try {
    const resposta = await api.get("/produtos");
    setProdutos(resposta.data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
  }
}

// Função que cria um produto novo
export async function criarProduto({
  setMostrarModalCriar,
  descricao,
  quantidade,
  unidade,
  quantidadeEmbalagem,
  disponivel,
  setProdutos,
}) {
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
    mostrarProdutos({ setProdutos });
  } catch (error) {
    console.log("Erro ao tentar criar produto:", error);
    alert("Erro ao tentar criar produto!");
  }
}

// Função que altera todas as informações do produto
export async function alterarProduto({
  setMostrarModalAlterar,
  setProdutos,
  produtoSelecionado,
  descricao,
  unidade,
  quantidadeEmbalagem,
  disponivel,
}) {
  try {
    await api.put(`/produtos/${produtoSelecionado.id_produto}`, {
      descricao,
      unidade,
      quantidade_embalagem: quantidadeEmbalagem,
      disponivel,
    });
    alert("Produto alterado com sucesso!");
    setMostrarModalAlterar(false);
    mostrarProdutos({ setProdutos });
  } catch (error) {
    console.log("Erro ao alterar produto:", error);
    alert("Erro ao tentar alterar produto!");
  }
}

// Função que altera parcialmente as informações do produto
export async function alterarProdutoParcial({
  setAbrirModalAlterar,
  setProdutos,
  produtoId,
  descricao,
  unidade,
  quantidadeEmbalagem,
  disponivel,
}) {
  try {
    await api.patch(`/produtos/${produtoId}`, {
      descricao,
      unidade,
      quantidade_embalagem: quantidadeEmbalagem,
      disponivel,
    });
    alert("Produto alterado com sucesso!");
    setAbrirModalAlterar(false);
    mostrarProdutos({ setProdutos });
  } catch (error) {
    console.log("Erro ao alterar c produto:", error);
    alert("Erro ao tentar alterar produto!");
  }
}
