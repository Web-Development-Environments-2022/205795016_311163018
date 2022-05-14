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


$(document).ready(function() {

	showAndHideDivs("welcome")

	//context = canvas.getContext("2d");
	//Start();
});


function Start() {
	board = new Array();
	score = 0;
	pac_color = "fuchsia";
	var cnt = 100;
	var food_remain = 50;
	//50*0.6=30 --> 5 points - lime --> board[i][j] = 1;
	var lime_balls = Math.round(food_remain*0.6);
	//50*0.3=15 --> 15 p - blue --> board[i][j] = 5;
	var blue_balls = Math.round(food_remain*0.3);
	//50*0.1 = 5 --> 25 p - red --> board[i][j] = 6;
	var red_balls = Math.round(food_remain*0.1);
	//in case of not integer
	while (lime_balls+blue_balls+red_balls !=food_remain) {
		if (lime_balls+blue_balls+red_balls <food_remain) {
			lime_balls++;
		} else {
			lime_balls--;
		}
	}
	total_points = lime_balls*5 + blue_balls*15 + red_balls*25;

	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					if (lime_balls>0 && blue_balls>0 && red_balls>0) {
						rnd_ball = Math.floor(Math.random()*3)//0=lime_ball(5 pt),1=blue ball(15 pt),2=red ball(25pt)
						if (rnd_ball==0) {
							lime_balls--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							blue_balls--;
							board[i][j]=5;
						} else {
							red_balls--;
							board[i][j]=6;
						}
					} else if (lime_balls>0 && blue_balls>0) {
						rnd_ball = Math.floor(Math.random()*2)//0=lime_ball(5 pt),1=blue ball(15 pt)
						if (rnd_ball==0) {
							lime_balls--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							blue_balls--;
							board[i][j]=5;
						}
					} else if (lime_balls>0 && red_balls>0) {
						rnd_ball = Math.floor(Math.random()*2)//0=lime_ball(5 pt),1=red ball(25pt)
						if (rnd_ball==0) {
							lime_balls--;
							board[i][j] = 1;
						} else if (rnd_ball==1) {
							red_balls--;
							board[i][j]=6;
						}
					} else if (blue_balls>0 && red_balls>0) {
						rnd_ball = Math.floor(Math.random()*3)//0=blue ball(15 pt),1=red ball(25pt)
						if (rnd_ball==0) {
							blue_balls--;
							board[i][j] = 5;
						} else if (rnd_ball==1) {
							red_balls--;
							board[i][j]=6;
						}						
					} else if(lime_balls>0) {
						lime_balls--;
						board[i][j] = 1;						
					} else if(blue_balls>0) {
						blue_balls--;
						board[i][j] = 5;						
					} else {
						red_balls--;
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
	interval = setInterval(UpdatePosition, 250);
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
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
			} else if (board[i][j] == 1) {
				//lime ball
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = "lime"; //color
				context.fill();
				context.font="30px Arial";
				context.textAlign = "center";
				context.strokeStyle = "black"; //pts color
				context.strokeText("5",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 5) {
				//"blue ball
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color
				context.fill();	
				context.font="30px Arial";
				context.textAlign = "center";
				context.strokeStyle = "white"; //pts color
				context.strokeText("15",center.x,center.y);
				context.stroke();
			} else if (board[i][j] == 6) {
				//red ball
				context.beginPath();
				context.arc(center.x, center.y, (canvas.width)/30, 0, 2 * Math.PI); // circle
				context.fillStyle = "red"; //color
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
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {//up
			shape.j--;
			eye_x = 12;
			eye_y = 4;
			start_angle = -Math.PI/2;
			end_angle = -Math.PI/2;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {//down
			shape.j++;
			eye_x = -12;
			eye_y = -4;			
			start_angle = Math.PI/2;
			end_angle = Math.PI/2;			
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {//left
			shape.i--;
			eye_x = -5;
			eye_y = 14;
			start_angle = Math.PI;
			end_angle = Math.PI;			
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {//right
			shape.i++;
			eye_x = 5;
			eye_y = 14;			
			start_angle = 0;
			end_angle = 0;			
		}
	}
	if (board[shape.i][shape.j] == 1) {//lime ball = 5 points
		score+=5;
	} else if (board[shape.i][shape.j] == 5) {//blue ball = 15 points
		score+=15;
	} else if (board[shape.i][shape.j] == 6) {//red ball = 25 points
		score+=25;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "fuchsia";
	}
	if (score == total_points) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
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



