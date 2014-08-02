
//objects used in a matrix to resemble the dots in DOM
function dot(){	
	this.upper=0;
	this.rside=0;
	this.lower=0;
	this.lside=0;
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
		case '#a1':if(sides!=2){return 1;break;}else{$('#a1').css('cursor','default');return 0;}
		case '#a2':if(sides!=3){return 1;break;}else{$('#a2').css('cursor','default');return 0;}
		case '#a3':if(sides!=2){return 1;break;}else{$('#a3').css('cursor','default');return 0;}
		case '#b1':if(sides!=3){return 1;break;}else{$('#b1').css('cursor','default');return 0;}
		case '#b2':if(sides!=4){return 1;break;}else{$('#b2').css('cursor','default');return 0;}
		case '#b3':if(sides!=3){return 1;break;}else{$('#b3').css('cursor','default');return 0;}
		case '#c1':if(sides!=2){return 1;break;}else{$('#c1').css('cursor','default');return 0;}
		case '#c2':if(sides!=3){return 1;break;}else{$('#c2').css('cursor','default');return 0;}
		case '#c3':if(sides!=2){return 1;break;}else{$('#c3').css('cursor','default');return 0;}
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
	var temp = 0;

	if(dots=="#a1"){
		if(board[0][1].lside==0){
			$("#a2").css('opacity',.5);
 			available.push({tag:"#a2",side:"lside"});
 			temp++;
 		}
 		if(board[1][0].upper==0){
	 		$("#b1").css('opacity',.5);
	 		available.push({tag:"#b1",side:"upper"});
	 		temp++;
	 	}
	}
	else if(dots=="#a2"){
		if(board[0][0].rside==0){
	 		$("#a1").css('opacity',.5);
	 		available.push({tag:"#a1",side:"rside"});
	 		temp++;
	 	}
	 	if(board[0][2].lside==0){
	 		$("#a3").css('opacity',.5);
	 		available.push({tag:"#a3",side:"lside"});
	 		temp++;
	 	}
	 	if(board[1][1].upper==0){
	 		$("#b2").css('opacity',.5);
	 		available.push({tag:"#b2",side:"upper"});
	 		temp++;
	 	}
	}
	else if(dots=="#a3"){
		if(board[0][1].rside==0){
	 		$("#a2").css('opacity',.5);
	 		available.push({tag:"#a2",side:"rside"});
	 		temp++;
	 	}
	 	if(board[1][2].upper==0){
	 		$("#b3").css('opacity',.5);
	 		available.push({tag:"#b3",side:"upper"});
	 		temp++;
	 	}
	}
	else if(dots=="#b1"){
		if(board[0][0].lower==0){
	 		$("#a1").css('opacity',.5);
	 		available.push({tag:"#a1",side:"lower"});
	 		temp++;
	 	}
	 	if(board[2][0].upper==0){
	 		$("#c1").css('opacity',.5);
	 		available.push({tag:"#c1",side:"upper"});
	 		temp++;
	 	}
	 	if(board[1][1].lside==0){
	 		$("#b2").css('opacity',.5);
	 		available.push({tag:"#b2",side:"lside"});
	 		temp++;
	 	}
	}
	else if(dots=="#b2"){
		if(board[0][1].lower==0){
	 		$("#a2").css('opacity',.5);
	 		available.push({tag:"#a2",side:"lower"});
	 		temp++;
	 	}
	 	if(board[1][0].rside==0){
	 		$("#b1").css('opacity',.5);
	 		available.push({tag:"#b1",side:"rside"});
	 		temp++;
	 	}
	 	if(board[1][2].lside==0){
	 		$("#b3").css('opacity',.5);
	 		available.push({tag:"#b3",side:"lside"});
	 		temp++;
	 	}
	 	if(board[2][1].upper==0){
	 		$("#c2").css('opacity',.5);
	 		available.push({tag:"#c2",side:"upper"});
	 		temp++;
	 	}
	}
	else if(dots=="#b3"){
		if(board[0][2].lower==0){
	 		$("#a3").css('opacity',.5);
	 		available.push({tag:"#a3",side:"lower"});
	 		temp++;
	 	}
	 	if(board[1][1].rside==0){
	 		$("#b2").css('opacity',.5);
	 		available.push({tag:"#b2",side:"rside"});
	 		temp++;
	 	}
	 	if(board[2][2].upper==0){
	 		$("#c3").css('opacity',.5);
	 		available.push({tag:"#c3",side:"upper"});
	 		temp++;
	 	}
	}
	else if(dots=="#c1"){
		if(board[1][0].lower==0){
	 		$("#b1").css('opacity',.5);
	 		available.push({tag:"#b1",side:"lower"});
	 		temp++;
	 	}
	 	if(board[2][1].lside==0){
	 		$("#c2").css('opacity',.5);
	 		available.push({tag:"#c2",side:"lside"});
	 		temp++;
	 	}
	}
	else if(dots=="#c2"){
		if(board[1][1].lower==0){
	 		$("#b2").css('opacity',.5);
	 		available.push({tag:"#b2",side:"lower"});
	 		temp++;
	 	}
	 	if(board[2][0].rside==0){
	 		$("#c1").css('opacity',.5);
	 		available.push({tag:"#c1",side:"rside"});
	 		temp++;
	 	}
	 	if(board[2][2].lside==0){
	 		$("#c3").css('opacity',.5);
	 		available.push({tag:"#c3",side:"lside"});
	 		temp++;
	 	}
	}
	else if(dots=="#c3"){
		if(board[1][2].lower==0){
	 		$("#b3").css('opacity',.5);
	 		available.push({tag:"#b3",side:"lower"});
	 		temp++;
	 	}
	 	if(board[2][1].rside==0){
	 		$("#c2").css('opacity',.5);
	 		available.push({tag:"#c2",side:"rside"});
	 		temp++;
	 	}
	}
	return temp;
}

//IN PROGRESS -- thoughts: counting the sides that create a cell-- issues: if a cell is already claimed
function check_score(line){
	var tempcell = new Array;
	var temp = 0;
	var flag = false;
	for(var i = 0;i<4;i++){
		for(var prop in cells[i]){
			if(line==cells[i][prop]){
				tempcell.push(cells[i])
			}
		}
	}
	for(var i = 0;i<tempcell.length;i++){
		for(var prop in tempcell[i]){
			if($(tempcell[i][prop]).css('display')!='none'){
				temp++;
			}
		}
		if(temp==4){
			if(player==1){
				players[0].score++;
			}
			else{
				players[1].score++;
			}
			flag=true;
		}
		temp=0;
	}
	if(flag){
		$("#p_1").html("Player 1: "+players[0].score)
		$("#p_2").html("Player 2: "+players[1].score)
	}
return flag;
}

//Perhaps redundant -- 3rd and last block used to be certain a line is to be made.
// function confirm_available(avail){
// 	for(var i = 0;i<board.length;i++){
// 		for(var j = 0; j<board.length;j++){
// 			if(board[i][j].tag==avail.tag){
// 				if(board[i][j][avail.side]==0){
// 					board[i][j][avail.side]=1;
// 					reciprocate(avail);
// 					check_score();
// 					return 1;
// 				}
// 				return 0;
// 			}

// 		}
// 	}
// }

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
	var temp = (player == 1 ? 0 : 1);
	var line_color = (player == 1 ? players[0].hue : players[1].hue)
	
	//if order differs (a1-b1) or (b1-a1)
	if($("#"+dot1[1]+"-"+dot2[1]).is("div")){
		$("#"+dot1[1]+"-"+dot2[1]).css('color',line_color)
		$("#"+dot1[1]+"-"+dot2[1]).fadeToggle('fast');
		players[temp].lines.push("#"+dot1[1]+"-"+dot2[1])
		return ("#"+dot1[1]+"-"+dot2[1]);
	}
	else if($("#"+dot2[1]+"-"+dot1[1]).is("div")){
		$("#"+dot2[1]+"-"+dot1[1]).css('color',line_color)
		$("#"+dot2[1]+"-"+dot1[1]).fadeToggle('fast');
		players[temp].lines.push("#"+dot2[1]+"-"+dot1[1])
		return ("#"+dot2[1]+"-"+dot1[1]);
	}
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
	var tempLine = "";
	var flag = false;
	for (var i = 0; i < board.length; i++){
		for(var j = 0; j<board.length;j++){
			
			//if first choice has been picked
			if(choice!=0){
				if(dots==board[i][j].tag){
					//if second choice == first choice:return to normal
					if(dots==prev_choice){
						$(dots).css('color','black');
						$('.sort').find("div").css('opacity',1);						
						choice=0;
						($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
					}
					//searching the array of available dots for your second selection
					for(var k = 0;k<available.length;k++){
						
						//if found
						if(dots==available[k].tag){	
								// $("#what").html(available[k].side)
							board[i][j][available[k].side]=1;
							reciprocate(available[k])
							tempLine=drawline(dots);
							flag=check_score(tempLine);
							$(prev_choice).css('color','black')
							choice=0;
							($("#blah").html()=="Choice 0") ? $("#blah").html("Choice 1") : $("#blah").html("Choice 0");
							$('.sort').find("div").css('opacity',1);
							if(!flag){
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
						// $('#what').html(available[0].side+","+available[1].side)
						if (confirm>0){
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

function changecolor(newcolor,whichPlayer){
	players[whichPlayer].hue=newcolor;

	for(var j = 0; j<players[whichPlayer].lines.length;j++){
		$(players[whichPlayer].lines[j]).css('color',newcolor)
	}

}

function check_color(){
	var temp = "";
	$('#choosecolor1').children('p').each(function(){
		temp = $(this).css('background-color')
		if(temp==$('#color2').css('background-color')){
			$(this).css('display','none');
		}
		else{
			$(this).css('display','block')
		}
	});
	$('#choosecolor2').children('p').each(function(){
		temp=$(this).css('background-color')
		if(temp==$('#color1').css('background-color')){
			$(this).css('display','none');
			return 0;
		}
		else{
			$(this).css('display','block')
		}
	});

}

function match_cells(){
	var array = new Array;
	array[0]= new block("#a1-a2","#a2-b2","#b1-b2","#a1-b1");
	array[1]= new block("#a2-a3","#a3-b3","#b2-b3","#a2-b2");
	array[2]= new block("#b1-b2","#b2-c2","#c1-c2","#b1-c1");
	array[3]= new block("#b2-b3","#b3-c3","#c2-c3","#b2-c2");
	return array;
}

function block(u,r,d,l){
	this.u=u;
	this.r=r;
	this.d=d;
	this.l=l;
}

function person(num,hue){
	this.num=num;
	this.score=0;
	this.lines=new Array();
	this.hue=hue;
	this.handcock="";
}

//global variables
var board = create_T(3);
var player = 1;
var choice = 0;
var prev_choice = "";
var available= [];
var play1_score=0;
var play2_score=0;
var name1="";
var name2="";

var players = [new person(1,"green"),new person(2,"black")]
var cells = match_cells();

$(document).ready(function(){
	
	players[0].handcock=prompt("Player1: Name?");
	players[1].handcock=prompt("Player2: Name?");



	$('body').click(function(event){
		$("#font_color").html(event.target.id + event.target.className)
	})

	$('.score').click(function(event){
		check_color();
		if(event.target.id=="color1"){
			$('#choosecolor1').slideToggle('fast');

			if($('#choosecolor2').css('display')!='none'){
				$('#choosecolor2').slideToggle('fast');
			}
		}
		else if(event.target.id=='color2'){
			$("#choosecolor2").slideToggle('fast');
			if($('#choosecolor1').css('display')!='none'){
				$('#choosecolor1').slideToggle('fast');
			}
		}
		
	});

	$('#colors').click(function(event){
		var tempcolor = $(event.target).css('background-color');

		if($(event.target).closest('div').attr('id')=='choosecolor1'){
			$('#color1').css('background-color',tempcolor)
			changecolor(tempcolor,0);
		}
		else{
			$('#color2').css('background-color',tempcolor)
			changecolor(tempcolor,1)
		}
	});


	$(".arena").click(function(event){
		var pos = event.target.id
		var code = pos.split("");

		if($("#choosecolor1").css('display')!='none'){$('#choosecolor1').slideToggle('fast')}
		else if($('#choosecolor2').css('display')!='none'){$('#choosecolor2').slideToggle('fast')}
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




