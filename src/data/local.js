const TRACTORES_KEY = 'tractores';
const IMPLEMENTOS_KEY = 'implementos';
const FERTILIZANTES_KEY = 'fertilizantes';
const SANITIZANTES_KEY = 'sanitizantes';

export function getTractores() {
  const tractores = localStorage.getItem(TRACTORES_KEY);
  return tractores ? JSON.parse(tractores) : [];
}

export function saveTractores(tractores) {
  localStorage.setItem(TRACTORES_KEY, JSON.stringify(tractores));
}

export function getImplementos() {
  const implementos = localStorage.getItem(IMPLEMENTOS_KEY);
  return implementos ? JSON.parse(implementos) : [];
}

export function saveImplementos(implementos) {
  localStorage.setItem(IMPLEMENTOS_KEY, JSON.stringify(implementos));
}

export function getFertilizantes() {
  const fertilizantes = localStorage.getItem(FERTILIZANTES_KEY);
  return fertilizantes ? JSON.parse(fertilizantes) : [];
}

export function saveFertilizantes(fertilizantes) {
  localStorage.setItem(FERTILIZANTES_KEY, JSON.stringify(fertilizantes));
}

export function getSanitizantes() {
  const sanitizantes = localStorage.getItem(SANITIZANTES_KEY);
  return sanitizantes ? JSON.parse(sanitizantes) : [];
}

export function saveSanitizantes(sanitizantes) {
  localStorage.setItem(SANITIZANTES_KEY, JSON.stringify(sanitizantes));
}
