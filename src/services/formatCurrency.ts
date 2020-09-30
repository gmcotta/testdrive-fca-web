const formatCurrency = (rawPrice: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(rawPrice);
};

export default formatCurrency;
