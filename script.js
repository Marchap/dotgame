
//objects used in a matrix to resemble the dots in DOM
function dot(){	
	this.upper=0;
	this.rside=0;
	this.lower=0;
	this.lside=0;
}

//used to list the available dots around the selected dot
function available_dot(){x
	this.side="";
	this.tag="";
}

//create table
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

//used to count open sides of the first selected dot
function check_open(dots){
	var sides = 0;
	for(var prop in dots){
		if(typeof dots[prop]=="number"){
			sides+=dots[prop];
		}
	}
	$("#font_color").html("check_open: "+dots.tag+","+sides)
	switch(dots.tag){
		case '#a1':if(sides!=2){return 1;break;}else{return 0;}
		case '#a2':if(sides!=3){return 1;break;}else{return 0;}
		case '#a3':if(sides!=2){return 1;break;}else{return 0;}
		case '#b1':if(sides!=3){return 1;break;}else{return 0;}
		case '#b2':if(sides!=4){return 1;break;}else{return 0;}
		case '#b3':if(sides!=3){return 1;break;}else{return 0;}
		case '#c1':if(sides!=2){return 1;break;}else{return 0;}
		case '#c2':if(sides!=3){return 1;break;}else{return 0;}
		case '#c3':if(sides!=2){return 1;break;}else{return 0;}
	}
}

function switchplayer(){
	player=(player == 1 ? 2 : 1);
	($("#indicate").html()=="Player 1") ? $("#indicate").html("Player 2") : $("#indicate").html("Player 1");
}

//uses the dot selected to find available dots nearby
function find_available(dots){
	//blank array to house the id's of available dots
	available = new Array();
	//temporary variables
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

//IN PROGRESS -- thoughts: counting the sides that create a cell-- issues: if a cell is already claimed
function check_score(p){
	

	if(board[0][0].rside && board[0][0].lower && board[1][0].rside && board[1][1].upper){

	}
}

//Perhaps redundant -- 3rd and last block used to be certain a line is to be made.
function confirm_available(avail){
	for(var i = 0;i<board.length;i++){
		for(var j = 0; j<board.length;j++){
			if(board[i][j].tag==avail.tag){
				if(board[i][j][avail.side]==0){
					board[i][j][avail.side]=1;
					reciprocate(avail);
					check_score();
					//drawline(dots);
					return 1;
				}
				return 0;
			}

		}
	}
}

//Occupying the side of the first dot(board[i][j]) relative to the second dot(chosen).
function reciprocate(chosen){
	for(var i = 0;i<board.length;i++){
		for(var j = 0; j<board.length;j++){
			if(prev_choice==board[i][j].tag){
				if(chosen.side=="rside"){
					board[i][j].lside=1;
				}
				else if(chosen.side=="lside"){
					board[i][j].rside=1;
				}
				else if(chosen.side=="upper"){
					board[i][j].lower=1;
				}
				else{
					board[i][j].upper=1;
				}
			}
		}
	}
}

//toggling the appropriate line that is made in DOM.
function drawline(dots){
	var dot1 = dots.split("#")
	var dot2 = prev_choice.split("#")
	var line_color = (player == 1 ? "#5CE68A" : "#000000")
	
	//if order differs (a1-b1) or (b1-a1)
	if($("#"+dot1[1]+"-"+dot2[1]).is("div")){
		$("#"+dot1[1]+"-"+dot2[1]).css('color',line_color)
		$("#"+dot1[1]+"-"+dot2[1]).fadeToggle('fast');
	}
	else if($("#"+dot2[1]+"-"+dot1[1]).is("div")){
		$("#"+dot2[1]+"-"+dot1[1]).css('color',line_color)
		$("#"+dot2[1]+"-"+dot1[1]).fadeToggle('fast');
	}
	$("#what").html("#"+dot1[1]+"-"+dot2[1]+", "+ line_color)
}

//created to display the 2-d array of "dots" -- could not make it work through function -- created it in DOM ready.click
function display(table){
	$("#error").html("");
	for (var i = 0; i < table.length; i++) {
	 	for (var i = 0; i <table.length; i++) {
	 		$("#error").append(table[i][j]);
	 	};
	 	$("#error").append("<br>");
	 }; 	
}

//pretty much the backbone of selecting dots to making a line
function select_dots(dots){
	var confirm = 0;
	for (var i = 0; i < board.length; i++){
		for(var j = 0; j<board.length;j++){
			
			//if first choice has been picked
			if(choice!=0){
				if(dots==board[i][j].tag){
					//if second choice == first choice:return to normal
					if(dots==prev_choice){
						$(dots).css('color','black');
						$('.left div').css('opacity',1);
						$('.middle div').css('opacity',1);
						$('.right div').css('opacity',1);						
						choice=0;
						($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
					}
					//searching the array of available dots for your second selection
					for(var k = 0;k<available.length;k++){
						
						//if found
						if(dots==available[k].tag){	
							
							//make sure
							confirm=confirm_available(available[k],board[i][j]);
							
							//create line & switch player & reset
							if (confirm){
								drawline(dots);
								$(dots).css('color','black');
								$(prev_choice).css('color','black')
								choice=0;
								($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
								$('.left div').css('opacity',1);
								$('.middle div').css('opacity',1);
								$('.right div').css('opacity',1);
								switchplayer();							
							}
						}
					}
				}
			}
			
			//if first choice
			else{
				if(dots==board[i][j].tag){
					
					//check if dot is available
					if(check_open(board[i][j])){
						
						//finds available dots: returns 1/0 to break loop
						confirm=find_available(dots);
						if (confirm){
							$(dots).css('color','#E62E00');
							prev_choice = dots;
							choice=1;
							($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
						}
					}
				}	
			}
			
		}
	};
}

//global variables
var board = create_T(3);
var player = 1;
var choice = 0;
var prev_choice = "";
var available= [];
var play1_score=0;
var play2_score=0;


$(document).ready(function(){
	$("body").click(function(event){
		var pos = event.target.id
		var code = pos.split("");

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




