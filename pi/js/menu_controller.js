var menu = new Vue({
	el: "#menu_id",
	methods: {
		start_game(){
			sessionStorage.clear();
			name = prompt("User name");
			sessionStorage.setItem("username", name);
			loadpage("./html/game.html");
		},
		phaser_game_mode1(){
			sessionStorage.clear();
			name = prompt("User name");
			sessionStorage.setItem("username", name);
			loadpage("./phasergame_mode1.html");
		},
		phaser_game_mode2(){
			sessionStorage.clear();
			name = prompt("User name");
			sessionStorage.setItem("username", name);
			loadpage("./phasergame_mode2.html");
		},
		puntuacio(){
			loadpage("./html/puntuacio.html");
		},
		jugar(){
			loadpage("./html/jugar.html");
		},
		exit(){
			if (name != ""){
				alert("Leaving " + name + "'s game");
			}
			name = "";
			localStorage.clear();
			loadpage("../index.html");
		},
		options(){
			loadpage("./html/options.html");
		},
		load(){
			loadpage("./html/load.html");
		}
	}
});
