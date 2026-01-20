var tiles = 20;
var tileSize = 20; // Pixelgröße
// Array aller Objekte
var snake = [
    { type: "snake", position: { x: 10, y: 10 } },
    { type: "snake", position: { x: 9, y: 10 } },
    { type: "snake", position: { x: 8, y: 10 } },
    { type: "snake", position: { x: 7, y: 10 } },
];
var food = { type: "food", position: { x: 5, y: 5 } };
// Canvas Setup
var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");
// Direction der Snake
var direction = { x: 1, y: 0 };
var score = 0;
var scoreUI = document.getElementById("score");
var lastScoreHauptmenue = document.getElementById("lastScore");
// Funktion: Random Position
function getRandomPosition(max) {
    return {
        x: Math.floor(Math.random() * max),
        y: Math.floor(Math.random() * max)
    };
}
// --------------------- Platzhalterfunktionen ---------------------
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var _i = 0, snake_1 = snake; _i < snake_1.length; _i++) {
        var obj = snake_1[_i];
        if (obj.type === "snake")
            ctx.fillStyle = "green";
        ctx.fillRect(obj.position.x * tileSize, obj.position.y * tileSize, tileSize, tileSize);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.position.x * tileSize, food.position.y * tileSize, tileSize, tileSize);
}
function moveSnake() {
    var head = snake[0];
    if (!head)
        return;
    var newHead = {
        type: "snake",
        position: {
            x: head.position.x + direction.x,
            y: head.position.y + direction.y
        }
    };
    // Neuen Kopf vorne einfügen
    snake.unshift(newHead);
    // Letztes Segment entfernen
    snake.pop();
}
function checkCollisions() {
    var head = snake[0];
    if (!head)
        return;
    // Wand-Kollision
    var tilesX = canvas.width / tileSize;
    var tilesY = canvas.height / tileSize;
    if (head.position.x < 0 || head.position.x >= tilesX ||
        head.position.y < 0 || head.position.y >= tilesY) {
        gameOver();
        return;
    }
    // Selbst-Kollision
    for (var i = 1; i < snake.length; i++) {
        var segment = snake[i];
        if (head.position.x === (segment === null || segment === void 0 ? void 0 : segment.position.x) &&
            head.position.y === (segment === null || segment === void 0 ? void 0 : segment.position.y)) {
            gameOver();
            return;
        }
    }
}
function gameOver() {
    localStorage.setItem("lastScore", score.toString());
    // Snake zurücksetzen
    snake = [
        { type: "snake", position: { x: 10, y: 10 } },
        { type: "snake", position: { x: 9, y: 10 } },
        { type: "snake", position: { x: 8, y: 10 } },
        { type: "snake", position: { x: 7, y: 10 } },
    ];
    // Direction zurücksetzen
    direction = { x: 1, y: 0 };
    // Score zurücksetzen
    score = 0;
    window.location.href = "index.html";
}
function checkFood() {
    var head = snake[0];
    var last = snake[snake.length - 1];
    if (head == null || last == null)
        return;
    if (head.position.x == food.position.x && head.position.y == food.position.y) {
        var newSeg = {
            type: "snake",
            position: {
                x: last.position.x + direction.x,
                y: last.position.y + direction.y
            }
        };
        snake.push(newSeg);
        food.position = getRandomPosition(tiles);
        updateScore();
    }
}
function updateScore() {
    score++;
    scoreUI.textContent = "Score: ".concat(score);
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
                countdown.style.display = "none";
                gameLoop();
            }, 500);
        }
    }, 1000);
}
// Tastatursteuerung
window.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0)
                direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0)
                direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0)
                direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0)
                direction = { x: 1, y: 0 };
            break;
    }
});
startGame();
