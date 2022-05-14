
var users = {}
var controls = {}
users["k"] == "k"

function register(){
    let user_name = $('#User_Name').val()
    let password = $('#pwd').val()
    let pwd_confirm = $('#confirm').val()
    let full_name = $('#name').val()
    let email = $('#email').val()
    let birthday = $('#birthday').val()

    if(user_name in users){
        window.alert("User name is taken, please change user name.")
        return
    }

    if (password.length < 6){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
        return
    }
    else if(password.search(/[a-zA-Z]/) == -1){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
        return
    }
    else if(password.search(/\d/) == -1){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
        return
    }

    if (pwd_confirm != password){
        window.alert("dude..WTF you entered two different password..stop with the weed.")
        return
    }

    if (full_name.search(/\d/ )!= -1){
        window.alert("You are not a robot there is no reason for you to have a number in your name.")
        return
    }

    let is_it = ValidateEmail(email)
    if (!is_it){
        window.alert("You have entered an invalid email address!")
        return
    }

    users[user_name] = password
    window.alert("Congrats you registred sucessfully")
    showAndHideDivs("login")
    //show('Login','Register' ,'Welcome','About')
}


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return (true)
    }
    return (false)
}

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
        window.alert(users)
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


function myKeyPress(e , key){
    var keynum
    if(window.event){
        keynum = e.keyCode;
    }

    switch(key){
        case('up'):
			//wantedKey = $('#moveup')
			controls['up'] = keynum
			break;
		case('down'):
			//wantedKey = $('#movedown')
			controls['down'] = keynum
			break;
		case('right'):
			//wantedKey = $('#moveright')
			controls['right'] = keynum
			break;
		case('left'):
			//wantedKey = $('#moveleft')
			controls['left'] = keynum
			break;
    }

}



function check_settings(){
    // let up = $('#up').val()
	// let down = $('#down').val()
	// let right = $('#right').val()
	// let left = $('#left').val()



    // if ((up == '') || (down == '') || (right == '') || (left == '')){
    //     window.alert("Please fill all the value to start the game.")
    //     return
    // }

    // let moving_keys = new Set([up, down, right, left]);
	// if (moving_keys.size != 4){
	// 	window.alert('Identical keys error - You configured 2 or more different movements with the same keys, please choose a different key for every different move')
	// 	return
	// }
    showAndHideDivs("game")
    //showgame()
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
