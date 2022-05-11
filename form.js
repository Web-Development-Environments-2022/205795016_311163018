
var users = {}

function register(){
    let user_name = $('#User_Name').val()
    let password = $('#pwd').val()
    let pwd_confirm = $('#confirm').val()
    let full_name = $('#name').val()
    let email = $('#email').val()
    let birthday = $('#birthday').val()

    if(user_name in users){
        window.alert("User name is taken, please change user name.")
    }

    if (password.length < 6){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
    }
    else if(password.search(/[a-zA-Z]/) == -1){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
    }
    else if(password.search(/\d/) == -1){
        window.alert("Password must be at least 6 Charecters with at least one digit and one letter")
    }

    if (pwd_confirm != password){
        window.alert("dude..WTF you entered two different password..stop with the weed.")
    }
    // TODO need to fix this....
    if (full_name.search(/\d/) == 1){
        window.alert("You are not a robot <br> there is no reason for you to have a number in your name.")
    }
}