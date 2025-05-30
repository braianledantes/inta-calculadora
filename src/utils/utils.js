export const getDolar = async () => {
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
    const data = await response.json();
    return data.venta;
  } catch (error) {
    console.error("Error fetching dollar value:", error);
    return 0;
  }
}

export const formatNumber = (number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
}