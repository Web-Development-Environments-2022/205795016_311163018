var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var start_angle = 0;
var end_angle =0;
var eye_x = 5;
var eye_y =15;
var total_points =50;
var food_remain;

var img = new Image();
img.src = "\\photos\\right_circle.png"
// var img = document.getElementById("right");
var avatar_style;

//cell size
var height_cell = 60;
var width_cell = 60;


//ghosts
var GhostAmount=1;
var interval_ghosts;
//pink
var ghost_pink = new Object();
ghost_pink.image = new Image(width_cell-4,height_cell-4);
ghost_pink.image.src = "\\photos\\ghost_pink.jpg";
ghost_pink.id=7;
ghost_pink.showGhost =true;
ghost_pink.sleep = 0;
ghost_pink.i=0;
ghost_pink.j=0;
//blue
var ghost_blue = new Object();
ghost_blue.image = new Image(width_cell-4,height_cell-4);
ghost_blue.image.src = "\\photos\\ghost_blue.jpg";
ghost_blue.id=8;
ghost_blue.showGhost =true;
ghost_blue.sleep = 0;
ghost_blue.i=9;
ghost_blue.j=9;
//orange
var ghost_orange = new Object();
ghost_orange.image = new Image(width_cell-4,height_cell-4);
ghost_orange.image.src = "\\photos\\ghost_orange.jpg";
ghost_orange.id=9;
ghost_orange.showGhost =true;
ghost_orange.sleep = 0;
ghost_orange.i=0;
ghost_orange.j=9;
//red
var ghost_red = new Object();
ghost_red.image = new Image(width_cell-4,height_cell-4);
ghost_red.image.src = "\\photos\\ghost_red.jpg";
ghost_red.id=10;
ghost_red.showGhost =true;
ghost_red.sleep = 0;
ghost_red.i=9;
ghost_red.j=0;


var interval_move_50;
//50 points moving (cherry image)
var move_50_points = new Object();
move_50_points.image = new Image(width_cell,height_cell);
move_50_points.image.src = "\\photos\\cherry.png";
move_50_points.id=11;
move_50_points.showGhost = true;
move_50_points.sleep = 0;
move_50_points.i=5;
move_50_points.j=5;


var interval_clock;
//5 sec clock_bonus (clock_bonus image)
var clock_bonus_sec = new Object();
clock_bonus_sec.image = new Image(width_cell,height_cell);
clock_bonus_sec.image.src = "\\photos\\clock_image.png";
clock_bonus_sec.id=12;
clock_bonus_sec.showGhost = true;
clock_bonus_sec.sleep = 0;
clock_bonus_sec.i=5;
clock_bonus_sec.j=5;

//good drug = add live to user
var good_drug = new Object();
good_drug.image = new Image(width_cell,height_cell);
good_drug.image.src = "\\photos\\good_drug.png";
good_drug.id=13;
good_drug.showGhost = true;
good_drug.sleep = 0;
good_drug.i=7;
good_drug.j=7;

//lives
var lives=5;
var life_context;
var life = new Object();
life.image = new Image(width_cell,height_cell);
life.image.src = "\\photos\\life.png";
//var life_canvas = document.getElementById("life_canvas");

//sounds
var ghost_sound = new Audio("\\sound\\ghost_sound.mp3");
var ball_pick_sound=new Audio("\\sound\\ball_pick.mp3");

$(document).ready(function() {

	showAndHideDivs("welcome")

	//context = canvas.getContext("2d");
	//Start();
});


function Start(restart=false) {
	game_timer_app = document.getElementById("game_time");
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	// img = document.getElementById("right");

	var pacman_remain = 1;
	start_time = new Date();
	// ConfigureGame();
	//food_remain = 50;//TODO : update this with element ID from index.html
	food_remain = document.getElementById("balls").value;
	if (food_remain>=80) {
		food_remain =80;
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

	GhostAmount = 2;// TODO: update this after marge with element id
	GhostAmount = document.getElementById("num_of_monsters").value;// TODO: update this after marge with element id
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
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (//walls
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
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

	interval = setInterval(UpdatePosition,200);
	interval_ghosts = setInterval(UpdatePositionGhosts,415);
	interval_move_50 = setInterval(UpdatePosition50PointsCharacter,1001);
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
			} else if (board[i][j] == 1) {
				//lime ball
				let ball_5_color = document.getElementById("5_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_5_color; //color
				context.fill();
				context.font="30px Arial";
				context.textAlign = "center";
				context.strokeStyle = "black"; //pts color
				context.strokeText("5",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 5) {
				//"blue ball
				let ball_15_color = document.getElementById("15_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_15_color; //color
				context.fill();	
				context.font="30px Arial";
				context.textAlign = "center";
				context.strokeStyle = "white"; //pts color
				context.strokeText("15",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 6) {
				//red ball
				let ball_25_color = document.getElementById("25_points").value
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = ball_25_color; //color
				context.fill();
				context.font="30px Arial";
				context.textAlign = "center";
				context.strokeStyle = "white"; //pts color
				context.strokeText("25",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 4) {
				//walls
				//the original part was :
				// context.beginPath();
				// context.rect(center.x - (canvas.width)/20, center.y - (canvas.width)/20, (canvas.width)/10, (canvas.width)/10);
				// context.fillStyle = "grey"; //color
				// context.fill();
				//
				context.beginPath();
				context.rect(center.x - (canvas.width)/20, center.y - (canvas.width)/20, (canvas.width)/10, (canvas.width)/20);
				context.fillStyle = "grey"; //color
				context.fill();
				context.beginPath();
				context.rect(center.x - (canvas.width)/20, center.y, (canvas.width)/10, (canvas.width)/20);
				context.fillStyle = "darkorange"; //color
				context.fill();
				context.beginPath();
				context.rect(center.x - (canvas.width)/20, center.y - (canvas.width)/20, (canvas.width)/10, (canvas.width)/10);
				context.strokeStyle = "black"; //color
				context.stroke();
			}
		}
	}
}

function UpdatePosition() {
	if (time_elapsed>= game_timer_app.value) {
		End();
	}else {
		board[shape.i][shape.j] = 0;
		var x = GetKeyPressed();
		if (x == 1) {
			if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {//up
				shape.j--;
				eye_x = 12;
				eye_y = 4;
				start_angle = -Math.PI/2;
				end_angle = -Math.PI/2;
				//img.src = "\\photos\\up.jpg"
				//img = document.getElementById("up");
				//ctx.drawImage(img, 10, 10);
			}
		}
		if (x == 2) {
			if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {//down
				shape.j++;
				eye_x = -12;
				eye_y = -4;			
				start_angle = Math.PI/2;
				end_angle = Math.PI/2;
				//img.src = "\\photos\\down.jpg"
				//img = document.getElementById("down");			
			}
		}
		if (x == 3) {
			if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {//left
				shape.i--;
				eye_x = -5;
				eye_y = 14;
				start_angle = Math.PI;
				end_angle = Math.PI;
				//img.src = "\\photos\\left.jpg"
				//img = document.getElementById("left");
			}
		}
		if (x == 4) {
			if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {//right
				shape.i++;
				eye_x = 5;
				eye_y = 14;			
				start_angle = 0;
				end_angle = 0;
				//img.src = "\\photos\\right_circle.png"
				//img = document.getElementById("right");
			}
		}
		if(board[shape.i][shape.j]==11) {
			//TODO: Notify user!!!
			score+=50;
			move_50_points.showGhost=false;
			window.clearInterval(interval_move_50);
		}else if(board[shape.i][shape.j]==12) {
			time_elapsed = time_elapsed -5;
			//TODO: Notify user!!!
			clock_bonus_sec.showGhost=false;
			//window.clearInterval(interval_clock);
		}else if(board[shape.i][shape.j]==13) {	
					//TODO: Notify user!!!
			lives+=1;
			good_drug.showGhost=false;
		}else if (board[shape.i][shape.j] == 1 || board[shape.i][shape.j] == 5 || board[shape.i][shape.j] == 6) {
			ball_pick_sound.play();
			if (board[shape.i][shape.j] == 1) {//lime ball = 5 points
				score+=5;
			} else if (board[shape.i][shape.j] == 5) {//blue ball = 15 points
				score+=15;
			} else if (board[shape.i][shape.j] == 6) {//red ball = 25 points
				score+=25;
			}
		} else if (board[shape.i][shape.j]>=7 && board[shape.i][board.shape.j]<=10) {
			GoIntoGhost();
		}
	
	
		board[shape.i][shape.j] = 2;
		var currentTime = new Date();
		time_elapsed = (currentTime - start_time) / 1000;
		if (score >= 20 && time_elapsed >= 100) {
			pac_color = "fuchsia";
		}
		if (score == total_points) {
			End();
			// window.clearInterval(interval);
			// window.clearInterval(interval_ghosts);
			// window.alert("Game completed");
		} else {
			Draw();
		}

	}
}




function showAndHideDivs(currentScreen)
{

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
			break;

		case "game": // start mode

			$('#Welcome').hide();
			$('#Register').hide();
			$('#Login').hide();
			$('#About').hide();
			$('#Settings').show();
			$('#score').show();
			$('#time').show();
			$('#game').show();
			context = canvas.getContext("2d");
			life_context = life_canvas.getContext("2d");
			Start();
			break;
	}





}
// this function changes the div that we want to see on click.
// need to add the canvas to this function
// function show1(shown,hidden1,hidden2,hidden3) {
// 	$('#Welcome').show();
// 	$('#Register').hide();
// 	$('#Login').hide();
// 	$('#About').hide();
// 	$('#game_screen').hide();
// 	$('#Settings').hide();
// 	$('#score').hide();
// 	$('#time').hide();
// 	$('#game').hide();


//   return false;
// }
// function show2(shown,hidden1,hidden2,hidden3) {
// 	$('#Welcome').hide();
// 	$('#Register').show();
// 	$('#Login').hide();
// 	$('#About').hide();
// 	$('#game_screen').hide();
// 	$('#Settings').hide();
// 	$('#score').hide();
// 	$('#time').hide();
// 	$('#game').hide();

//   return false;
// }
// function show3(shown,hidden1,hidden2,hidden3) {
// 	$('#Welcome').hide();
// 	$('#Register').hide();
// 	$('#Login').show();
// 	$('#About').hide();
// 	$('#game_screen').hide();
// 	$('#Settings').hide();
// 	$('#score').hide();
// 	$('#time').hide();
// 	$('#game').hide();

//   return false;
// }
// function show4(shown,hidden1,hidden2,hidden3) {
// 	$('#Welcome').hide();
// 	$('#Register').hide();
// 	$('#Login').hide();
// 	$('#About').show();
// 	$('#game_screen').hide();
// 	$('#Settings').hide();
// 	$('#score').hide();
// 	$('#time').hide();
// 	$('#game').hide();

//   return false;
// }



//ghosts
function UpdatePositionGhosts() {
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
	if(clock_bonus_sec.showGhost && Math.round(time_elapsed)%7==0) {
		board[clock_bonus_sec.i][clock_bonus_sec.j] = clock_bonus_sec.sleep;
		if (board[clock_bonus_sec.i][clock_bonus_sec.j] == 2) {
			clock_bonus_sec.showGhost=false;
			score = score +50;
			board[clock_bonus_sec.i][clock_bonus_sec.j] = 0;
		} else {
			[clock_bonus_sec.i,clock_bonus_sec.j] = findRandomEmptyCell(board);
			board[clock_bonus_sec.i][clock_bonus_sec.j]=clock_bonus_sec.id;
		}
	}
	if(good_drug.showGhost && Math.round(time_elapsed)%13==0) {
		board[good_drug.i][good_drug.j] = good_drug.sleep;
		if (board[good_drug.i][good_drug.j] == 2) {
			good_drug.showGhost=false;
			lives+=1;
			board[good_drug.i][good_drug.j] = 0;
		} else {
			[good_drug.i,good_drug.j] = findRandomEmptyCell(board);
			board[good_drug.i][good_drug.j]=good_drug.id;
		}
	}
	Draw();
}

function UpdatePosition50PointsCharacter(){
	if(move_50_points.showGhost) {
		board[move_50_points.i][move_50_points.j] = move_50_points.sleep;
		if (board[move_50_points.i][move_50_points.j] == 2) {
			move_50_points.showGhost=false;
			score = score +50;
			board[move_50_points.i][move_50_points.j] = 0;
			// window.clearInterval(interval_move_50);
		}else if (Math.round(food_remain)%7==0) {
			[move_50_points.i,move_50_points.j] = findRandomEmptyCell(board);
			board[move_50_points.i][move_50_points.j]=move_50_points.id;
		}
		 else if (shape.j > move_50_points.j && move_50_points.j >= 0 ) {
			if (board[move_50_points.i][move_50_points.j-1]!=4 && board[move_50_points.i][move_50_points.j-1]<7) {//avoid collision
				move_50_points.j--;
			} else if (move_50_points.i < shape.i && move_50_points.i >0 ) {
				move_50_points.i--;
			} else {
				move_50_points.i++;
			}
		} else if (shape.j < move_50_points.j && move_50_points.j < board.length -1) {
			if (board[move_50_points.i][move_50_points.j+1]!=4 && board[move_50_points.i][move_50_points.j+1]<7) {//avoid collision
				move_50_points.j++;
			} else if (move_50_points.i < shape.i && move_50_points.i >0 ) {
				move_50_points.i--;
			} else {
				move_50_points.i++;
			}
		} else if (shape.i < move_50_points.i && move_50_points.i < board.length -1) {
			if ( board[move_50_points.i-1][move_50_points.j]!=4 && board[move_50_points.i-1][move_50_points.j]<7) {//avoid collision
				move_50_points.i++;
			} else if (move_50_points.j < shape.j && move_50_points.j < board.length -1 ) {
				move_50_points.j++;
			} else {
				move_50_points.j--;
			}
		// }else {
		// 	if (board[move_50_points.i+1][move_50_points.j]!=4 && board[move_50_points.i+1][move_50_points.j]<7) {//avoid collision
		// 		move_50_points.i++;
		// 	} else if (move_50_points.j < shape.j && move_50_points.j < board.length -1 ) {
		// 		move_50_points.j++;
		// 	} else {
		// 		move_50_points.j--;
		// 	}
		// }
		} else {
			[move_50_points.i,move_50_points.j] = findRandomEmptyCell(board);
			board[move_50_points.i][move_50_points.j]=move_50_points.id;
		}
		Draw();
	}
}

function UpdatePositionClockBonus(){
	if(clock_bonus_sec.showGhost) {
		board[clock_bonus_sec.i][clock_bonus_sec.j] = clock_bonus_sec.sleep;
		if (board[clock_bonus_sec.i][clock_bonus_sec.j] == 2) {
			clock_bonus_sec.showGhost=false;
			score = score +50;
			board[clock_bonus_sec.i][clock_bonus_sec.j] = 0;
			// window.clearInterval(interval_move_50);
		// } else if (shape.j < clock_bonus_sec.j && clock_bonus_sec.j >= 0 ) {
		// 	if (board[clock_bonus_sec.i][clock_bonus_sec.j-1]!=4 && board[clock_bonus_sec.i][clock_bonus_sec.j-1]<7) {//avoid collision
		// 		clock_bonus_sec.j--;
		// 	} else if (clock_bonus_sec.i < shape.i && clock_bonus_sec.i < board.length -1 ) {
		// 		clock_bonus_sec.i++;
		// 	} else {
		// 		clock_bonus_sec.i--;
		// 	}
		// } else if (shape.j>clock_bonus_sec.j && clock_bonus_sec.j < board.length -1) {
		// 	if (board[clock_bonus_sec.i][clock_bonus_sec.j+1]!=4 && board[clock_bonus_sec.i][clock_bonus_sec.j+1]<7) {//avoid collision
		// 		clock_bonus_sec.j++;
		// 	} else if (clock_bonus_sec.i < shape.i && clock_bonus_sec.i < board.length -1 ) {
		// 		clock_bonus_sec.i++;
		// 	} else {
		// 		clock_bonus_sec.i--;
		// 	}
		// } else if (shape.i < clock_bonus_sec.i && clock_bonus_sec.i > 0) {
		// 	if ( board[clock_bonus_sec.i-1][clock_bonus_sec.j]!=4 && board[clock_bonus_sec.i-1][clock_bonus_sec.j]<7) {//avoid collision
		// 		clock_bonus_sec.i--;
		// 	} else if (clock_bonus_sec.j < shape.j && clock_bonus_sec.j < board.length -1 ) {
		// 		clock_bonus_sec.j++;
		// 	} else {
		// 		clock_bonus_sec.j--;
		// 	}
		// }else {
		// 	if (board[clock_bonus_sec.i+1][clock_bonus_sec.j]!=4 && board[clock_bonus_sec.i+1][clock_bonus_sec.j]<7) {//avoid collision
		// 		clock_bonus_sec.i++;
		// 	} else if (clock_bonus_sec.j < shape.j && clock_bonus_sec.j < board.length -1 ) {
		// 		clock_bonus_sec.j++;
		// 	} else {
		// 		clock_bonus_sec.j--;
		// 	}
		// }
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
	board[ghost.i][ghost.j]==ghost.sleep;
	if (board[ghost.i][ghost.j] == 2){
		GoIntoGhost();
	} else if (shape.i > ghost.i && ghost.i < board.length -1 ) {
		if (board[ghost.i+1][ghost.j]!=4 && board[ghost.i+1][ghost.j]<7) {//avoid collision
			ghost.i++;
		} else if (ghost.j < shape.j && ghost.j < board.length -1 ) {
			ghost.j++;
		} else {
			ghost.j--;
		}
	} else if (shape.i < ghost.i && ghost.i > 0) {
		if ( board[ghost.i-1][ghost.j]!=4 && board[ghost.i-1][ghost.j]<7) {//avoid collision
			ghost.i--;
		} else if (ghost.j < shape.j && ghost.j < board.length -1 ) {
			ghost.j++;
		} else {
			ghost.j--;
		}
	} else if (shape.j>ghost.j && ghost.j < board.length -1) {
		if (board[ghost.i][ghost.j+1]!=4 && board[ghost.i][ghost.j+1]<7) {//avoid collision
			ghost.j++;
		} else if (ghost.i < shape.i && ghost.i < board.length -1 ) {
			ghost.i++;
		} else {
			ghost.i--;
		}
	} else if (shape.j < ghost.j && ghost.j >= 0 ) {
		if (board[ghost.i][ghost.j-1]!=4 && board[ghost.i][ghost.j-1]<7) {//avoid collision
			ghost.j--;
		} else if (ghost.i < shape.i && ghost.i < board.length -1 ) {
			ghost.i++;
		} else {
			ghost.i--;
		}
	}
	board[ghost.i][ghost.j]==ghost.id;
}

function GoIntoGhost() {
	ghost_sound.play();
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

function End() {
	window.clearInterval(interval);
	window.clearInterval(interval_ghosts);
	if(move_50_points.show) {
		move_50_points.show=false;
		window.clearInterval(interval_move_50);
	}
	if(clock_bonus_sec.show) {
		clock_bonus_sec.show=false;
		//window.clearInterval(interval_move_50);
	}
	var msg;
	if (time_elapsed>=game_timer_app.value) {
		if (lives==0) {
			msg="Loser !";
		} else if(score<100) {
			msg = "Yoy are better than " + score + " points !";
		} else {
			msg="Winner !";
		}
	} else {
		if (score>=total_points) {
			msg = "WINNER ! \n SCORE : " + score.toString() +"\nTIME : " + time_elapsed.toString();
		} else {
			msg = "Game Over ! \nYOU LOSE ! \nSCORE : " + score.toString() +"\nTIME : " + time_elapsed.toString();
		}
	}
	window.alert(msg);
	time_elapsed =0;
	score = 0;
	lives=5;
	showAndHideDivs("settings");
}

