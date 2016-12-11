// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.random() * 60 + 20;
    this.x = -100;
    var temp = Math.floor(Math.random() * 3 + 1);
    if (temp == 3)
        this.y = 225
    else if (temp == 2)
        this.y = 145;
    else
        this.y = 60;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505)
        this.x += this.speed * dt;
    else {
        this.x = -100;
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
    this.name = name;
    this.avatar = avatar;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.render = function(ctx) {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function(dt) {

};


Player.prototype.handleInput = function(direction) {
    if (direction == "left" && (this.x - 101) >= 0) {
        this.x -= 101;
    } else if (direction == "right" && (this.x + 101) <= 404) {
        this.x += 101;
    } else if (direction == "up" && (this.y - 83) >= -23) {
        this.y -= 83;
    } else if (direction == "down" && (this.y + 83) <= 410) {
        this.y += 83;
    }
    console.log(this.x);
    console.log(this.y);
};



// Now instantiate your objects.
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// Place all enemy objects in an array called allEnemies
var player = new Player("player1");
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
    allEnemies: allEnemies
};
