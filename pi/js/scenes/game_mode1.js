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
		
		let partidaGuardada = null;
		if (sessionStorage.idPartida && localStorage.partides){
			let arrayPartides = JSON.parse(localStorage.partides);
			if (sessionStorage.idPartida < arrayPartides.length){
				partidaGuardada = arrayPartides[sessionStorage.idPartida];
			}
		}

		var numCartes = null;
		var dificultat = null;
		var temps = null;
		var puntsRestar = null;
		
		if(partidaGuardada){
			this.score = partidaGuardada.scoreGuardat;
			this.correct = partidaGuardada.correctGuardat;
			this.player = partidaGuardada.playerGuardat;
			numCartes = partidaGuardada.numCartesGuardat;
			dificultat = partidaGuardada.dificultatGuardat;
			temps = partidaGuardada.tempsGuardat;
			puntsRestar = partidaGuardada.puntsRestarGuardat;
			arraycards = partidaGuardada.arraycardsGuardat;

			var numArray=0;
			for (let c = 0; c < numCartes; c++){
				for (let f = 0; f < 2; f++){
					this.add.image(this.cameras.main.centerX+125*c-96*numCartes/2, this.cameras.main.centerY-128*numCartes/2+150*f, arraycards[numArray]);
					numArray++;
				}
			}
			this.cards = this.physics.add.staticGroup();
			let aux = 0;
			for (let c = 0; c < numCartes; c++){
				for (let f = 0; f < 2; f++){
					if(partidaGuardada.situacioCartesGuardat[aux]==true){
						this.cards.create(this.cameras.main.centerX+125*c-96*numCartes/2, this.cameras.main.centerY-128*numCartes/2+150*f, 'back');
					}
					aux++;
				}
			}
		}
		else{
			this.player = sessionStorage.getItem("username","unknown");
			var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
			var options_data = JSON.parse(json);
			numCartes = options_data.cards;
			dificultat = options_data.dificulty;
			
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
		}
				
		let i = 0;
		this.cards.children.iterate((card)=>{
			if(partidaGuardada){
				while(partidaGuardada.situacioCartesGuardat[i]==false){
					i++;
				}
				card.card_id = arraycards[i];
				i++;
			}
			else{
				card.card_id = arraycards[i];
				i++;
			}
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
							alert("You Win with " + this.score + " points.");
							loadpage("../");
						}
					}
					this.firstClick = null;
				}
				else{
					this.firstClick = card;
				}
			}, card);
		});
		const botoGuardar = this.add.text(this.cameras.main.centerX-123, 620, 'Guardar Partida', {fontSize: '20px', fill: '#000'});
		botoGuardar.setInteractive();
		botoGuardar.on('pointerdown', () => {
			let situacioCartes = [];
			let aux = 0;
			this.cards.children.iterate((card) => {
				situacioCartes[aux] = card.active;
				aux++;
			});

			let partida = {
				scoreGuardat: this.score,
				correctGuardat: this.correct,
				playerGuardat: this.player,
				numCartesGuardat: numCartes,
				dificultatGuardat: dificultat,
				tempsGuardat: temps,
				puntsRestarGuardat: puntsRestar,
				arraycardsGuardat: arraycards,
				situacioCartesGuardat: situacioCartes,
				mode: 1
			};
			let arrayPartides = [];
			if(localStorage.partides){
				arrayPartides = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			arrayPartides.push(partida);
			localStorage.partides=JSON.stringify(arrayPartides);
			loadpage("../");
		});		
	}
	
	update (){	}
}

