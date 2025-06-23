// Estilo para encabezados informativos (como dólar y gasoil)
export const headerInfoStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'CFE2F3' }
  },
  font: { bold: true },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

// Estilo para encabezados de tabla
export const tableHeaderStyle = {
  font: { bold: true },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

// Estilo general para todas las celdas
export const generalCellStyle = {
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

// Aplicar estilo a una celda
export function applyStyle(cell, style) {
  cell.font = {
    name: 'Montserrat',
    size: 9,
    ...(style.font || {})
  };
  if (style.fill) cell.fill = style.fill;
  if (style.alignment) cell.alignment = style.alignment;
  if (style.border) cell.border = style.border;
}

export const tractorRowStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'F3F3F3' }
  },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

export const amarilloSuave = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFF2CC' } // #fff2cc
  },
  font: { bold: true },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

export const verdeSuave = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D9EAD3' } // #d9ead3
  },
  font: { bold: true },
  alignment: { vertical: 'middle', horizontal: 'center', wrapText: true }
};

export const borderStyle = {
  top:    { style: 'thin', color: { argb: '666666' } },
  left:   { style: 'thin', color: { argb: '666666' } },
  bottom: { style: 'thin', color: { argb: '666666' } },
  right:  { style: 'thin', color: { argb: '666666' } }
};

export const celdaTotalStyle = {
  fill: {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FCE5CD' }
  },
  font: { bold: true }
};