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
    btnPlayPause.textContent = "⏯";
    // btnPlayPause.style.backgroundColor = "#f43f5e"; // Cambia a color rosa/rojo al pausar
    btnPlayPause.style.boxShadow = "0 4px 12px rgba(244, 63, 94, 0.3)";
  } else {
    audio.pause();
    btnPlayPause.textContent = "⏯";
    // btnPlayPause.style.backgroundColor = "#38bdf8"; // Vuelve al azul
    btnPlayPause.style.boxShadow = "0 4px 12px rgba(56, 189, 248, 0.3)";
  }
});

// 2. ACTUALIZAR LA BARRA Y EL TIEMPO CONFORME AVANZA LA CANCIÓN
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    // Calcular el porcentaje completado para la barra
    const porcentaje = (audio.currentTime / audio.duration) * 100;
    barraProgreso.value = porcentaje;

    // Actualizar el texto del tiempo actual transcurrido
    tiempoActual.textContent = formatearTiempo(audio.currentTime);
  }
});

// 3. MOSTRAR LA DURACIÓN TOTAL CUANDO LA CANCIÓN CARGUE
audio.addEventListener("loadedmetadata", () => {
  tiempoTotal.textContent = formatearTiempo(audio.duration);
});

// 4. PERMITIR AL USUARIO MOVER LA BARRA PARA ADELANTAR/RETRASAR
barraProgreso.addEventListener("input", () => {
  // Calcular el segundo exacto basado en el porcentaje de la barra
  const nuevoTiempo = (barraProgreso.value / 100) * audio.duration;
  audio.currentTime = nuevoTiempo;
});

// 5. FUNCIÓN AUXILIAR PARA PASAR SEGUNDOS A FORMATO "MINUTOS:SEGUNDOS" (e.g. 3:45)
function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const segRestantes = Math.floor(segundos % 60);
  // Agrega un cero a la izquierda si los segundos son menores a 10
  return `${minutos}:${segRestantes < 10 ? "0" : ""}${segRestantes}`;
}

// Extra: Si la canción termina, el botón vuelve a decir "Reproducir"
audio.addEventListener("ended", () => {
  btnPlayPause.textContent = "⏯";
  // btnPlayPause.style.backgroundColor = "#38bdf8";
  barraProgreso.value = 0;
  tiempoActual.textContent = "0:00";
});

