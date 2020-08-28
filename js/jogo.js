let canvas = document.getElementById("snake");
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1 ) * box,
    y: Math.floor(Math.random() * 15 + 1 ) * box
}

function criarBG(){
    context.fillStyle = "#0d9919";
    context.fillRect(0,0,16 * box, 16 * box);
}

function criarCobra(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "#222";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = "orange";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update (event){
    if ( event.keyCode == 37 && direction != "right"|| event.keyCode == 65 && direction != "right" ) direction = "left";
    if ( event.keyCode == 38 && direction != "down" || event.keyCode == 87 && direction != "down" ) direction = "up";
    if ( event.keyCode == 39 && direction != "left" || event.keyCode == 68 && direction != "left" ) direction = "right";
    if ( event.keyCode == 40 && direction != "up"   || event.keyCode == 83 && direction != "up"   ) direction = "down";
    
}
/** pegar codigo teclado */
// function update(e){
//     console.log(e.code)
//     console.log("codigo" + e.keyCode )
// }

function iniciarJogo(){
    
    if (snake[0].x > 15 * box && direction == "right" ) snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left" ) snake[0].x = 15 * box;
    if (snake[0].y > 15 * box && direction == "down" ) snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up" ) snake[0].y = 15 * box;

    for(i = 1; i < snake.length; i++){
        if( snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over :(")
        }
    }
    console.log(snake.length)
    criarBG();
    criarCobra();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if ( direction == "right" ) snakeX += box;
    if ( direction == "left"  ) snakeX -= box;
    if ( direction == "up"    ) snakeY -= box;
    if ( direction == "down"  ) snakeY += box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();    
    } else {
        food.x = Math.floor(Math.random() * 15 + 1 ) * box;
        food.y = Math.floor(Math.random() * 15 + 1 ) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100);

