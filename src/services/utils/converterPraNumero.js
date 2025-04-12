export const converterPraNumero = (data) => {
  const numero = Number(data);
  return isNaN(numero) ? 0 : numero;
};
