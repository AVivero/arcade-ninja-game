// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.random() * 60 + 20;
    this.x = -100;
    var temp = Math.floor(Math.random() * 3 + 1);
    if (temp == 3)
        this.y = 225;
    else if (temp == 2)
        this.y = 145;
    else
        this.y = 60;
    this.xCenter = this.x + 51;
    this.yCenter = this.y + 115;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var Gem = function() {
    this.x = Math.random() * 200;
    this.y = Math.random() * 300;
    this.xCenter = this.x + 51;
    this.yCenter = this.y + 115;
    this.sprite = 'images/gem-green.png';
};

Gem.prototype.moveGem = function() {
    this.x = Math.random() * 200;
    this.y = Math.random() * 300;
    this.xCenter = this.x + 51;
    this.yCenter = this.y + 115;
};

Gem.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.update = function(ctx) {};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += this.speed * dt;
        this.xCenter = this.x + 51;
    } else {
        this.x = -100;
        this.xCenter = this.x + 51;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.handleInput = function() {};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(name, avatar) {
    this.x = 202;
    this.y = 410;
    this.xCenter = this.x + 51;
    this.yCenter = this.y + 118;
    this.name = name;
    this.avatar = avatar;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 410;
    this.xCenter = this.x + 51;
    this.yCenter = this.y + 118;
    this.score = 0;
}

Player.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt) {

};

Player.prototype.playerCollisionEnemy = function(enemy) {
    if (Math.sqrt((this.xCenter - enemy.xCenter) * (this.xCenter - enemy.xCenter) + (this.yCenter - enemy.yCenter) * (this.yCenter - enemy.yCenter)) <= 55) {
        gameOver();
    }
};

Player.prototype.playerCollisionGem = function(gem) {
    if (Math.sqrt((this.xCenter - gem.xCenter) * (this.xCenter - gem.xCenter) + (this.yCenter - gem.yCenter) * (this.yCenter - gem.yCenter)) <= 85) {
        player.score += 100;
        gem.moveGem();
    }
};

Player.prototype.handleInput = function(direction) {
    if (direction == "up" && (this.y - 83) <= -5) {
        gameOver();
    } else if (direction == "left" && (this.x - 101) >= 0) {
        this.x -= 101;
        this.xCenter = this.x + 51;
    } else if (direction == "right" && (this.x + 101) <= 404) {
        this.x += 101;
        this.xCenter = this.x + 51;
    } else if (direction == "up" && (this.y - 83) >= -23) {
        this.y -= 83;
        this.yCenter = this.y + 118;
    } else if (direction == "down" && (this.y + 83) <= 410) {
        this.y += 83;
        this.yCenter = this.y + 118;
    }
};

function gameOver() {
    player.reset();
    alert("Game Over");
}

// Now instantiate your objects.
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// Place all enemy objects in an array called allEnemies
var player = new Player("player1");
var allGems = [];
allGems.push(new Gem());
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

module.exports = {
    player: player,
    allEnemies: allEnemies,
    allGems: allGems
};
