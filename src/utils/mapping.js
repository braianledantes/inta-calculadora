// src/utils/mapping.js

import {
  tractorSchema,
  implementoSchema,
  fertilizanteSchema,
  sanitizanteSchema,
  estadoFenologicoSchema
} from "../validation/schemas.js";

const schemaMap = {
  tractores: tractorSchema,
  implementos: implementoSchema,
  fertilizantes: fertilizanteSchema,
  sanitizantes: sanitizanteSchema,
  estadosFenologicos: estadoFenologicoSchema,
};

export function mapExcelData(data) {
  const namesInData = data.map(table => table.name);
  const missingTables = Object.keys(schemaMap).filter(name => !namesInData.includes(name));
  if (missingTables.length > 0) {
    throw new Error(`Faltan las siguientes tablas: ${missingTables.join(", ")}`);
  }

  const result = {};
  for (const table of data) {
    const { name, data: tableData } = table;
    const schema = schemaMap[name];
    if (!schema) continue;
    const { error, value } = schema.validate(tableData);
    if (error) {
      throw new Error(`Error de validación en la tabla "${name}": ${error.message}`);
    }
    result[name] = value;
  }
  return result;
}