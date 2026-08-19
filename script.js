let loggedIn = false;
let username;
let password;

while(!loggedIn){
    username = window.prompt("enter your username");
    password = window.prompt("Enter your password");

    if(username === "myUSername" && password === "myPassword"){
        loggedIn = true;
        console.log("your are logged in!");
    }
    else{
        console.log("Invalid credentails please try again");
    }
}