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

const tiles = 20; // Gridgröße
const tileSize = 20; // Pixelgröße


// Array aller Objekte
let gameObjects: GameObject[] = [
    { type: "snake", position: { x: 10, y: 10 } },
    { type: "food", position: { x: 5, y: 5 } }
];

// Snake
let snakeHead = gameObjects[0];
let snakeTail = gameObjects[0];
let snakeSegments: SnakeSegment[] = gameObjects.filter(
    obj => obj.type === "snake"
) as SnakeSegment[];

// Canvas Setup
const canvas = document.getElementById("board") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Direction der Snake
let direction: Vec2 = { x: 1, y: 0 };
let score = 0;

// Funktion: Random Position
function getRandomPosition(max: number): Vec2 {
    return {
        x: Math.floor(Math.random() * max),
        y: Math.floor(Math.random() * max)
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const obj of gameObjects) {
        if (obj.type === "snake") ctx.fillStyle = "green";
        else if (obj.type === "food") ctx.fillStyle = "red";

        ctx.fillRect(
            obj.position.x * tileSize,
            obj.position.y * tileSize,
            tileSize,
            tileSize
        );
    }
}

function moveSnake() {
    if (!snakeHead || !gameObjects) return;

    const newHead: SnakeSegment = {
        type: "snake",
        position: {
            x: snakeHead.position.x + direction.x,
            y: snakeHead.position.y + direction.y
        }
    };

    gameObjects.unshift(newHead);
    snakeTail
    snakeHead = newHead;
}


function checkWallCollision(head: Vec2): boolean {
    return head.x < 0 || head.y < 0 || head.x >= tiles || head.y >= tiles;
}

function checkSelfCollision(head: Vec2, snakeBody: SnakeSegment[]): boolean {
    // Überspringe das erste Segment (Kopf)
    return snakeBody.slice(1).some(segment =>
        segment.position.x === head.x && segment.position.y === head.y
    );
}

function checkCollisions() {
    if (!snakeHead) return;
    
    if (checkWallCollision(snakeHead.position)) {
        alert("Game Over! Snake hat die Wand getroffen.");
        location.reload();
    }

   if (checkSelfCollision(snakeHead.position, snakeSegments)) {
        alert("Game Over! Snake hat sich selbst getroffen.");
        location.reload();
    }
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
    let countdown = 3;
    const timer = setInterval(() => {
        console.log(countdown); // Kannst du auch ins HTML schreiben
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            gameLoop();
        }
    }, 1000);
}

// Tastatursteuerung
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":    direction = { x: 0, y: -1 }; break;
        case "ArrowDown":  direction = { x: 0, y: 1 }; break;
        case "ArrowLeft":  direction = { x: -1, y: 0 }; break;
        case "ArrowRight": direction = { x: 1, y: 0 }; break;
    }
});

// --------------------- Game Start ---------------------
startGame();