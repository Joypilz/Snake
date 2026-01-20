type Vec2 = { x: number; y: number };

// Objekttypen
interface SnakeSegment {
    type: "snake";
    position: Vec2;
}

interface Food {
    type: "food";
    position: Vec2;
}

type GameObject = SnakeSegment | Food;

const tiles = 20;
const tileSize = 20; // Pixelgröße

// Array aller Objekte
let snake: GameObject[] = [
    { type: "snake", position: { x: 10, y: 10 } },
    { type: "snake", position: { x: 9, y: 10 } },
    { type: "snake", position: { x: 8, y: 10 } },
    { type: "snake", position: { x: 7, y: 10 } },
];

let food: GameObject = {type: "food", position: { x: 5, y: 5 }};

// Canvas Setup
const canvas = document.getElementById("board") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;



// Direction der Snake
let direction: Vec2 = { x: 1, y: 0 };

let score = 0;
let scoreUI = document.getElementById("score") as HTMLElement;
let lastScoreHauptmenue = document.getElementById("lastScore") as HTMLElement;

// Funktion: Random Position
function getRandomPosition(max: number): Vec2 {
    return {
        x: Math.floor(Math.random() * max),
        y: Math.floor(Math.random() * max)
    };
}

// --------------------- Platzhalterfunktionen ---------------------

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const obj of snake) {
        if (obj.type === "snake") ctx.fillStyle = "green";

        ctx.fillRect(
            obj.position.x * tileSize,
            obj.position.y * tileSize,
            tileSize,
            tileSize
        );
    }
    ctx.fillStyle = "red";
    ctx.fillRect(
        food.position.x * tileSize,
        food.position.y * tileSize,
        tileSize,
        tileSize
    );
}

function moveSnake() {
    let head = snake[0];

    if(!head)return;

    const newHead: SnakeSegment = {
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
    const head = snake[0];
    if (!head) return;

    // Wand-Kollision
    const tilesX = canvas.width / tileSize;
    const tilesY = canvas.height / tileSize;
    if (head.position.x < 0 || head.position.x >= tilesX ||
        head.position.y < 0 || head.position.y >= tilesY) {
        gameOver();
        return;
    }

    // Selbst-Kollision
    for (let i = 1; i < snake.length; i++) {
        const segment = snake[i];
        if (
            head.position.x === segment?.position.x &&
            head.position.y === segment?.position.y
        ) {
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
    let head = snake[0];
    let last = snake[snake.length - 1];

    if(head == null || last == null) return;

    if(head.position.x == food.position.x && head.position.y == food.position.y){
        const newSeg: SnakeSegment = {
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
    scoreUI.textContent = `Score: ${score}`;
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
    const countdown = document.getElementById("countdown");
    if (!countdown) { 
        console.error("Countdown-Element nicht gefunden!");
        return;
    }

    let timeLeft = 3;
    countdown.textContent = timeLeft.toString();

    const timer = setInterval(() => {
        timeLeft--;
        console.log(timeLeft);
        if (timeLeft > 0) {
            countdown.textContent = timeLeft.toString();
        } else {
            countdown.textContent = "GO!";
            clearInterval(timer);

            setTimeout(() => {
                countdown.style.display = "none"; 
                gameLoop(); 
            }, 500);
        }
    }, 1000);
}

// Tastatursteuerung
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

startGame();
