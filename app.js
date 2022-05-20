var context;
var shape = new Object();
shape.i=1;
shape.j=4;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval_time =185;
var start_angle = 0;
var end_angle =0;
var eye_x = 5;
var eye_y =15;
var total_points =50;
var food_remain;
var game_on = false;
var paused = true;

//cell size
var height_cell = 60;
var width_cell = 60;


//ghosts
var GhostAmount=1;
var interval_ghosts;
var interval_ghosts_time = 285;
//pink
var ghost_pink = new Object();
ghost_pink.image = new Image(width_cell-4,height_cell-4);
ghost_pink.image.src = "./photos/ghost_pink.png";
ghost_pink.id=7;
ghost_pink.showGhost =true;
ghost_pink.sleep = 0;
ghost_pink.i=0;
ghost_pink.j=0;
//blue
var ghost_blue = new Object();
ghost_blue.image = new Image(width_cell-4,height_cell-4);
ghost_blue.image.src = "./photos/ghost_blue.png";
ghost_blue.id=8;
ghost_blue.showGhost =true;
ghost_blue.sleep = 0;
ghost_blue.i=9;
ghost_blue.j=9;
//orange
var ghost_orange = new Object();
ghost_orange.image = new Image(width_cell-4,height_cell-4);
ghost_orange.image.src = "./photos/ghost_orange.png";
ghost_orange.id=9;
ghost_orange.showGhost =true;
ghost_orange.sleep = 0;
ghost_orange.i=0;
ghost_orange.j=9;
//red
var ghost_red = new Object();
ghost_red.image = new Image(width_cell-4,height_cell-4);
ghost_red.image.src = "./photos/ghost_red.png";
ghost_red.id=10;
ghost_red.showGhost =true;
ghost_red.sleep = 0;
ghost_red.i=9;
ghost_red.j=0;


var interval_move_50;
var interval_move_50_time = 1001;
//50 points moving (cherry image)
var move_50_points = new Object();
move_50_points.image = new Image(width_cell-4,height_cell-4);
move_50_points.image.src = "./photos/cherry.png";
move_50_points.id=11;
move_50_points.showGhost = true;
move_50_points.sleep = 0;
move_50_points.i=5;
move_50_points.j=5;


var interval_clock;
//5 sec clock_bonus (clock_bonus image)
var clock_bonus_sec = new Object();
clock_bonus_sec.image = new Image(width_cell-4,height_cell-4);
clock_bonus_sec.image.src = "./photos/clock_image.png";
clock_bonus_sec.id=12;
clock_bonus_sec.showGhost = true;
clock_bonus_sec.sleep = 0;
clock_bonus_sec.i=5;
clock_bonus_sec.j=5;

//good drug = add live to user
var good_drug = new Object();
good_drug.image = new Image(width_cell-4,height_cell-4);
good_drug.image.src = "./photos/good_drug_.png";
good_drug.id=13;
good_drug.showGhost = true;
good_drug.sleep = 0;
good_drug.i=7;
good_drug.j=7;

var coca = new Object();
coca.image = new Image(width_cell-4,height_cell-4);
coca.image.src = "./photos/coca.png";
coca.id=14;
coca.showGhost = true;
coca.sleep = 0;
coca.i=1;
coca.j=9;


//lives
var lives=5;
var life_context;
var life = new Object();
life.image = new Image(width_cell,height_cell);
life.image.src = "./photos/life.png";
//var life_canvas = document.getElementById("life_canvas");

//sounds
var ghost_sound = new Audio("./sound/ghost_sound.mp3");
var ball_pick_sound=new Audio("./sound/ball_pick.mp3");


var ans

$(document).ready(function() {

	showAndHideDivs("welcome")

	//context = canvas.getContext("2d");
	//Start();
});


function Start() {
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);
	game_timer_app = document.getElementById("game_time");
	UpdateSideSettingsMenuValues();
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	game_on = true;
	paused = false;
	
	ghost_pink.image.src = "./photos/ghost_pink.png";
	ghost_blue.image.src = "./photos/ghost_blue.png";
	ghost_orange.image.src = "./photos/ghost_orange.png";
	ghost_red.image.src = "./photos/ghost_red.png";

	var pacman_remain = 1;
	start_time = new Date();
	// ConfigureGame();
	GhostAmount = 2;// TODO: update this after marge with element id
	GhostAmount = document.getElementById("num_of_monsters").value;// TODO: update this after marge with element id
	//food_remain = 50;//TODO : update this with element ID from index.html
	food_remain = document.getElementById("balls").value;
	if ((food_remain+GhostAmount)>=81) {
		food_remain =77;
	}
	//50*0.6=30 --> 5 points - lime --> board[i][j] = 1;
	var ball_5_counter = Math.round(food_remain*0.6);
	//50*0.3=15 --> 15 p - blue --> board[i][j] = 5;
	var ball_15_counter = Math.round(food_remain*0.3);
	//50*0.1 = 5 --> 25 p - red --> board[i][j] = 6;
	var ball_25_counter = Math.round(food_remain*0.1);
	//in case of not integer
	while (ball_5_counter+ball_15_counter+ball_25_counter !=food_remain) {
		if (ball_5_counter+ball_15_counter+ball_25_counter <food_remain) {
			ball_5_counter++;
		} else {
			ball_5_counter--;
		}
	}
	total_points = ball_5_counter*5 + ball_15_counter*15 + ball_25_counter*25;

	if (GhostAmount==1) {
		ghost_pink.showGhost = true;
		ghost_blue.showGhost =false;
		ghost_orange.showGhost=false;
		ghost_red.showGhost=false;
		ghost_pink.sleep=0;
	} else if (GhostAmount==2) {
		ghost_pink.showGhost = true;
		ghost_blue.showGhost =true;
		ghost_orange.showGhost=false;
		ghost_red.showGhost=false;
		ghost_pink.sleep=0;
		ghost_blue.sleep=0;
	} else if (GhostAmount==3) {
		ghost_pink.showGhost = true;
		ghost_blue.showGhost =true;
		ghost_orange.showGhost=true;
		ghost_red.showGhost=false;
		ghost_pink.sleep=0;
		ghost_blue.sleep=0;
		ghost_orange.sleep=0;
	} else if (GhostAmount==4) {
		ghost_pink.showGhost = true;
		ghost_blue.showGhost =true;
		ghost_orange.showGhost=true;
		ghost_red.showGhost=true;
		ghost_pink.sleep=0;
		ghost_blue.sleep=0;
		ghost_orange.sleep=0;
		ghost_red.sleep=0;
	}
	//50 points character
	move_50_points.showGhost = true;
	move_50_points.sleep = 0;
	// [move_50_points.i,move_50_points.j] = findRandomEmptyCell(board);

	clock_bonus_sec.showGhost = true;
	clock_bonus_sec.sleep = 0;
	good_drug.showGhost = true;
	good_drug.sleep = 0;
	
	coca.showGhost = true;
	coca.sleep = 0;
	
	ghost_pink.i=0;
	ghost_pink.j=0;
	ghost_red.i=9;
	ghost_red.j=0;
	ghost_orange.i=0;
	ghost_orange.j=9;
	ghost_blue.i=9;
	ghost_blue.j=9;
	lives = 5;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (//walls
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 7 && j == 1) ||
				(i == 7 && j == 2) ||
				(i == 6 && j == 7)
			) {
				board[i][j] = 4;
			} else if ((
				(i == 2 && j == 3) ||
				(i == 1 && j == 3) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 8) ||
				(i == 7 && j == 8)) && (food_remain<74)
			) {
					board[i][j] = 3;
			} else if (i==ghost_pink.i && j==ghost_pink.j && ghost_pink.showGhost==true) {
				board[0][0] = ghost_pink.id;
				ghost_pink.i=0;
				ghost_pink.j=0;
			} else if (i==ghost_blue.i && j==ghost_blue.j && ghost_blue.showGhost==true) {
				board[9][9] = ghost_blue.id;
				ghost_blue.i=9;
				ghost_blue.j=9;
			} else if (i==ghost_orange.i && j==ghost_orange.j && ghost_orange.showGhost==true) {
				board[0][9] = ghost_orange.id;
				ghost_orange.i=0;
				ghost_orange.j=9;
			} else if (i==ghost_red.i && j==ghost_red.j && ghost_red.showGhost==true) {
				board[9][0] = ghost_red.id;
				ghost_red.i=9;
				ghost_red.j=0;
			}else if (i==move_50_points.i && j==move_50_points.j && move_50_points.showGhost==true) {
				board[i][j] = move_50_points.id;
			}else if (i==clock_bonus_sec.i && j==clock_bonus_sec.j && clock_bonus_sec.showGhost==true) {
				board[i][j] = clock_bonus_sec.id;
			}else if (i==good_drug.i && j==good_drug.j && good_drug.showGhost==true) {
				board[i][j] = good_drug.id;
			}else if (i==coca.i && j==coca.j && coca.showGhost==true) {
                                board[i][j] = coca.id;
                        } else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					if (ball_5_counter>0 && ball_15_counter>0 && ball_25_counter>0) {
						rnd_ball = Math.floor(Math.random()*3)//0=lime_ball(5 pt),1=blue ball(15 pt),2=red ball(25pt)
						if (rnd_ball==0) {
							ball_5_counter--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							ball_15_counter--;
							board[i][j]=5;
						} else {
							ball_25_counter--;
							board[i][j]=6;
						}
					} else if (ball_5_counter>0 && ball_15_counter>0) {
						rnd_ball = Math.floor(Math.random()*2)//0=lime_ball(5 pt),1=blue ball(15 pt)
						if (rnd_ball==0) {
							ball_5_counter--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							ball_15_counter--;
							board[i][j]=5;
						}
					} else if (ball_5_counter>0 && ball_25_counter>0) {
						rnd_ball = Math.floor(Math.random()*2)//0=lime_ball(5 pt),1=red ball(25pt)
						if (rnd_ball==0) {
							ball_5_counter--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							ball_25_counter--;
							board[i][j]=6;
						}
					} else if (ball_15_counter>0 && ball_25_counter>0) {
						rnd_ball = Math.floor(Math.random()*3)//0=blue ball(15 pt),1=red ball(25pt)
						if (rnd_ball==0) {
							ball_15_counter--;
							board[i][j] = 5;
						} else if (rnd_ball==1) {
							ball_25_counter--;
							board[i][j]=6;
						}						
					} else if(ball_5_counter>0) {
						ball_5_counter--;
						board[i][j] = 1;						
					} else if(ball_15_counter>0) {
						ball_15_counter--;
						board[i][j] = 5;						
					} else {
						ball_25_counter--;
						board[i][j] = 6;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);

	interval = setInterval(UpdatePosition,interval_time);
	interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
	interval_move_50 = setInterval(UpdatePosition50PointsCharacter,interval_move_50_time);
	//interval_clock = setInterval(UpdatePositionClockBonus,889);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	let up = document.getElementById("up").value
	let down = document.getElementById("down").value
	let left = document.getElementById("left").value
	let right = document.getElementById("right").value

	if (keysDown[KEY[up]]) {
		return 1;
	}
	if (keysDown[KEY[down]]) {
		return 2;
	}
	if (keysDown[KEY[left]]) {
		return 3;
	}
	if (keysDown[KEY[right]]) {
		return 4;
	}
}

function Draw() {
	life_canvas.width=life_canvas.width;
	for (var i = 0; i<lives; i++) {
		var center = new Object();
		center.x = i * (life_canvas.width)/10 + (life_canvas.width)/20;
		// life_context.beginPath();
		life_context.drawImage(life.image,center.x - (width_cell/2) +2 ,(height_cell/2)+2,width_cell,height_cell);
	}
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * (canvas.width)/10 + (canvas.width)/20;
			center.y = j * (canvas.width)/10 + (canvas.width)/20;
			if (board[i][j] == 2) {
				//the pacman
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/20, 0.15 * Math.PI + start_angle, 1.85 * Math.PI +end_angle); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + eye_x, center.y - eye_y, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
				//context.drawImage(img,center.x,center.y,(canvas.width)/15, (canvas.width)/15);
			//ghosts
			} else if (i==ghost_pink.i && j==ghost_pink.j && ghost_pink.showGhost==true) {
				context.drawImage(ghost_pink.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_blue.i && j==ghost_blue.j && ghost_blue.showGhost==true) {
				context.drawImage(ghost_blue.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_orange.i && j==ghost_orange.j && ghost_orange.showGhost==true) {
				context.drawImage(ghost_orange.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_red.i && j==ghost_red.j && ghost_red.showGhost==true) {
				context.drawImage(ghost_red.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			//50 points
			}else if (i==move_50_points.i && j==move_50_points.j && move_50_points.showGhost==true) {
				context.drawImage(move_50_points.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			//clock bonus
			}else if (i==clock_bonus_sec.i && j==clock_bonus_sec.j && clock_bonus_sec.showGhost==true) {
				context.drawImage(clock_bonus_sec.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}//good_drug
			else if (i==good_drug.i && j==good_drug.j && good_drug.showGhost==true) {
				context.drawImage(good_drug.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			} //coca - make the ghost to move slow for few seconds
			else if (i==coca.i && j==coca.j && coca.showGhost==true) {
					context.drawImage(coca.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (board[i][j] == 1) {
				//lime ball
				let ball_5_color = document.getElementById("5_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/50, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_5_color; //color
				context.fill();
				context.font="12px Arial";
				context.textAlign = "center";
				context.strokeStyle = "black"; //pts color
				context.strokeText("5",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 5) {
				//"blue ball
				let ball_15_color = document.getElementById("15_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/50, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_15_color; //color
				context.fill();	
				context.font="12px Arial";
				context.textAlign = "center";
				context.strokeStyle = "white"; //pts color
				context.strokeText("15",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 6) {
				//red ball
				let ball_25_color = document.getElementById("25_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/50, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_25_color; //color
				context.fill();
				context.font="12px Arial";
				context.textAlign = "center";
				context.strokeStyle = "white"; //pts color
				context.strokeText("25",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 4) {
				//walls
				//the original part was :
				context.beginPath();
				context.rect(center.x - (canvas.width)/20, center.y - (canvas.width)/20, (canvas.width)/20, (canvas.width)/10);
				context.fillStyle = "#383838"; //color
				context.fill();
				context.strokeStyle = "#303030";
				context.stroke();
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.rect(center.x - (canvas.width)/20, center.y - (canvas.width)/20, (canvas.width)/10, (canvas.width)/20);
				context.fillStyle = "#383838"; //color
				context.fill();
				context.strokeStyle = "#303030";
				context.stroke();
			}
		}
	}
}

function UpdatePosition() {
	if (time_elapsed>= game_timer_app.value || score>=total_points) {
		End();
	}else if (!paused && game_on) {
		board[shape.i][shape.j] = 0;
		var x = GetKeyPressed();
		if (x == 1) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4 && board[shape.i][shape.j - 1] != 3) {//up
				shape.j--;
				eye_x = 12;
				eye_y = 4;
				start_angle = -Math.PI/2;
				end_angle = -Math.PI/2;
			}
		}
		if (x == 2) {
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4 && board[shape.i][shape.j + 1] != 3 ) {//down
				shape.j++;
				eye_x = -12;
				eye_y = -4;			
				start_angle = Math.PI/2;
				end_angle = Math.PI/2;			
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4 && board[shape.i - 1][shape.j] != 3 ) {//left
				shape.i--;
				eye_x = -5;
				eye_y = 14;
				start_angle = Math.PI;
				end_angle = Math.PI;
			}
		}
		if (x == 4) {
			if (shape.i < 9 && board[shape.i + 1][shape.j] != 4 && board[shape.i + 1][shape.j] != 3) {//right
				shape.i++;
				eye_x = 5;
				eye_y = 14;			
				start_angle = 0;
				end_angle = 0;
			}
		}
		if(board[shape.i][shape.j]==11) {
			//TODO: Notify user!!!
			board[shape.i][shape.j] = move_50_points.sleep;
			score+=50;
			move_50_points.showGhost=false;
			window.clearInterval(interval_move_50);
		}else if(board[shape.i][shape.j]==12) {
			board[shape.i][shape.j] = clock_bonus_sec.sleep;
			time_elapsed = time_elapsed -5;
			//TODO: Notify user!!!
			clock_bonus_sec.showGhost=false;
		}else if(board[shape.i][shape.j]==13) {	
			//TODO: Notify user!!!
			board[shape.i][shape.j] = good_drug.sleep;
			lives+=1;
			good_drug.showGhost=false;
		}else if(board[shape.i][shape.j]==14) {//coca - ghost should move slow for 5 seconds
			//TODO: Notify user!!!
			board[shape.i][shape.j] = coca.sleep;
			coca.showGhost=false;
			window.clearInterval(interval_ghosts);
			interval_ghosts = setInterval(UpdatePositionGhosts,1150);
			good_drug.showGhost=false;
			board[good_drug.i][good_drug.j]=0;
			pac_color = "lime";
			board[coca.i][coca.j]=0;
			
			ghost_pink.image.src = "./photos/police_1.png";
			ghost_blue.image.src = "./photos/police_2.png";
			ghost_orange.image.src = "./photos/police_1.png";
			ghost_red.image.src = "./photos/police_2.png";
			setTimeout(function(){
					pac_color = "yellow";
					window.clearInterval(interval_ghosts);
					interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
					[good_drug.i][good_drug.j]=findRandomEmptyCell(board);
					board[good_drug.i][good_drug.j]=13;
					[coca.i][coca.j]=findRandomEmptyCell(board);
					board[coca.i][coca.j]=14;
					good_drug.showGhost=true;
					coca.showGhost=true;
					ghost_pink.image.src = "./photos/ghost_pink.png";
					ghost_blue.image.src = "./photos/ghost_blue.png";
					ghost_orange.image.src = "./photos/ghost_orange.png";
					ghost_red.image.src = "./photos/ghost_red.png";
			},10000);
		}else if (board[shape.i][shape.j] == 1 || board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 6) {
			ball_pick_sound.play();
			if (board[shape.i][shape.j] == 1) {//lime ball = 5 points
				score+=5;
			} else if (board[shape.i][shape.j] == 5) {//blue ball = 15 points
				score+=15;
			} else if (board[shape.i][shape.j] == 6) {//red ball = 25 points
				score+=25;
			}
		}else if (board[shape.i][shape.j]>=7 && board[shape.i][shape.j]<=10) {
			GoIntoGhost();
			return;
		}

		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		if (score >= 20 && time_elapsed >= 100) {
			pac_color = "fuchsia";
		}
		if (score == total_points) {
			End();
		} else {
			Draw();
		}
		

	}
}




function showAndHideDivs(currentScreen)
{

	var time_before;

	if (game_on) {
		paused = true;
		time_before = time_elapsed;
	}
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);
	
	switch(currentScreen)
	{
		case "welcome": // start mode
			$('#Welcome').show();
			$('#Register').hide();
			$('#Login').hide();
			$('#Settings').hide();
			$('#About').hide();
			$('#score').hide();
			$('#time').hide();
			$('#game').hide();
			$('#settings_side').hide();
			$('#footer').show();
			game_on = false;
			break;
		case "register": // start mode
			$('#Welcome').hide();
			$('#Register').show();
			$('#Login').hide();
			$('#Settings').hide();
			$('#About').hide();
			$('#score').hide();
			$('#time').hide();
			$('#game').hide();
			$('#settings_side').hide();
			$('#footer').show();
			game_on = false;
			break;
		case "login": // start mode
			$('#Welcome').hide();
			$('#Register').hide();
			$('#Login').show();
			$('#Settings').hide();
			$('#About').hide();
			$('#score').hide();
			$('#time').hide();
			$('#game').hide();
			$('#settings_side').hide();
			$('#footer').show();
			game_on = false;

			break;
		case "about": // start mode
			$('#Welcome').hide();
			$('#Register').hide();
			$('#Login').hide();
			$('#Settings').hide();
			$('#About').show();
			$('#score').hide();
			$('#time').hide();
			$('#game').hide();
			$('#settings_side').hide();
			$('#footer').show();

			break;

		case "settings": // start mode

			$('#Welcome').hide();
			$('#Register').hide();
			$('#Login').hide();
			$('#About').hide();
			$('#Settings').show();
			$('#score').hide();
			$('#time').hide();
			$('#game').hide();
			$('#settings_side').hide();
			$('#footer').show();
			game_on = false;
			
			break;

		case "game": // start mode

			$('#Welcome').hide();
			$('#Register').hide();
			$('#Login').hide();
			$('#About').hide();
			$('#Settings').hide();
			$('#score').show();
			$('#time').show();
			$('#game').show();
			$('#footer').hide();
			context = canvas.getContext("2d");
			life_context = life_canvas.getContext("2d");
			Start();
			break;
	}
	
	if (game_on) {
		interval = setInterval(UpdatePosition,interval_time);
		interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
		if(move_50_points.showGhost) {
			interval_move_50 = setInterval(UpdatePosition50PointsCharacter,interval_move_50_time);
		}
		time_elapsed = time_before;
		document.getElementById("game_time").innerHTML = time_elapsed;
		paused = false;
	}	


}


//ghosts
function UpdatePositionGhosts() {
	if (!paused && game_on) {
		if(ghost_pink.showGhost) {
			GhostStep(ghost_pink);
		}
		if(ghost_blue.showGhost) {
			GhostStep(ghost_blue);
		}
		if(ghost_orange.showGhost) {
			GhostStep(ghost_orange);
		}
		if(ghost_red.showGhost) {
			GhostStep(ghost_red);
		}
		if(clock_bonus_sec.showGhost) {// && Math.round(time_elapsed)%7==0) {
			board[clock_bonus_sec.i][clock_bonus_sec.j] = clock_bonus_sec.sleep;
			if (board[clock_bonus_sec.i][clock_bonus_sec.j] == 2) {
				// board[clock_bonus_sec.i][clock_bonus_sec.j] = clock_bonus_sec.sleep;
				clock_bonus_sec.showGhost=false;
				time_elapsed = time_elapsed -5;
				// board[clock_bonus_sec.i][clock_bonus_sec.j] = 0;
			} else if (Math.round(time_elapsed)%7==0){
				[clock_bonus_sec.i,clock_bonus_sec.j] = findRandomEmptyCell(board);
				board[clock_bonus_sec.i][clock_bonus_sec.j]=clock_bonus_sec.id;
			}
		}
		if(good_drug.showGhost) { //&& Math.round(time_elapsed)%13==0) {
			board[good_drug.i][good_drug.j] = good_drug.sleep;
			if (board[good_drug.i][good_drug.j] == 2) {
				good_drug.showGhost=false;
				lives+=1;
			} else if(Math.round(time_elapsed)%13==0){
				[good_drug.i,good_drug.j] = findRandomEmptyCell(board);
				board[good_drug.i][good_drug.j]=good_drug.id;
			}
		}
		if(coca.showGhost) { //&& Math.round(time_elapsed)%11==0) {
			board[coca.i][coca.j] = coca.sleep;
			if ((board[coca.i][coca.j] != 2) && (Math.round(time_elapsed)%11==0) ) {
				[coca.i,coca.j] = findRandomEmptyCell(board);				
			}
			board[coca.i][coca.j]=coca.id;
		}	
		Draw();
	}
}

function UpdatePosition50PointsCharacter(){
	if(move_50_points.showGhost && !paused && game_on) {
		board[move_50_points.i][move_50_points.j] = move_50_points.sleep;
		if (board[move_50_points.i][move_50_points.j] == 2) {
			move_50_points.showGhost=false;
			score = score +50;
			board[move_50_points.i][move_50_points.j] = 0;
		}else if (Math.round(food_remain)%7==0) {
			[move_50_points.i,move_50_points.j] = findRandomEmptyCell(board);
			board[move_50_points.i][move_50_points.j]=move_50_points.id;
		}
		 else if (shape.j > move_50_points.j && move_50_points.j >= 0 ) {
			if (board[move_50_points.i][move_50_points.j-1]!=4 && board[move_50_points.i][move_50_points.j-1]!=3 && board[move_50_points.i][move_50_points.j-1]<7) {//avoid collision
				move_50_points.j--;
			} else if (move_50_points.i < shape.i && move_50_points.i >0 ) {
				move_50_points.i--;
			} else {
				move_50_points.i++;
			}
		} else if (shape.j < move_50_points.j && move_50_points.j < board.length -1) {
			if (board[move_50_points.i][move_50_points.j+1]!=4 && board[move_50_points.i][move_50_points.j+1]!=3 && board[move_50_points.i][move_50_points.j+1]<7) {//avoid collision
				move_50_points.j++;
			} else if (move_50_points.i < shape.i && move_50_points.i >0 ) {
				move_50_points.i--;
			} else {
				move_50_points.i++;
			}
		} else if (shape.i < move_50_points.i && move_50_points.i < board.length -1) {
			if ( board[move_50_points.i-1][move_50_points.j]!=4 && board[move_50_points.i-1][move_50_points.j]!=3 && board[move_50_points.i-1][move_50_points.j]<7) {//avoid collision
				move_50_points.i++;
			} else if (move_50_points.j < shape.j && move_50_points.j < board.length -1 ) {
				move_50_points.j++;
			} else {
				move_50_points.j--;
			}
		} else {
			[move_50_points.i,move_50_points.j] = findRandomEmptyCell(board);
			board[move_50_points.i][move_50_points.j]=move_50_points.id;
		}
		Draw();
	}
}

function UpdatePositionClockBonus(){
	if(clock_bonus_sec.showGhost && !paused && game_on) {
		board[clock_bonus_sec.i][clock_bonus_sec.j] = clock_bonus_sec.sleep;
		if (board[clock_bonus_sec.i][clock_bonus_sec.j] == 2) {
			clock_bonus_sec.showGhost=false;
            time_elapsed = time_elapsed -5;			
			board[clock_bonus_sec.i][clock_bonus_sec.j] = 0;
		} else {
			[clock_bonus_sec.i,clock_bonus_sec.j] = findRandomEmptyCell(board);
			board[clock_bonus_sec.i][clock_bonus_sec.j]=clock_bonus_sec.id;
		}
		Draw();
	}
}

function GhostLocationReset() {//set ghost location to grid corners
	if (ghost_pink.showGhost==true) {
		board[ghost_pink.i][ghost_pink.j] == ghost_pink.sleep;
		ghost_pink.sleep = 0;
		ghost_pink.i=0;
		ghost_pink.j=0;
		board[0][0] = ghost_pink.id; 
	}
	if (ghost_blue.showGhost==true) {
		board[ghost_blue.i][ghost_blue.j] == ghost_blue.sleep;
		ghost_blue.sleep = 0;
		ghost_blue.i=9;
		ghost_blue.j=9;
		board[9][9] = ghost_blue.id; 
	}
	if (ghost_orange.showGhost==true) {
		board[ghost_orange.i][ghost_orange.j] == ghost_orange.sleep;
		ghost_orange.sleep = 0;
		ghost_orange.i=0;
		ghost_orange.j=9;
		board[0][9] = ghost_orange.id; 
	}
	if (ghost_red.showGhost==true) {
		board[ghost_red.i][ghost_red.j] == ghost_red.sleep;
		ghost_red.sleep = 0;
		ghost_red.i=9;
		ghost_red.j=0;
		board[9][0] = ghost_red.id; 
	}

}

function GhostStep(ghost) {
	if (!paused && game_on) {
		board[ghost.i][ghost.j]==ghost.sleep;
		if (board[ghost.i][ghost.j] == 2){
			GoIntoGhost();
		} else if (shape.i > ghost.i && ghost.i < board.length -1 ) {
			if (board[ghost.i+1][ghost.j]!=4 && board[ghost.i+1][ghost.j]!=3 && board[ghost.i+1][ghost.j]<7) {//avoid collision
				ghost.i++;
			} else if (ghost.j < shape.j && ghost.j < board.length -1 && board[ghost.i][ghost.j+1]!=3 && board[ghost.i][ghost.j+1]!=4) {
				ghost.j++;
			} else if (board[ghost.i][ghost.j-1]!=3 && board[ghost.i][ghost.j-1]!=4){
				ghost.j--;
			}
			board[ghost.i][ghost.j]==ghost.id;
		} else if (shape.i < ghost.i && ghost.i > 0) {
			if ( board[ghost.i-1][ghost.j]!=4 && board[ghost.i-1][ghost.j]!=3 && board[ghost.i-1][ghost.j]<7) {//avoid collision
				ghost.i--;
			} else if (ghost.j < shape.j && ghost.j < board.length -1 && board[ghost.i][ghost.j+1]!=3 && board[ghost.i][ghost.j+1]!=4) {
				ghost.j++;
			} else if(board[ghost.i][ghost.j-1]!=3){
				ghost.j--;
			}
			board[ghost.i][ghost.j]==ghost.id;
		} else if (shape.j>ghost.j && ghost.j < board.length -1) {
			if (board[ghost.i][ghost.j+1]!=4 && board[ghost.i][ghost.j+1]!=3 && board[ghost.i][ghost.j+1]<7) {//avoid collision
				ghost.j++;
			} else if (ghost.i < shape.i && ghost.i < board.length -1 && board[ghost.i+1][ghost.j]!=3 && board[ghost.i+1][ghost.j]!=4) {
				ghost.i++;
			} else if (board[ghost.i-1][ghost.j]!=3 && board[ghost.i-1][ghost.j]!=4){
				ghost.i--;
			}
			board[ghost.i][ghost.j]==ghost.id;
		} else if (shape.j < ghost.j && ghost.j >= 0 ) {
			if (board[ghost.i][ghost.j-1]!=4 && board[ghost.i][ghost.j-1]!=3 && board[ghost.i][ghost.j-1]<7) {//avoid collision
				ghost.j--;
			} else if (ghost.i < shape.i && ghost.i < board.length -1 && board[ghost.i+1][ghost.j]!=3 && board[ghost.i+1][ghost.j]!=4) {
				ghost.i++;
			} else if (board[ghost.i-1][ghost.j]!=3 && board[ghost.i-1][ghost.j]!=4) {
				ghost.i--;
			}
			board[ghost.i][ghost.j]==ghost.id;
		}
		// board[ghost.i][ghost.j]==ghost.id;

	}
}

function GoIntoGhost() {
	ghost_sound.play();
	total_points=total_points -10;
	score = score -10;
	lives--;
	if (lives==0) {
		End();
	}else {
		GhostLocationReset();
	}
	board[shape.i][shape.j]=0;
	[shape.i,shape.j] = findRandomEmptyCell(board);
	board[shape.i][shape.j] =2;
	Draw();
}

function UpdateSideSettingsMenuValues() {
	let up_key_move = document.getElementById("up").value;
	document.getElementById("up_key").innerHTML = "&#8593; :" + up_key_move;
	let right_key_move = document.getElementById("right").value;
	document.getElementById("right_key").innerHTML = "&#8594; :" + right_key_move;
	let down_key_move = document.getElementById("down").value;
	document.getElementById("down_key").innerHTML = "&#8595; :" + down_key_move;
	let left_key_move = document.getElementById("left").value;
	document.getElementById("left_key").innerHTML = "&#8592; :" + left_key_move;
	let balls_number_side = document.getElementById("balls").value;
	document.getElementById("balls_amount_side").innerHTML = "Number of balls : " + balls_number_side;
	let time_side_show = document.getElementById("game_time").value;
	document.getElementById("time_side").innerHTML = "Game time : "+time_side_show;
	let number_of_mons = document.getElementById("num_of_monsters").value;
	document.getElementById("monster_number_side").innerHTML = "Number of monsters : " + number_of_mons;
	$('#settings_side').show();

}

function End() {
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);
	var msg;
	if (score>=total_points) {
		msg = "WINNER ! \n SCORE : " + score.toString() +"\nTIME : " + time_elapsed.toString();
	} else if (time_elapsed>=game_timer_app.value) {
		if (lives==0) {
			msg="Loser !";
		} else if(score<100) {
			msg = "Yoy are better than " + score + " points !";
		} else {
			msg="Winner !";
		}
	}
	window.alert(msg);
	time_elapsed =0;
	score = 0;
	lives=5;
	showAndHideDivs("settings");
}


function ResetAllData(ask_user=true){
	paused = true;
	game_on = false;
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);	
	if (ask_user){
		ans =confirm("Are you sure yow want to start a new game ?"); 
	} else {
		ans = true;
	}
	if (ans == true) {
		food_remain = document.getElementById("balls_amount_side").value;
		total_points=food_remain*0.6*5+food_remain*0.3*15+food_remain*0.1*25;
		lives = 5;
		score=0;
		start_time = new Date();
		time_elapsed = 0;
		ghost_pink.showGhost =true;
		ghost_pink.sleep = 0;
		ghost_pink.i=0;
		ghost_pink.j=0;
		//blue
		ghost_blue.showGhost =true;
		ghost_blue.sleep = 0;
		ghost_blue.i=9;
		ghost_blue.j=9;
		//orange
		ghost_orange.showGhost =true;
		ghost_orange.sleep = 0;
		ghost_orange.i=0;
		ghost_orange.j=9;
		//red
		ghost_red.showGhost =true;
		ghost_red.sleep = 0;
		ghost_red.i=9;
		ghost_red.j=0;

		move_50_points.showGhost = true;
		move_50_points.sleep = 0;
		move_50_points.i=5;
		move_50_points.j=5;

		clock_bonus_sec.showGhost = true;
		clock_bonus_sec.sleep = 0;
		clock_bonus_sec.i=5;
		clock_bonus_sec.j=5;

		good_drug.showGhost = true;
		good_drug.sleep = 0;
		good_drug.i=7;
		good_drug.j=7;
		
                coca.showGhost = true;
                coca.sleep = 0;
                coca.i=1;
                coca.j=8;
		
		game_on = false;
		showAndHideDivs("settings");
	} else {
		interval = setInterval(UpdatePosition,interval_time);
		interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
		if(move_50_points.showGhost) {
			interval_move_50 = setInterval(UpdatePosition50PointsCharacter,interval_move_50_time);
		}
		paused = false;
		game_on = true;
	}
}


function Pause(){
	paused = true;
	game_on = false;
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);
	window.alert("OK OK we stooped !!!\nmeanhile we'll all sit and wait for you until you click \'OK\' ");
	interval = setInterval(UpdatePosition,interval_time);
	interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
	if(move_50_points.showGhost) {
		interval_move_50 = setInterval(UpdatePosition50PointsCharacter,interval_move_50_time);
	}
	paused = false;
	game_on = true;

}

function PauseAbout(){
	paused = true;
	game_on = false;
	var killId = setTimeout(function() {
		for (var i = killId; i > 0; i--) clearInterval(i)
	  }, 10);

	ans =confirm("Sure you want to read the \"About\" ? \n if you want to read the about, All data on this game will be deleted and you will have to start a new game"); 
	if (ans) {
		ResetAllData(false);
		$('#About').show();
        document.getElementById("dialog").showModal();
		
	} else {
		paused = false;
		game_on = true;
		interval = setInterval(UpdatePosition,interval_time);
		interval_ghosts = setInterval(UpdatePositionGhosts,interval_ghosts_time);
		if(move_50_points.showGhost) {
			interval_move_50 = setInterval(UpdatePosition50PointsCharacter,interval_move_50_time);
		}
	}
}


