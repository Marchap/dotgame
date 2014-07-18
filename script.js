//check ownership of each dot, loss of sustainability with class:availability
//look @ line 296


function dot(){
	this.upper=0;
	this.rside=0;
	this.lower=0;
	this.lside=0;
}

function available_dot(){
	this.side="";
	this.tag="";
}

function create_T(num){
	var board = new Array(num);

	for (var i = 0; i < board.length; i++){
		board[i]=new Array(num)
		for(var j = 0; j<board.length;j++){
			board[i][j] = new dot();
			if(i==0){
				board[i][j].tag="#a"+(j+1)
			}
			else if(i==1){
				board[i][j].tag="#b"+(j+1)
			}
			else if(i==2){
				board[i][j].tag="#c"+(j+1)
			}
			// else{
			// 	board[i][j].tag="#d"+(j+1)
			// }
		}
	};
	return board;
}

function check_score(){
	var sides=0;

	// for(var i = 0;i<board.length;i++){
	// 	for(var j = 0;j<board.length;j++){
	// 		for(var prop in board[i][j]){
	// 			sides+=board[i][j].prop;
	// 		}
	// 	}
	// }
	for(prop in board){
		sides+=board[prop];
	}
	alert(sides);
}

function check_open(dots){
	var sides = 0;
	for(var prop in dots){
		if(typeof dots[prop]=="number"){
			sides+=dots[prop];
		}
	}
	$("#font_color").html("check_open: "+dots.tag+","+sides)
	switch(dots.tag){
		case "#a1":if(sides==2){return 0;} break;
		case "#a2":if(sides==3){return 0;} break;
		case "#a3":if(sides==2){return 0;} break;
		case "#b1":if(sides==3){return 0;} break;
		case "#b2":if(sides==4){return 0;} break;
		case "#b3":if(sides==3){return 0;} break;
		case "#c1":if(sides==2){return 0;} break;
		case "#c2":if(sides==3){return 0;} break;
		case "#c3":if(sides==2){return 0;} break;
		default: return 1;
	}
}

function switchplayer(){
	player=(player == 1 ? 2 : 1);
	($("#indicate").html()=="Player 1") ? $("#indicate").html("Player 2") : $("#indicate").html("Player 1");
}

function find_available(dots){
	available = new Array();
	var aside ="";
	var atag = "";
			if(dots.charAt(1)=="a"){
				if(dots.charAt(2)=="1"){
				 	if(board[0][1].lside==0){
				 		$("#a2").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#a2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][0].upper==0){
				 		$("#b1").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#b1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="2"){
					if(board[0][0].rside==0){
				 		$("#a1").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#a1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[0][2].lside==0){
				 		$("#a3").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#a3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][1].upper==0){
				 		$("#b2").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#b2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="3"){
					if(board[0][1].rside==0){
				 		$("#a2").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#a2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][2].upper==0){
				 		$("#b3").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#b3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
			}
			else if(dots.charAt(1)=="b"){
				if(dots.charAt(2)=="1"){
					if(board[0][0].lower==0){
				 		$("#a1").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#a1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][0].upper==0){
				 		$("#c1").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#c1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][1].lside==0){
				 		$("#b2").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#b2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="2"){
					if(board[0][1].lower==0){
				 		$("#a2").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#a2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][0].rside==0){
				 		$("#b1").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#b1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][2].lside==0){
				 		$("#b3").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#b3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][1].upper==0){
				 		$("#c2").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#c2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="3"){
					if(board[0][2].lower==0){
				 		$("#a3").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#a3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[1][1].rside==0){
				 		$("#b2").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#b2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][2].upper==0){
				 		$("#c3").css('opacity',.5);
				 		aside ="upper";
				 		atag ="#c3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
			}
			else if(dots.charAt(1)=="c"){
				if(dots.charAt(2)=="1"){
					if(board[1][0].lower==0){
				 		$("#b1").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#b1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][1].lside==0){
				 		$("#c2").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#c2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="2"){
					if(board[1][1].lower==0){
				 		$("#b2").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#b2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][0].rside==0){
				 		$("#c1").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#c1";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][2].lside==0){
				 		$("#c3").css('opacity',.5);
				 		aside ="lside";
				 		atag ="#c3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				else if(dots.charAt(2)=="3"){
					if(board[1][2].lower==0){
				 		$("#b3").css('opacity',.5);
				 		aside ="lower";
				 		atag ="#b3";
				 		available.push({tag:atag,side:aside});
				 	}
				 	if(board[2][1].rside==0){
				 		$("#c2").css('opacity',.5);
				 		aside ="rside";
				 		atag ="#c2";
				 		available.push({tag:atag,side:aside});
				 	}
				 	return 1;
				}
				return 0;
			}
	// 	};
	// };
}

function confirm_available(dots,avail){
	for(var i = 0;i<board.length;i++){
		for(var j = 0; j<board.length;j++){
			if(board[i][j].tag==avail.tag){
				if(board[i][j][avail.side]==0){
					//$("#font_color").append(","+board[i][j][avail.side])
					board[i][j][avail.side]=1;
					reciprocate(avail);
					//drawline(dots);
					return 1;
				}
				return 0;
			}

		}
	}
}

function reciprocate(avail){
	for(var i = 0;i<board.length;i++){
		for(var j = 0; j<board.length;j++){
			if(prev_choice==board[i][j].tag){
				if(avail.side=="rside"){
					board[i][j].lside=1;
				}
				else if(avail.side=="lside"){
					board[i][j].rside=1;
				}
				else if(avail.side=="upper"){
					board[i][j].lower=1;
				}
				else{
					board[i][j].upper=1;
				}
			}
		}
	}
}

function drawline(dots){
	var dot1 = dots.split("#")
	var dot2 = prev_choice.split("#")
	$("#"+dot1[1]+"-"+dot2[1]).css('z-index',1);
	$("#"+dot1[1]+"-"+dot2[1]).toggle('fast');
	$("#blah").html("<br>"+dot1[1])
}

function display(table){
	$("#error").html("");
	for (var i = 0; i < table.length; i++) {
	 	for (var i = 0; i <table.length; i++) {
	 		$("#error").append(table[i][j]);
	 	};
	 	$("#error").append("<br>");
	 }; 	
}

function select_dots(dots){
	var confirm = 0;
	for (var i = 0; i < board.length; i++){
		for(var j = 0; j<board.length;j++){
			if(choice!=0){
				if(dots==board[i][j].tag){
					if(dots==prev_choice){
						$(dots).css('color','black');
						$('.left div').css('opacity',1);
						$('.middle div').css('opacity',1);
						$('.right div').css('opacity',1);						
						choice=0;
						($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
					}

					for(var k = 0;k<available.length;k++){//available[k] is the available dot(object) that was chosen on second choice
						if(dots==available[k].tag){
							confirm=confirm_available(dots,available[k]);
							if (confirm){
								//$("#font_color").html(available[k].side+","+available[k].tag+","+confirm);
								$(dots).css('color','white');
								choice=0;
								($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");

								$('.left div').css('opacity',1);
								$('.middle div').css('opacity',1);
								$('.right div').css('opacity',1);
								switchplayer();
								//check_score();
							}
						}
					}
				}
			}
			else{
				if(dots==board[i][j].tag){
					$("#what").html(check_open(board[i][j]))
					if(check_open(board[i][j])){
						confirm=find_available(dots);
						if (confirm){
							$(dots).css('color','white');
							prev_choice = dots;
							choice=1;
							($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");


						}
					}
				}	
			}
			
		}
	};
//$("#blah").html(choice)
}

var board = create_T(3);
var player = 1;
var choice = 0;
var prev_choice = "";
var available= [];

$(document).ready(function(){


	$("body").click(function(event){
		var pos = event.target.id
		var code = pos.split("");
		//$("#what").html("clicked:"+code);

		select_dots("#"+pos);
		
		$("#error").html("");

		for (var i = 0; i < board.length; i++) {
	 		for (var j = 0; j <board.length; j++) {
	 			$("#error").append(board[i][j].tag);
	 		};
	 	$("#error").append("<br>");
	 	};
	 	for (var i = 0; i < board.length; i++) {
	 		for (var j = 0; j <board.length; j++) {
	 			$("#error").append("("+board[i][j].upper+","+board[i][j].rside+","+board[i][j].lower+","+board[i][j].lside+")");
	 		};
	 	$("#error").append("<br>");
	 	};


	});
});

// function begin(){
// 	var size = prompt("length?"+\n+"max 5");
// 	if (size<=4 && !isNaN(size)) {
// 		create_table(size)
// 	};
// };




