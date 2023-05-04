class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
        this.cards = null;
        this.firstClick = null;
        this.score = 100;
        this.level = 1;
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
        
        var json = sessionStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var numCartes = options_data.cards;
		var dificultat = options_data.dificulty;
		var temps = null;
		var puntsRestar = null;

        if (dificultat == "easy"){
			temps = 2000;
			puntsRestar = 5;
		}
		else if (dificultat == "normal"){
			temps = 1000;
			puntsRestar = 10;
		}
		else{
			temps = 500;
			puntsRestar = 20;
		}
		
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
        let i = 0;
        this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= puntsRestar;
						this.firstClick.enableBody(false, 0, 0, true, true);
						card.enableBody(false, 0, 0, true, true);
						
						var error = [];
						let aux = 0;

						for(let i = 0; i < numCartes*2; i++){
							for (let c = 0; c < numCartes; c++){
								for (let f = 0; f < 2; f++){
									let imatge = this.add.image(this.cameras.main.centerX+125*c-96*numCartes/2, this.cameras.main.centerY-128*numCartes/2+150*f, arraycards[aux]);
									error.push(imatge);
									aux++;
								}
							}
						}

						setTimeout(() =>{
							for (let i = 0; i < numCartes*2; i++){
								error[i].destroy();
							}
						},temps);

						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= numCartes){
							this.level++;
                            this.correct = 0;
                            if (numCartes<6) numCartes++;
                            if(dificultat=="easy"){
                                dificultat = "normal";
                            }
                            else if (dificultat == "normal"){
                                dificultat = "hard";
                            }
                            puntsRestar +=10;
                            options_data.cards = numCartes;
							options_data.dificulty = dificultat;
							options_data.puntsPerd = puntsRestar;	
							sessionStorage.setItem("config", JSON.stringify(options_data));
                            this.scene.restart();
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
	}

	update (){	
    }

}