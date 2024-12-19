// Elementos de la página
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin-button");
const purchaseDate = document.getElementById("purchase-date");
const discountDate = document.getElementById("discount-date");
const printButton = document.getElementById("print-button");
const resultMessage = document.getElementById("result-message");

// Cargar los audios
const wheelSound = new Audio('wheel.mp3');
const tadaSound = new Audio('tada.mp3');

// Función para actualizar la fecha y hora en tiempo real
function updateDateTime() {
    const now = new Date();
    const purchaseDateTime = now.toLocaleString('es-CO', { timeZone: 'America/Bogota' });
    const discountExpiration = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000);
    const discountExpirationTime = discountExpiration.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

    // Mostrar las fechas en la página
    purchaseDate.innerHTML = `Día de la compra: ${purchaseDateTime}`;
    discountDate.innerHTML = `Descuento válido hasta: ${discountExpirationTime}`;
}

// Llamar a la función inmediatamente para actualizar la hora cuando se cargue la página
updateDateTime();

// Actualizar la hora cada segundo (1000 ms)
setInterval(updateDateTime, 1000);

// Posibilidades de la ruleta
const segments = [
    { label: "50%", color: "#FFE066" },
    { label: "Casi", color: "#F28B82" },
    { label: "10%", color: "#B39DDB" },
    { label: "20%", color: "#F6A9C9" },
    { label: "Casi", color: "#F28B82" },
    { label: "10%", color: "#B39DDB" },
    { label: "Casi", color: "#F28B82" },
    { label: "30%", color: "#81D4A3" },
    { label: "20%", color: "#F6A9C9" },
    { label: "Casi", color: "#F28B82" },
    { label: "40%", color: "#6DCFF6" },
    { label: "Casi", color: "#F28B82" },
    { label: "10%", color: "#B39DDB" },
    { label: "Casi", color: "#F28B82" },
    { label: "20%", color: "#F6A9C9" },
    { label: "10%", color: "#B39DDB" },
    { label: "30%", color: "#81D4A3" },
    { label: "Casi", color: "#F28B82" },
    { label: "10%", color: "#B39DDB" },
    { label: "Casi", color: "#F28B82" }
];

// Variable para el ángulo acumulado
let currentAngle = 0;

// Función para girar la ruleta con desaceleración
function spinWheel() {
    // Reproducir el sonido de la rueda mientras gira
    wheelSound.loop = true; // Hacer que suene continuamente
    wheelSound.play();

    // Generar un índice aleatorio para seleccionar un segmento
    const randomIndex = Math.floor(Math.random() * segments.length);
    const segmentAngle = 360 / segments.length; // Cada segmento tiene un ángulo igual
    const baseAngle = randomIndex * segmentAngle; // Ángulo base del segmento
    const offsetAngle = Math.floor(Math.random() * segmentAngle); // Generar un ángulo aleatorio dentro de los límites del segmento
    const totalRotation = 360 * 5 + baseAngle + offsetAngle; // Asegura que el giro sea aleatorio y dé varias vueltas

    // Calcular la cantidad total de grados que la rueda girará
    const totalDuration = 4000; // 4 segundos para el giro
    let startTime = null;

    // Función para animar el giro
    function animateSpin(currentTime) {
        if (!startTime) startTime = currentTime; // Iniciar el contador
        const elapsedTime = currentTime - startTime; // Tiempo transcurrido

        // Calcular la fracción del tiempo transcurrido
        const progress = Math.min(elapsedTime / totalDuration, 1); // Se asegura que no exceda 1 (100%)

        // Calculamos el ángulo de rotación en base al progreso
        const easing = 1 - Math.pow(1 - progress, 3); // Usamos una función de easing para desacelerar
        const currentAngle = totalRotation * easing;

        // Aplicar la rotación a la ruleta
        wheel.style.transform = `rotate(${currentAngle}deg)`;

        // Si el tiempo no ha terminado, seguimos animando
        if (elapsedTime < totalDuration) {
            requestAnimationFrame(animateSpin); // Llamada recursiva para continuar la animación
        } else {
            // Detener el sonido de la rueda después de 15 segundos
            setTimeout(() => {
                wheelSound.pause();
                wheelSound.currentTime = 0;
            }, 4000); // 4 segundos

            // Reproducir el sonido de "tada" después de que la ruleta se haya detenido
            setTimeout(() => {
                tadaSound.play();
            }, 4000); // Retraso de 200 ms para asegurar que se reproduzca después de la animación
           
            // Mostrar el resultado después de que se haya detenido la ruleta
            const result = segments[randomIndex];
            resultMessage.innerHTML = `Resultado: ${result.label}`; // Mostrar el resultado en la página
            wheel.style.borderColor = result.color; // Cambiar el color del borde según el resultado
        }
    }

    // Iniciar la animación usando requestAnimationFrame
    requestAnimationFrame(animateSpin);
}

// Función para imprimir la página
function printPage() {
    window.print();
}

// Agregar evento al botón de girar
spinButton.addEventListener("click", spinWheel);

// Agregar evento al botón de imprimir
//printButton.addEventListener("click", printPage);

// Agregar el evento para el botón de reiniciar
const resetButton = document.getElementById("reset-button");

// Función para reiniciar la página
function resetPage() {
    location.reload(); // Recarga la página actual
}

// Agregar evento al botón de reiniciar
resetButton.addEventListener("click", resetPage);
