//numero aleatorio del 1 al 3 con cuenta atrás de 5seg
//comparación del numero aleatorio con numero introducido por usuario
//si coinciden: "has salvado al mundo", si no coinciden: "la bomba ha estallado"
//en ambos casos tendrá que salir el numero elegido y el número aleatorio
//no se sabrá el número hasta que pasen los 5seg
//botón de reiniciar para volver a iniciar la funciñon inicial o reiniciando la página al pulsarlo

//pistas: setTimeout() para asincronía de 5seg, setInterval() para generar el contador de 5seg
//usar promesas para una vez pasado ese tiempo devuelva el resultado y pueda trabajar con él

const countdown = document.getElementById("countdown");
const result = document.getElementById("result");
const userInput = document.getElementById("userInput");
const restartBtn = document.getElementById("restart");

let gameStarted = false; // evitar que empiece varias veces

// genera número aleatorio del 1 al 3
function randomNumber() {
    return Math.ceil(Math.random() * 3);
}

// función que hace la cuenta atrás y devuelve número aleatorio al terminar
function startCountDown() {
    return new Promise((resolve) => {
        let time = 5;
        countdown.textContent = "Cuenta atrás: " + time + " segundos";

        const interval = setInterval(() => {
            time--;
            countdown.textContent = "Cuenta atrás: " + time + " segundos";

            if (time < 0) {
                clearInterval(interval);
                countdown.textContent = "Tiempo terminado";

                resolve(randomNumber());
            }
        }, 1000);
    });
}

// función que inicia el juego SOLO cuando haya número válido
function startGame() {
    if (gameStarted) return; // evitar que se duplique
    const value = parseInt(userInput.value);

    if (value >= 1 && value <= 3) {
        gameStarted = true;

        startCountDown().then(randomNum => {
            const userNum = parseInt(userInput.value);

            if (userNum === randomNum) {
                result.innerHTML =`
                <p class="green">Enhorabuena, has salvado el mundo 👑</p>
                <p>Tu número ${userNum} es el mismo que el número ${randomNum}</p>`;
            } else {
                result.innerHTML =`
                <p class="red">La bomba ha estallado 💥</p>
                <p>Tu número ${userNum} es diferente que el número ${randomNum}</p>`;
            }
        });
    } else {
        result.textContent = "Introduce un número del 1 al 3.";
    }
}

// iniciar al pulsar Enter
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        startGame();
    }
});

// iniciar al hacer click fuera del input
userInput.addEventListener("blur", startGame);

// botón de reinicio
restartBtn.addEventListener("click", () => {
    location.reload();
});
