class Example extends Phaser.Scene
{
	preload ()
	{
		//this.load.image('sky', 'assets/skies/space3.png');
		//this.load.image('logo', 'assets/sprites/phaser3-logo.png');
		//this.load.image('red', 'assets/particles/red.png');
	}

	create ()
	{
		let score = "0000";
		let highScore = "0000";
		let lives = 3;
		this.add.text(0, 0, 'SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(120, 0, 'HI-SCORE', {
			fontFamily: 'font',
			fontSize: 24
		});
		let scoreDisplay = this.add.text(6, 30, score, {
			fontFamily: 'font',
			fontSize: 24
		});
		let highScoreDisplay = this.add.text(148, 30, highScore, {
			fontFamily: 'font',
			fontSize: 24
		});
		let livesDisplay = this.add.text(15, 485, lives, {
			fontFamily: 'font',
			fontSize: 24
		});
		this.add.text(280, 485, "CREDIT 00", {
			fontFamily: 'font',
			fontSize: 24
		});
		let line = this.add.line(200,0,0,483,448,483,0x209424);
		line.setLineWidth(2);
		//a.setText(10)
		//var text = this.add.bitmapText(x, y, 'font', 'Hello, Phaser!', 64);
		//this.add.image(400, 300, 'sky');
		//const logo = this.physics.add.image(400, 100, 'logo');

		//logo.setVelocity(100, 200);
		//logo.setCollideWorldBounds(true);
	}
}

const config = {
    type: Phaser.AUTO,
    width: 448,
    height: 512,
    scene: Example,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    }
};

const game = new Phaser.Game(config);