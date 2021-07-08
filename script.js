let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

// Cria a cobrinha no eixo;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};

// Inicia uma direção;
let direction = "right";

// Cria a comida de forma randômica no background;
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};

// Cria a tela de fundo;
function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Cria a cobrinha;
function criarCobra(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    };
};

// Cria a comida;
function criarComida(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
};

document.addEventListener('keydown', update); // Pega o evendo do clique no teclado e chama a função update;

// Pega a ação do teclado e redireciona para oque foi informado e impede que o usuário vá na direção contrária e bugue o jogo.
function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
};

function iniciarJogo(){ // Inicia o jogo com todas as funções certas;

    // Inputa os limites de tela;
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Loop para quando a cobrinha encosta em seu próprio corpo;
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("O Jogo acabou para ti meu parceiro! Tente outra vez xD!");
        };
    };

    criarBG();
    criarCobra();
    criarComida();

    // Seta a posição da cobrinha;
    let snakeX = snake[0].x; 
    let snakeY = snake[0].y;

    // Caso seja true adiciona um quadradinho a mais no eixo da cobrinha;
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Interação da cobrinha com a comida;
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); // Tira o último elemento do corpo da cobra;
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead = { // Reposiciona a cabeça da cobrinha;
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead); // Chama a função acima;
};

let jogo = setInterval(iniciarJogo, 100);

