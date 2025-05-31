import Joi from "joi";

export const tractorSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().required(),
    nombre: Joi.string().min(3).max(50).required(),
    precioDolar: Joi.number().positive().required(),
    gastoMantenimiento: Joi.number().positive().required(),
    horasVidaUtil: Joi.number().integer().positive().required(),
    porcentajeValorResidual: Joi.number().min(0).max(100).required(),
    potencia: Joi.number().positive().required()
  })
);

export const implementoSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().integer().required(),
    nombre: Joi.string().min(3).max(50).required(),
    precioDolar: Joi.number().positive().required(),
    gastoMantenimiento: Joi.number().positive().required(),
    horasVidaUtil: Joi.number().integer().positive().required(),
    porcentajeValorResidual: Joi.number().min(0).max(100).required(),
    consumoCombustible: Joi.number().positive().required()
  })
);

export const fertilizanteSchema = Joi.array().items(
  Joi.object({
    numero: Joi.number().integer().required(),
    nombre: Joi.string().min(3).max(50).required(),
    precioEnvaseDolar: Joi.number().positive().required(),
    volumenEnvase: Joi.number().positive().required(),
    unidadVolumenEnvase: Joi.string().valid("kg", "lt").required(),
    dosisAplicacion: Joi.number().positive().required(),
    unidadDosisAplicacion: Joi.string().valid("kg", "lt").required()
  })
);

export const sanitizanteSchema = Joi.array().items(
  Joi.object({
    numero: Joi.number().integer().required(),
    nombre: Joi.string().min(3).max(50).required(),
    tipo: Joi.string().required(),
    precioEnvaseDolar: Joi.number().positive().required(),
    volumenEnvase: Joi.number().positive().required(),
    unidadVolumenEnvase: Joi.string().valid("kg", "lt").required(),
    dosisAplicacion: Joi.number().positive().required(),
    unidadDosisAplicacion: Joi.string().valid("kg", "lt").required()
  })
);

export const estadoFenologicoSchema = Joi.array().items(
  Joi.object({
    numero: Joi.number().integer().required(),
    nombre: Joi.string().min(3).max(50).required(),
    descripcion: Joi.string().min(10).max(200).required()
  })
);