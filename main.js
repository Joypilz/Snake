var tiles = 20; // Gridgröße
var tileSize = 20; // Pixelgröße
// Array aller Objekte
var gameObjects = [
    { type: "snake", position: { x: 10, y: 10 } },
    { type: "food", position: { x: 5, y: 5 } }
];
var snakeHead = gameObjects[0];
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
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
function checkWallCollision(head) {
    return head.x < 0 || head.y < 0 || head.x >= tiles || head.y >= tiles;
}
function checkSelfCollision(head, snakeBody) {
    // Überspringe das erste Segment (Kopf)
    return snakeBody.slice(1).some(function (segment) {
        return segment.position.x === head.x && segment.position.y === head.y;
    });
}
function checkCollisions() {
    if (!snakeHead)
        return;
    if (checkWallCollision(snakeHead.position)) {
        alert("Game Over! Snake hat die Wand getroffen.");
        location.reload();
    }
    /* if (checkSelfCollision(snakeHead.position, snake)) {
         alert("Game Over! Snake hat sich selbst getroffen.");
         location.reload();
     }*/
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
    var countdown = 3;
    var timer = setInterval(function () {
        console.log(countdown); // Kannst du auch ins HTML schreiben
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            gameLoop();
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
// --------------------- Game Start ---------------------
startGame();
