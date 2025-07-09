const inputFecha = document.getElementById("fecha");

// Al cargar la página, recuperar la fecha si estaba guardada
window.addEventListener("DOMContentLoaded", () => {
  const fechaGuardada = localStorage.getItem("fechaAniversario");
  if (fechaGuardada) {
    inputFecha.value = fechaGuardada;
    iniciarContador(fechaGuardada);
  }
});

// Al cambiar la fecha, guardar y mostrar contador
inputFecha.addEventListener("change", () => {
  const fechaElegida = inputFecha.value;
  if (!fechaElegida) return;

  localStorage.setItem("fechaAniversario", fechaElegida);
  iniciarContador(fechaElegida);
});

// Inicia el contador actualizándose cada segundo
function iniciarContador(fecha) {
  mostrarContador(fecha); // mostrar de inmediato
  clearInterval(window.intervalID); // evitar múltiples intervalos
  window.intervalID = setInterval(() => mostrarContador(fecha), 1000);
}

// Mostrar datos en pantalla
function mostrarContador(fechaInicio) {
  const tiempo = calcularTiempoTotal(fechaInicio);
  if (!tiempo) return;

  document.getElementById("contador").innerHTML = `
    <p>Años: ${tiempo.años}</p>
    <p>Meses (total): ${tiempo.meses}</p>
    <p>Días (total): ${tiempo.dias}</p>
    <p>Horas (hoy): ${tiempo.horas}</p>
    <p>Minutos: ${tiempo.minutos}</p>
    <p>Segundos: ${tiempo.segundos}</p>
  `;
}

// Cálculo del tiempo total
function calcularTiempoTotal(fechaInicio) {
  const ahora = new Date();
  const inicio = new Date(fechaInicio);
  if (isNaN(inicio)) return;

  const milisegundosTotales = ahora - inicio;
  const segundosTotales = Math.floor(milisegundosTotales / 1000);
  const minutosTotales = Math.floor(segundosTotales / 60);
  const horasTotales = Math.floor(minutosTotales / 60);
  const diasTotales = Math.floor(horasTotales / 24);

  const añosTotales = Math.floor(diasTotales / 365.25);
  const mesesTotales = Math.floor(diasTotales / 30.4375); // promedio de mes

  const horasHoy = horasTotales % 24;
  const minutosHoy = minutosTotales % 60;
  const segundosHoy = segundosTotales % 60;

  return {
    años: añosTotales,
    meses: mesesTotales,
    dias: diasTotales,
    horas: horasHoy,
    minutos: minutosHoy,
    segundos: segundosHoy
  };
}
