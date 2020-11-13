import "../style.css"

const err = (<HTMLInputElement>document.getElementById("error"));
const form = document.getElementById("form");
if(typeof(form) != 'undefined' && form != null){
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    let username = (<HTMLInputElement>document.getElementById("username")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    if(username=="admin"){
        if(password=="admin123"){
            localStorage.setItem("token","token");
            location.replace("./index.html");
        }
        else{
             err.innerText = "Password is not valid";
        }
    }
    else{
        err.innerText = "Username not valid";
    }
})
}