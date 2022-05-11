
var users = {}

function register(){
    let user_name = $('#User_Name').val()
    let password = $('#pwd').val()
    let pwd_confirm = $('#confirm').val()
    let full_name = $('#full_name').val()
    let email = $('#email').val()
    let birthday = $('#birthday').val()

    if (email.length < 6){
        window.alert("password is too short")
    }
}