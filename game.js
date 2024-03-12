let score = 0;
let highScore = 0;
let lives = 3;

class Game extends Phaser.Scene
{
	constructor( ...args ) {
		super({ key: 'Game', ...args })
	}
	preload ()
	{
		this.load.image('player', 'assets/images/player.png');
		this.load.image('octopus', 'assets/images/octopus.png');
		this.load.image('crab', 'assets/images/crab.png');
		this.load.image('squid', 'assets/images/squid.png');
		this.load.image('top-left', 'assets/images/bunker/top-left.png');
		this.load.image('top-right', 'assets/images/bunker/top-right.png');
		this.load.image('center-left', 'assets/images/bunker/center-left.png');
		this.load.image('center-right', 'assets/images/bunker/center-right.png');
		this.load.image('plain', 'assets/images/bunker/plain.png');
		this.load.image('bullet', 'assets/images/bullet.png');
		this.load.audio('shoot', 'assets/sound/shoot.wav' );
		this.load.audio('explosion', 'assets/sound/explosion.wav' );
		this.load.audio('invaderkilled', 'assets/sound/invaderkilled.wav' );
	}

	create ()
	{
		lives = 3;
		score = 0;
		this.shooting = false;
		this.add.text(0, 0, 'SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(120, 0, 'HI-SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.scoreDisplay = this.add.text(6, 30, "0000", {
			fontFamily: 'font',
			fontSize: 24
		});
		this.highScoreDisplay = this.add.text(148, 30, highScore, {
			fontFamily: 'font',
			fontSize: 24
		});
		if (highScore <= 9) {
			this.highScoreDisplay.setText("000" + highScore);
		} else if (highScore <= 99) {
			this.highScoreDisplay.setText("00" + highScore);
		} else if (highScore <= 999) {
			this.highScoreDisplay.setText("0" + highScore);
		} else {
			this.highScoreDisplay.setText(highScore);
		}
		this.livesDisplay = this.add.text(15, 485, lives, {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(280, 485, "CREDIT 00", {
			fontFamily: 'font',
			fontSize: 24
		});
		this.playerBullet = this.physics.add.image(5000, 500, 'bullet').setPushable(false);
		this.enemyBullet = this.physics.add.image(5000, 500, 'bullet').setPushable(false);
		this.add.line(200,0,0,483,448,483,0xffffff).setLineWidth(2);
		this.shootLine = 280;
		this.player = this.physics.add.image(208, 435, 'player').setPushable(false);
		this.player.setCollideWorldBounds(true);
		this.thirdLife = this.add.image(65, 495, 'player');
		this.secondLife = this.add.image(95, 495, 'player');
		this.keys = this.input.keyboard.addKeys('SPACE,A,D');
		this.shoot = this.sound.add('shoot', {volume: 0.2});
		this.explosion = this.sound.add('explosion', {volume: 0.2});
		this.invaderkilled = this.sound.add('invaderkilled', {volume: 0.2});
		this.enemies = [];
		this.row = 1;
		this.spaceX = 35;
		this.spaceY = 27;
		let j = 0
		for (let i = 0; i < 55; i++) {
				if (i >= 0 && i <= 10) {
					this.enemies.push(this.physics.add.image(45+(j*this.spaceX), 130+(this.row*this.spaceY), 'squid'));
				}
				if (i >= 11 && i <= 21) {
					if (i == 11) {
						j = 0;
					}
					this.row = 2
					this.enemies.push(this.physics.add.image(45+(j*this.spaceX), 130+(this.row*this.spaceY), 'crab'));
				}
				if (i >= 22 && i <= 32) {
					if (i == 22) {
						j = 0;
					}
					this.row = 3
					this.enemies.push(this.physics.add.image(45+(j*this.spaceX), 130+(this.row*this.spaceY), 'crab'));
				}
				if (i >= 33 && i <= 43) {
					if (i == 33) {
						j = 0;
					}
					this.row = 4
					this.enemies.push(this.physics.add.image(45+(j*this.spaceX), 130+(this.row*this.spaceY), 'octopus'));
				}
				if (i >= 44) {
					if (i == 44) {
						j = 0;
					}
					this.row = 5
					this.enemies.push(this.physics.add.image(45+(j*this.spaceX), 130+(this.row*this.spaceY), 'octopus'));
				}
				this.physics.add.collider(this.playerBullet, this.enemies[i], () => {
					this.playerBullet.setVelocityY(0);
					this.playerBullet.y = 250;
					this.playerBullet.x = 5000;
					this.enemies[i].destroy();
					this.invaderkilled.play();
					this.enemies[i] = 0;
					score += 20;
				}, null, this);
				j++;
		}
		this.bunker = [[],[],[],[]];
		this.bunkerHealth = [8,8,8,8];
		for (let k = 0; k < 4; k++) {
			this.bunker[k].push(this.physics.add.image(62+(k*98), 374, 'top-left').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(98+(k*98), 374, 'top-right').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(62+(k*98), 386, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(86+(k*98), 386, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(86+(k*98), 374, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(62+(k*98), 398, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(74+(k*98), 374, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(74+(k*98), 386, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(98+(k*98), 386, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(98+(k*98), 398, 'plain').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(74+(k*98), 398, 'center-left').setScale(0.5).setImmovable());
			this.bunker[k].push(this.physics.add.image(86+(k*98), 398, 'center-right').setScale(0.5).setImmovable());
			this.physics.add.collider(this.playerBullet, this.bunker[k], () => {
				this.playerBullet.setVelocityY(0);
				this.playerBullet.y = 250;
				this.playerBullet.x = 5000;
				this.bunkerHealth[k] -= 1;
				if (this.bunkerHealth[k] <= 0) {
					for (let i = 0; i < this.bunker[k].length; i++) {
						this.bunker[k][i].destroy();
						
					}
					this.explosion.play();
					if (score >= 20) {
						score -= 20;
					}
				}
			}, null, this);
			this.physics.add.collider(this.enemyBullet, this.bunker[k], () => {
				this.enemyBullet.setVelocityY(0);
				this.enemyBullet.y = 250;
				this.enemyBullet.x = 5000;
				this.bunkerHealth[k] -= 1;
				if (this.bunkerHealth[k] <= 0) {
					for (let i = 0; i < this.bunker[k].length; i++) {
						this.bunker[k][i].destroy();
					}
					this.explosion.play();
					if (score >= 20) {
						score -= 20;
					}
				}
			}, null, this);
		}
		this.physics.add.collider(this.enemyBullet, this.player, () => {
			this.enemyBullet.setVelocityY(0);
			this.enemyBullet.y = 250;
			this.enemyBullet.x = 5000;
			lives -= 1;
			this.livesDisplay.setText(lives);
			console.log("Lives left: " + lives);
			switch (lives) {
				case 2:
					this.secondLife.destroy();
					break;
				case 1:
					this.thirdLife.destroy();
					break;
				case 0:
					this.explosion.play();
					this.scene.start("EndScreen");
			}
		}, null, this);
		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i] !== 0) {
				this.enemies[i].setVelocityX(6);
			}
		}
		this.time.delayedCall(6000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(-10);
				}
			}
		});
		this.time.delayedCall(12000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(10);
				}
			}
		});
		this.time.delayedCall(18000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(-10);
				}
			}
		});
		this.time.delayedCall(24000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(10);
				}
			}
		});
		this.time.delayedCall(30000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(-10);
				}
			}
		});
		this.time.delayedCall(36000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(10);
				}
			}
		});
		this.time.delayedCall(42000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(-10);
				}
			}
		});
		this.time.delayedCall(48000, () => {
			this.shootLine += 10;
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].y += 10;
					this.enemies[i].setVelocityX(10);
				}
			}
		});
		this.time.delayedCall(54000, () => {
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].setVelocityX(-10);
				}
			}
		});
		this.time.delayedCall(60000, () => {
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.enemies[i].setVelocityX(10);
				}
			}
		});
		this.time.delayedCall(66000, () => {
			if (score >= 10) {
				score -= 10;
			}
			for (let i = 0; i < this.enemies.length; i++) {
				if (this.enemies[i] !== 0) {
					this.playerBullet.setVelocityY(0);
					this.playerBullet.y = 250;
					this.playerBullet.x = 5000;
					this.enemies[i].destroy();
					this.enemies[i] = 0;
					lives = 0;
					this.scene.start("EndScreen");
				}
			}
		});
	}
	update ()
	{
		if (this.enemies.filter(element => element !== 0).length == 0) {
			this.scene.start("EndScreen");
		}
		if (this.keys.D.isUp) {
			if (this.keys.A.isDown) {
				this.player.setVelocityX(-150);
			} else {
				this.player.setVelocityX(0);
			}
		}
		else if (this.keys.A.isUp) {
			if (this.keys.D.isDown) {
				this.player.setVelocityX(150);
			} else {
				this.player.setVelocityX(0);
			}
		}
		if (this.playerBullet.y < 65) {
			this.playerBullet.setVelocityY(0);
			this.playerBullet.y = 250;
			this.playerBullet.x = 5000;
		}
		if (this.enemyBullet.y > 480) {
			this.enemyBullet.setVelocityY(0);
			this.enemyBullet.y = 250;
			this.enemyBullet.x = 5000;
		}
		if (this.enemyBullet.x == 5000) {
			this.enemyBullet.x = Math.floor(Math.random() * 449);;
			this.enemyBullet.y = this.shootLine;
			this.enemyBullet.setVelocityY(150);
		}
		if (this.keys.SPACE.isDown && !this.shooting && this.playerBullet.x == 5000) {
			this.shooting = true;
			this.shoot.play();
			this.playerBullet.x = this.player.x-1;
			this.playerBullet.y = this.player.y-14;
			this.playerBullet.setVelocityY(-400);
		}
		if (this.keys.SPACE.isUp && !this.keys.SPACE.isDown) {
			this.shooting = false;
		}
		if (score <= 9) {
			this.scoreDisplay.setText("000" + score);
		} else if (score <= 99) {
			this.scoreDisplay.setText("00" + score);
		} else if (score <= 999) {
			this.scoreDisplay.setText("0" + score);
		} else {
			this.scoreDisplay.setText(score);
		}
	}
}

class EndScreen extends Phaser.Scene
{
	constructor( ...args ) {
		super({ key: 'EndScreen', ...args })
	}
	preload ()
	{
	}

	create ()
	{
		highScore = Math.max(score, highScore);
		this.gameOverKeys = this.input.keyboard.addKeys('SPACE,A,D');
		this.insertCoin = false;
		this.time.delayedCall(2500, () => {
			this.insertCoin = true;
		});
		if (lives <= 0) {
			this.add.text(160, 100, 'GAME OVER', {
				fontFamily: 'font',
				fontSize: 24,
				color: "red"
			});
		} else {
			this.add.text(167, 140, 'YOU WIN', {
				fontFamily: 'font',
				fontSize: 28,
				color: "#25FF25"
			});
		}
		this.add.text(147, 225, 'INSERT COIN', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(0, 0, 'SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(120, 0, 'HI-SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.scoreDisplay = this.add.text(6, 30, "0000", {
			fontFamily: 'font',
			fontSize: 24
		});
		if (score <= 9) {
			this.scoreDisplay.setText("000" + score);
		} else if (score <= 99) {
			this.scoreDisplay.setText("00" + score);
		} else if (score <= 999) {
			this.scoreDisplay.setText("0" + score);
		} else {
			this.scoreDisplay.setText(score);
		}
		this.highScoreDisplay = this.add.text(148, 30, "0000", {
			fontFamily: 'font',
			fontSize: 24
		});
		if (highScore <= 9) {
			this.highScoreDisplay.setText("000" + highScore);
		} else if (highScore <= 99) {
			this.highScoreDisplay.setText("00" + highScore);
		} else if (highScore <= 999) {
			this.highScoreDisplay.setText("0" + highScore);
		} else {
			this.highScoreDisplay.setText(highScore);
		}
	}
	update ()
	{
		if (this.gameOverKeys.SPACE.isDown && this.insertCoin) {
			this.scene.start("Game");
		}
	}
}

const config = {
    type: Phaser.AUTO,
    width: 448,
    height: 512,
	scene: [Game, EndScreen],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};

const game = new Phaser.Game(config);