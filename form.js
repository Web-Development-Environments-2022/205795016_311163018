
var users = {}
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
    show('Login','Register' ,'Welcome','About')
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
            showgame()
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

function showgame(){

    document.getElementById("score").style.display='block';
    document.getElementById("time").style.display='block';
    document.getElementById("game").style.display='block';
    document.getElementById("Welcome").style.display='none';
    document.getElementById("Register").style.display='none';
    document.getElementById("Login").style.display='none';
    document.getElementById("About").style.display='none';

  
    // return false;

}
