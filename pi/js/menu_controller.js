function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./game.html");
}

function phaser_game(){
	loadpage("./phasergame.html");
}

function puntuacio(){
	loadpage("./html/puntuacio.html");
}

function jugar(){
	loadpage("./html/jugar.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
	loadpage("../index.html");
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./html/load.html");
}

