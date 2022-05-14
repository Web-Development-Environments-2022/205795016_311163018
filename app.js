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



$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function ConfigureGame() {
	
	food_remain = 50;//TODO : update this with element ID from index.html
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

	GhostAmount = 1;// TODO: update this after marge with element id
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
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "fuchsia";
	var cnt = 100;
	// img = document.getElementById("right");

	var pacman_remain = 1;
	start_time = new Date();
	// ConfigureGame();
	food_remain = 50;//TODO : update this with element ID from index.html
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

	GhostAmount = 2;// TODO: update this after marge with element id
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
				//TODO: add more ghosts with else if...blabla
			}else if (i==ghost_blue.i && j==ghost_blue.j && ghost_blue.showGhost==true) {
				board[9][9] = ghost_blue.id;
				ghost_blue.i=9;
				ghost_blue.j=9;
				//TODO: add more ghosts with else if...blabla
			}else if (i==ghost_orange.i && j==ghost_orange.j && ghost_orange.showGhost==true) {
				board[0][9] = ghost_orange.id;
				ghost_orange.i=0;
				ghost_orange.j=9;
				//TODO: add more ghosts with else if...blabla
			}else if (i==ghost_red.i && j==ghost_red.j && ghost_red.showGhost==true) {
				board[9][0] = ghost_red.id;
				ghost_red.i=9;
				ghost_red.j=0;
				//TODO: add more ghosts with else if...blabla
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

	interval = setInterval(UpdatePosition,120);
	interval_ghosts = setInterval(UpdatePositionGhosts,400);
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
				// context.arc(center.x, center.y, (canvas.width)/20, 0.15 * Math.PI + start_angle, 1.85 * Math.PI +end_angle); // half circle
				// context.lineTo(center.x, center.y);
				// context.fillStyle = pac_color; //color
				// context.fill();
				// context.beginPath();
				// context.arc(center.x + eye_x, center.y - eye_y, 5, 0, 2 * Math.PI); // circle
				// context.fillStyle = "black"; //color
				// context.fill();
				context.drawImage(img,center.x,center.y,(canvas.width)/15, (canvas.width)/15);
			//ghosts
			} else if (i==ghost_pink.i && j==ghost_pink.j && ghost_pink.showGhost==true) {
				context.drawImage(ghost_pink.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_blue.i && j==ghost_blue.j && ghost_blue.showGhost==true) {
				context.drawImage(ghost_blue.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_orange.i && j==ghost_orange.j && ghost_orange.showGhost==true) {
				context.drawImage(ghost_orange.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
			}else if (i==ghost_orange.i && j==ghost_orange.j && ghost_orange.showGhost==true) {
				context.drawImage(ghost_orange.image,center.x - (width_cell/2) +2 ,center.y - (height_cell/2)+2,width_cell,height_cell);
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
			img.src = "\\photos\\up.jpg"
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
			img.src = "\\photos\\down.jpg"
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
			img.src = "\\photos\\left.jpg"
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
			img.src = "\\photos\\right_circle.png"
			//img = document.getElementById("right");
		}
	}
	if (board[shape.i][shape.j] == 1) {//lime ball = 5 points
		score+=5;
	} else if (board[shape.i][shape.j] == 5) {//blue ball = 15 points
		score+=15;
	} else if (board[shape.i][shape.j] == 6) {//red ball = 25 points
		score+=25;
	} else if (board[shape.i][shape.j]>=7 && board[shape.i][board.shape.j]<=11) {
		GoIntoGhost();
	}

	console.log(shape.i,shape.j);
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "fuchsia";
	}
	if (score == total_points) {
		window.clearInterval(interval);
		window.clearInterval(interval_ghosts);
		window.alert("Game completed");
	} else {
		Draw();
	}
}




// this function changes the div that we want to see on click.
// need to add the canvas to this function
function show(shown,hidden1,hidden2,hidden3) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden1).style.display='none';
  document.getElementById(hidden2).style.display='none';
  document.getElementById(hidden3).style.display='none';
  document.getElementById("score").style.display='none';
  document.getElementById("time").style.display='none';
  document.getElementById("game").style.display='none';

  return false;
}



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
	Draw();
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
	//TODO
	GhostLocationReset();
}

