export function mapExcelData(data) {
  return {
    tractores: data[0].data,
    implementos: data[1].data,
    fertilizantes: data[2].data,
    sanitizantes: data[3].data,
    estadosFenologicos: data[4].data,
  }
}