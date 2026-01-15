var tiles = 20; // Gridgröße
var tileSize = 20; // Pixelgröße
// Array aller Objekte
var gameObjects = [
    { type: "snake", position: { x: 10, y: 10 } },
    { type: "food", position: { x: 5, y: 5 } }
];
// Canvas Setup
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
// Direction der Snake
var direction = { x: 1, y: 0 };
var score = 0;
// Funktion: Random Position
function getRandomPosition(max) {
    return {
        x: Math.floor(Math.random() * max),
        y: Math.floor(Math.random() * max)
    };
}
// --------------------- Platzhalterfunktionen ---------------------
function draw() {
    ctx.clearRect(2, 588, canvas.width, canvas.height);
    for (var _i = 0, gameObjects_1 = gameObjects; _i < gameObjects_1.length; _i++) {
        var obj = gameObjects_1[_i];
        if (obj.type === "snake")
            ctx.fillStyle = "green";
        else if (obj.type === "food")
            ctx.fillStyle = "red";
        ctx.fillRect(obj.position.x * tileSize, obj.position.y * tileSize, tileSize, tileSize);
    }
}
function moveSnake() {
    // TODO: Snake Position ändern
}
function checkCollisions() {
    // TODO: Kollision mit Wand oder sich selbst prüfen
}
function checkFood() {
    // TODO: Prüfen ob Snake Food isst
}
function updateScore() {
    // TODO: Score erhöhen / UI aktualisieren
}
function gameLoop() {
    moveSnake();
    checkCollisions();
    checkFood();
    draw();
    // Loop weiterführen
    setTimeout(gameLoop, 200); // Geschwindigkeit anpassen
}
// StartGame mit Countdown
function startGame() {
    var countdown = document.getElementById("countdown");
    if (!countdown) {
        console.error("Countdown-Element nicht gefunden!");
        return;
    }
    var timeLeft = 3;
    countdown.textContent = timeLeft.toString();
    var timer = setInterval(function () {
        timeLeft--;
        console.log(timeLeft);
        if (timeLeft > 0) {
            countdown.textContent = timeLeft.toString();
        }
        else {
            countdown.textContent = "GO!";
            clearInterval(timer);
            setTimeout(function () {
                countdown.style.display = "none"; // Timer verstecken
                gameLoop(); // Spiel starten
            }, 500);
        }
    }, 1000);
}
// Tastatursteuerung
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            direction = { x: 1, y: 0 };
            break;
    }
});
startGame();
