document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const itemsContainer = document.getElementById('items');
    const scoreDisplay = document.getElementById('score');
    const infoDisplay = document.getElementById('info');
    let score = 0;
    let negativeHits = 0;

    // Mover al jugador
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft') {
            movePlayer(-20);
        } else if (event.key === 'ArrowRight') {
            movePlayer(20);
        }
    });

    // Generar elementos
    setInterval(function () {
        createItem();
    }, 2000);

    // Verificar colisiones
    setInterval(function () {
        checkCollisions();
    }, 100);

    function movePlayer(amount) {
        let left = player.offsetLeft + amount;
        left = Math.max(0, Math.min(gameContainer.offsetWidth - player.offsetWidth, left));
        player.style.left = left + 'px';
    }

    function createItem() {
        const item = document.createElement('div');
        item.classList.add('item');
        const randomPosition = Math.random() * (gameContainer.offsetWidth - 30);
        const itemType = Math.random() < 0.5 ? 'positive' : 'negative';
        item.innerHTML = `<img src="${itemType}.png" alt="${itemType}">`;
        item.style.left = randomPosition + 'px';
        itemsContainer.appendChild(item);
    }

    function checkCollisions() {
        const items = document.querySelectorAll('.item');
        items.forEach(function (item) {
            if (isColliding(player, item)) {
                if (item.firstChild.alt === 'negative') {
                    score -= 10;
                    negativeHits++;
                    infoDisplay.textContent = `Tocar elementos negativos ${3 - negativeHits} veces para perder`;
                    if (negativeHits >= 3) {
                        gameOver();
                    }
                } else {
                    score += 5;
                }
                item.remove();
                scoreDisplay.textContent = `Puntos: ${score}`;
            }
            if (item.offsetTop >= gameContainer.offsetHeight) {
                item.remove();
            }
        });
    }

    function isColliding(element1, element2) {
        const rect1 = element1.getBoundingClientRect();
        const rect2 = element2.getBoundingClientRect();
        return !(rect1.right < rect2.left || 
                 rect1.left > rect2.right || 
                 rect1.bottom < rect2.top || 
                 rect1.top > rect2.bottom);
    }

    function gameOver() {
        alert(`¡Juego terminado! Puntos totales: ${score}`);
        score = 0;
        negativeHits = 0;
        scoreDisplay.textContent = `Puntos: ${score}`;
        infoDisplay.textContent = `Tocar elementos negativos ${3 - negativeHits} veces para perder`;
    }
});
