export const converterPraNumero = (data) => {
  // Verifica se o data é um objeto, para que possa converter os valores dentro dele
  if (typeof data === "object" && data !== null) {
    // Armazena os campos de data convertidos em números
    const dataConvertido = {};

    // Como data é um objeto, é preciso percorrer cada um dos campos de Data e retorna sua chave já convertida
    for (let chave in data) {
      if (data[chave] !== undefined) {
        dataConvertido[chave] = Number(data[chave]);
      }
    }
    // Retorna o novo data convertido
    return dataConvertido;
  }

  // Se data não for objeto, só apenas um valor único, retorna apenas este valor único convertido
  return Number(data);
};
