export function gerarTags(produtos = [], movimentacoes = []) {
  let tags = [];

  produtos.forEach((produto) => {
    if (produto.descricao)
      tags.push(produto.descricao.toString().toUpperCase());

    if (produto.disponivel) {
      // tags.push(produto.disponivel ? "DISPONÍVEL" : "INDISPONÍVEL");
      tags.push(produto.disponivel.toString().toUpperCase());
    }

    if (produto.quantidade)
      tags.push(produto.quantidade.toString().toUpperCase());

    if (produto.unidade) tags.push(produto.unidade.toString().toUpperCase());

    if (produto.quantidade_embalagem)
      tags.push(produto.quantidade_embalagem.toString().toUpperCase());
  });

  movimentacoes.forEach((mov) => {
    if (mov.tipo_movimentacao)
      tags.push(mov.tipo_movimentacao.toString().toUpperCase());

    if (mov.data_movimentacao) {
      const partes = mov.data_movimentacao.split("-");
      if (partes[0]) tags.push(partes[0].toUpperCase());

      if (partes[1]) tags.push(partes[1].toUpperCase());

      if (partes[2]) tags.push(partes[2].toUpperCase());
    }

    if (mov.justificativa)
      tags.push(mov.justificativa.toString().toUpperCase());

    if (mov.id_produto) tags.push(mov.id_produto.toString().toUpperCase());

    if (mov.quantidade) tags.push(mov.quantidade.toString().toUpperCase());
  });

  return tags;
}
