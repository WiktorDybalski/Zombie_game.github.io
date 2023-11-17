var zombie = document.getElementById('zombie');
var zombieCounter = 0;
var lifes = 3;
var score = 30;

document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = e.pageX - 50 + 'px';
    cursor.style.top = e.pageY - 50 + 'px';
});

document.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('zombie') && score > 0) {
        modify_score(1);
        clickedElement.remove()
    } else {
        if (score > 0) {
            modify_score(0);
        }

    }
});

function modify_score(value) {
    const curr_score = document.querySelector('.score').innerHTML;
    const next_score = value ? (parseInt(curr_score) + 10).toString() : (parseInt(curr_score) - 3).toString();
    score = value ? score + 10 : score - 3;

    const result = '0'.repeat(6 - next_score.length) + next_score;
    document.querySelector('.score').innerHTML = result;

    if (score <= 0) {
        clear();
        stop();
    }
}

function scaleZombie(newZombie) {
    const randomScale = Math.random() * (1.2 - 0.2) + 0.2;
    newZombie.style.transform = `scale(${randomScale}, ${randomScale})`;
}

function lose_life() {
    const life = document.querySelectorAll('.heart');
    life[life.length - 1].innerHTML = '<img src="images/empty_heart.png" width="100px">';
    life[life.length - 1].classList.remove('heart');
    life[life.length - 1].classList.add('not-heart');
}

function clear() {

    var lifes = document.querySelectorAll('.not-heart');
    var zombies = document.querySelectorAll('.zombie');
    for (let i = 0; i < zombies.length; i++) {
        zombies[i].remove();
    }
    for (let i = 0; i < lifes.length; i++) {
        lifes[i].innerHTML = '<img src="images/full_heart.png" width="100px">';
        lifes[i].classList.remove('not_heart');
        lifes[i].classList.add('heart');
    }
}

function endGame() {
    var gameBoard = document.querySelector('.game-board');
    var currentSummary = document.querySelector('.summary');

    if (currentSummary) {
        currentSummary.remove();
    }

    // Utwórz nowy element div
    const summary = document.createElement('div');
    summary.className = 'summary';
    summary.textContent = "Game Summary";
    summary.style.display = "block";
    summary.innerHTML = `
        <div class="summary-header">Game Summary</div>
        <div class="summary-content">
            <p>Score: ${score}</p>
        </div>
    `;
    gameBoard.appendChild(summary);

    document.querySelector('.score').innerHTML = "000033";
    score = 33
}

function resetGame() {
    var summary = document.querySelector('.summary');

    if (summary) {
        summary.remove();
    }

    document.querySelector('.score').innerHTML = "000033";

    restart();

    score = 33;
}

function createSummary() {
    var gameBoard = document.querySelector('.game-board');
    const summary = document.createElement('div');
    summary.className = 'summary';
    summary.textContent = "Game Summary";
    summary.style.display = "block";
    summary.innerHTML = `
        <div class="summary-header">Game Summary</div>
        <div class="summary-content">
            <p>Score: ${score}</p>
            <p>Do you want to restart game?</p>
            <button class="buttons" onclick="resetGame()">Yes</button>
            <button class="buttons" onclick="endGame()">No</button>
        </div>
    `;
    gameBoard.appendChild(summary);
    console.log("Działa");
}

function stop() {
    clearInterval(spawnInterval);
    clearInterval(moveInterval);
    clear();
    createSummary();

}

function spawn() {
    const new_zombie = document.createElement('div');
    var gameBoard = document.querySelector('.game-board');
    new_zombie.className = 'zombie';
    zombieCounter += 1;
    new_zombie.id = zombieCounter;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    gameBoard.appendChild(new_zombie);
    scaleZombie(new_zombie);
    document.getElementById(zombieCounter).style.top = viewportHeight - 312 + 'px';
    document.getElementById(zombieCounter).style.right = -100 + 'px';
    if (lifes <= 0) {
        stop();
    }
}

function move() {
    var elements = document.querySelectorAll('.zombie');
    for (let i = 0; i < elements.length; i++) {
        var element = elements[i]
        var style = window.getComputedStyle(element)
        var position = style.right;

        if (element.id % 3 === 0) {
            element.style.right = parseInt(position) + 1.3 + 'px';
        } else if (element.id % 3 === 2) {
            element.style.right = parseInt(position) + 1.7 + 'px';
        } else {
            element.style.right = parseInt(position) + 2.5 + 'px'
        }
        if (parseInt(position) > window.innerWidth) {
            elements[i].remove()

            lifes -= 1;
            console.log("-1");
            lose_life();
            console.log("Po -1");
            if (lifes <= 0) {
                stop();
                lifes = 3;
                return;
            }
            return;
        }
    }
}

function restart() {
    console.log("Startujemy")
    spawnInterval = setInterval(spawn, 1000)
    moveInterval = setInterval(move, 1)
}

function start() {
    var startButton = document.getElementById('start-button');
    startButton.style.display = "none";
    console.log("Startujemy")
    spawnInterval = setInterval(spawn, 1000)
    moveInterval = setInterval(move, 1)
    document.querySelector('.score').innerHTML = "000033";
    score = 33
}