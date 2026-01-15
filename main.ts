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

// --------------------- Platzhalterfunktionen ---------------------

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