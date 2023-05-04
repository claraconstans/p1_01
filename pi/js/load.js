var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: []
		},
		created: function(){
			let arrayPartides = [];
			if(localStorage.partides){
				arrayPartides = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			this.saves = arrayPartides;
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				if(this.saves[i].mode == "1"){
					loadpage("../html/phasergame_mode1.html");
				}
				else if(this.saves[i].mode == "2"){
					loadpage("../html/phasergame_mode2.html");
				}
				else {
					loadpage("../html/game.html");
				}
			}
		}
	});
	return {}; 
}();

