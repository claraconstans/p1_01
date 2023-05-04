class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.correct = 0;
        this.player = "";
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}

    create (){
        let arraycards = ['cb', 'cb', 'co', 'co', 'sb', 'sb', 'so', 'so', 'tb', 'tb', 'to', 'to'];
		this.cameras.main.setBackgroundColor(0x98b396);
        
		var numCartes = 2;
		var dificultat = null;
		var temps = null;
		var puntsRestar = null;
		
		arraycards = arraycards.slice(0, numCartes*2);
		arraycards.sort(function(){return Math.random() - 0.5});

        var numArray=0;
		for (let c = 0; c < numCartes; c++){
			for (let f = 0; f < 2; f++){
				this.add.image(this.cameras.main.centerX+125*c-96*numCartes/2, this.cameras.main.centerY-128*numCartes/2+150*f, arraycards[numArray]);
				numArray++;
			}
		}
		this.cards = this.physics.add.staticGroup();
		for (let c = 0; c < numCartes; c++){
			for (let f = 0; f < 2; f++){
				this.cards.create(this.cameras.main.centerX+125*c-96*numCartes/2, this.cameras.main.centerY-128*numCartes/2+150*f, 'back');
			}
		}
    }

	update (){	
    }

}