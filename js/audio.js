// seleq audio por el ID
const audio = document.getElementById("musicXv");
const btnPlayPause = document.getElementById("btnPlayPause");
const barraProgreso = document.getElementById("barraProgreso");
const tiempoActual = document.getElementById("tiempoActual");
const tiempoTotal = document.getElementById("tiempoTotal");

// funion btn altenar repro
btnPlayPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    btnPlayPause.textContent = "| |";
    // btnPlayPause.style.backgroundColor = "#f43f5e"; // Cambia a color rosa/rojo al pausar
    btnPlayPause.style.boxShadow = "0 4px 12px rgba(244, 63, 94, 0.3)";
  } else {
    audio.pause();
    btnPlayPause.textContent = "►";
    // btnPlayPause.style.backgroundColor = "#38bdf8"; // Vuelve al azul
    btnPlayPause.style.boxShadow = "0 4px 12px rgba(56, 189, 248, 0.3)";
  }
});

// actualizacion barra y tiempo cuando avanza la cancion
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    // Calcular el porcentaje completado para la barra
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barraProgreso.value = porcentaje;

    // act texto del tiempo actual transcurrido
    tiempoActual.textContent = formatearTiempo(audio.currentTime);
  }
});

// mosrtr duracion total cancion crque
audio.addEventListener("loadedmetadata", () => {
  tiempoTotal.textContent = formatearTiempo(audio.duration);
});

// interactuar con la barra
barraProgreso.addEventListener("input", () => {
  // clulo sequndo exacto de la brra
  const nuevoTiempo = (barraProgreso.value / 100) * audio.duration;
  audio.currentTime = nuevoTiempo;
});

// funcion para pasar seundos a un formato 1:16
function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segRestantes = Math.floor(segundos % 60);
  // add un cero a la izquierda si los segundos son menores a 10
  return `${minutos}:${segRestantes < 10 ? "0" : ""}${segRestantes}`;
}

// cuando la cancion termina valor de textcontent
audio.addEventListener("ended", () => {
  btnPlayPause.textContent = "►";
  // btnPlayPause.style.backgroundColor = "#38bdf8";
  barraProgreso.value = 0;
  tiempoActual.textContent = "0:00";
});

