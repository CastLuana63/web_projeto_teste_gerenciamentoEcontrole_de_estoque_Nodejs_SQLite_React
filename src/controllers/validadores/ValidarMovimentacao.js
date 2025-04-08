// Classe responsável por validar os dados da movimentação de estoque
class ValidarMovimentacao {
  // Valida os dados ao criar uma movimentação
  validarCreate(data) {
    if (!data) {
      throw new Error("Todos os dados da movimentação são obrigatórios.");
    }

    const { quantidade } = data;

    if (quantidade <= 0) {
      throw new Error("A quantidade da movimentação deve ser maior que zero.");
    }

    // Caso todos os dados estejam corretos, apenas loga no console
    console.log("Dados da movimentação validados com sucesso. Sem erros.");
  }
}

export default new ValidarMovimentacao();
