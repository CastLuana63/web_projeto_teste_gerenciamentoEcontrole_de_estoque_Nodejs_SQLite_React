// Classe responsável por validar os dados dos produtos
class ValidarProdutos {
  // Validação dos dados ao criar um novo produto
  validarCreate(data) {
    if (!data) {
      throw new Error("Todos os dados do produto são obrigatórios.");
    }

    // Caso passe na validação, exibe mensagem de sucesso
    console.log(`Produto validado com sucesso! Dados: ${data}`);
  }

  // Validação ao fazer atualização parcial de um produto
  validarUpdateParcial(data) {
    if (!data?.id) {
      throw new Error("O ID do produto é obrigatório.");
    }

    // Desestrutura o id e verifica se ao menos um campo tem valor para atualização
    const { id, ...camposRestantes } = data;
    const temAlgumCampo = Object.values(camposRestantes).some(
      (dados) => dados !== undefined
    );

    if (!temAlgumCampo) {
      throw new Error(
        "É necessário informar ao menos um campo para atualizar o produto."
      );
    }

    // Caso passe na validação, exibe mensagem de sucesso
    console.log(`Produto validado com sucesso! Dados: ${data}`);
  }
}

export default new ValidarProdutos();
