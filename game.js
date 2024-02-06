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
		//this.add.image(400, 300, 'sky');
		//const logo = this.physics.add.image(400, 100, 'logo');

		//logo.setVelocity(100, 200);
		//logo.setBounce(1, 1);
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