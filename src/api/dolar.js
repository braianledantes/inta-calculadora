let dolarCached = undefined;
let dolarFetching = false;
let dolarWaiters = [];

export const getDolar = async () => {
  
  if (dolarCached !== undefined) return dolarCached;

  if (dolarFetching) {
    // Si ya hay un fetch en curso, espera a que termine
    return new Promise((resolve) => dolarWaiters.push(resolve));
  }

  dolarFetching = true;

  try {
    const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
    
    const data = await response.json();
    dolarCached = data.venta;
    dolarFetching = false;
    dolarWaiters.forEach((resolve) => resolve(dolarCached));
    dolarWaiters = [];
    return dolarCached;

  } catch (error) {

    dolarFetching = false;
    dolarWaiters.forEach((resolve) => resolve(0));
    dolarWaiters = [];
    console.error("Error fetching dollar value:", error);

    return 0;
  }
}