
var users = {}
var controls = {}
users["k"] == "k"
var KEY = {
    BACKSPACE: 8,
    TAB:       9,
    RETURN:   13,
    ESC:      27,
    SPACE:    32,
    PAGEUP:   33,
    PAGEDOWN: 34,
    END:      35,
    HOME:     36,
    LEFT:     37,
    UP:       38,
    RIGHT:    39,
    DOWN:     40,
    INSERT:   45,
    DELETE:   46,
    ZERO:     48, ONE: 49, TWO: 50, THREE: 51, FOUR: 52, FIVE: 53, SIX: 54, SEVEN: 55, EIGHT: 56, NINE: 57,
    A:        65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
    a:        65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90,
    TILDA:    192,
    left:     37,
    up:       38,
    right:    39,
    down:     40
    
  };



function register101() {

    let user_name = $('#User_Name').val()
    let password = $('#pwd').val()
    let pwd_confirm = $('#confirm').val()
    let full_name = $('#name').val()
    let email = $('#email').val()
    let birthday = $('#birthday').val()
    
    if (user_name == "" || password == "" ||pwd_confirm == ""||full_name == "" || email == "" || birthday== "") {
        return
    }
    if(user_name in users){
        window.alert("User name is taken, please change user name.")
        return
    }

    users[user_name] = password
    window.alert("Congrats you registred sucessfully")
    showAndHideDivs("login")
}

// function register(){
//     let user_name = $('#User_Name').val()
//     let password = $('#pwd').val()
//     let pwd_confirm = $('#confirm').val()
//     let full_name = $('#name').val()
//     let email = $('#email').val()
//     let birthday = $('#birthday').val()

//     if(user_name in users){
//         window.alert("User name is taken, please change user name.")
//         return
//     }

//     if (password.length < 6){
//         window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
//         return
//     }
//     else if(password.search(/[a-zA-Z]/) == -1){
//         window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
//         return
//     }
//     else if(password.search(/\d/) == -1){
//         window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
//         return
//     }

//     if (pwd_confirm != password){
//         window.alert("dude..WTF you entered two different password..stop with the weed.")
//         return
//     }

//     if (full_name.search(/\d/ )!= -1){
//         window.alert("You are not a robot there is no reason for you to have a number in your name.")
//         return
//     }

//     let is_it = ValidateEmail(email)
//     if (!is_it){
//         window.alert("You have entered an invalid email address!")
//         return
//     }

//     users[user_name] = password
//     window.alert("Congrats you registred sucessfully")
//     showAndHideDivs("login")
//     //show('Login','Register' ,'Welcome','About')
// }


// function ValidateEmail(mail) {
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
//     return (true)
//     }
//     return (false)
// }

function login() {

    users["k"] = "k"
    let user_name = $('#User_Name_login').val()
    let password = $('#pwd_login').val()

    if (user_name in users) {
        // checking if the password is correct
        if (users[user_name] == password){
            window.alert("Welcome back and enjoy the game.")
            showAndHideDivs("settings")
            //showsettings()
            //showgame()
            return
            //TODO change to setting and then to game screen

        }
        // worng password
        else{
            window.alert("worng password")
            return
        }
    }
    else{
        window.alert("The user name dosent exist in the system, please try again.")

    }
}


function default_controls(){
    controls = {'up':38, 'down':40, 'right':39, 'left':37}
    $('#up').val("up")
	$('#down').val("down")
	$('#right').val("right")
	$('#left').val("left")
}


function random_opt(){
    $('#balls').val(Math.floor((Math.random()*41)+50))
    $('#game_time').val(Math.floor((Math.random()*150)+60))
    $('#num_of_monsters').val(Math.floor((Math.random()*4)+ 1))
}


// function myKeyPress(e , key){
//     var keynum
//     if(window.event){
//         keynum = e.keyCode;
//     }

//     switch(key){
//         case('up'):
// 			//wantedKey = $('#moveup')
// 			controls["up"] = keynum
// 			break;
// 		case('down'):
// 			//wantedKey = $('#movedown')
// 			controls['down'] = keynum
// 			break;
// 		case('right'):
// 			//wantedKey = $('#moveright')
// 			controls['right'] = keynum
// 			break;
// 		case('left'):
// 			//wantedKey = $('#moveleft')
// 			controls['left'] = keynum
// 			break;
//     }

// }



function check_settings(){
    //let up = $('#up').val()
    let up = document.getElementById("up").value
	let down = document.getElementById("down").value
	let right = document.getElementById("right").value
	let left = document.getElementById("left").value
    //window.alert(KEY[up])
    
    let balls_num = document.getElementById("balls")
    //let game_timer = $('game_time').val()
    let game_timer = document.getElementById("game_time")

    //let monsters_num = $('num_of_monsters').val()
    let monsters_num = document.getElementById("num_of_monsters")


    // let ball_5 = document.getElementById("5_points").value

    // window.alert(ball_5)



    if ((up == '') || (down == '') || (right == '') || (left == '') || (balls_num.value == '') || (game_timer.value == '')|| (monsters_num.value =='')){
        window.alert("Please fill all the value to start the game.")
        return
    }

    let moving_keys = new Set([up, down, right, left]);
	if (moving_keys.size != 4){
		window.alert('Identical keys error - You configured 2 or more different movements with the same keys, please choose a different key for every different move')
		return
	}

    if (balls_num.value < 50 || balls_num.value > 90){
        window.alert("Please choose a number between 50 and 90 for number of balls.")
        return
    }

    if (game_timer.value < 60){
        window.alert("minimum game time is 60 seconds. Please Choose an higher number.")
        return
    }

    if (monsters_num.value < 1 || monsters_num.value > 4){
        window.alert("Please choose a number between 1 and 4 for number of monsters.")
        return
    }


    setControls(up , down, right, left)


    showAndHideDivs("game")
    //showgame()
}



function setControls(u , d ,r ,l){
    controls = {'up':KEY[u], 'down':KEY[d], 'right':KEY[r], 'left':KEY[l]}
    return
}


// window.addEventListener('load', setup);

// const get = document.getElementById.bind(document);
// const query = document.querySelector.bind(document);
// let modalRoot = get('modal-root');
// let button = get('modal-opener');
// let modal = query('.modal');


// function setup() {
  
//   let modalRoot = get('modal-root');
//   let button = get('modal-opener');
//   let modal = query('.modal');
  
//   modalRoot.addEventListener('click', rootClick);
//   button.addEventListener('click', openModal);
//   modal.addEventListener('click', modalClick);
  
//   function rootClick() {
//     modalRoot.classList.remove('visible');
//   }
  
//   function openModal() {
//     modalRoot.classList.add('visible');
//   }
  
//   function modalClick(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     e.stopImmediatePropagation();
//     return false;
//   }
  
// }


function openAbout() {
    if (game_on){
        PauseAbout();
    } else {
        $('#About').show();
        document.getElementById("dialog").showModal();
    }
}

function closeAbout() {
	document.getElementById("dialog").close();
}

function showsettings(){

    $('#Welcome').hide();
	$('#Register').hide();
	$('#Login').hide();
	$('#About').hide();
	$('#game_screen').hide();
	$('#Settings').show();
	$('#score').hide();
	$('#time').hide();
	$('#game').hide();

    // document.getElementById("Settings").style.display='block';
    // document.getElementById("score").style.display='none';
    // document.getElementById("time").style.display='none';
    // document.getElementById("game").style.display='none';
    // document.getElementById("Welcome").style.display='none';
    // document.getElementById("Register").style.display='none';
    // document.getElementById("Login").style.display='none';
    // document.getElementById("About").style.display='none';

}

function showgame(){

    $('#Welcome').hide();
	$('#Register').hide();
	$('#Login').hide();
	$('#About').hide();
	$('#game_screen').hide();
	$('#Settings').show();
	$('#score').hide();
	$('#time').hide();
	$('#game').show();

    // document.getElementById("score").style.display='block';
    // document.getElementById("time").style.display='block';
    // document.getElementById("game").style.display='block';
    // document.getElementById("Settings").style.display='none';
    // document.getElementById("Welcome").style.display='none';
    // document.getElementById("Register").style.display='none';
    // document.getElementById("Login").style.display='none';
    // document.getElementById("About").style.display='none';
    Start();

  
    // return false;

}
window.addEventListener('mouseup',function(event){
    var dialog = document.getElementById('About');
    if(event.target != About && event.target.parentNode == About){
        //$('#About').hide();

        document.getElementById("dialog").close();
    }
});  