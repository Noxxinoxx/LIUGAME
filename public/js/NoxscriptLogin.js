var socket = io("/Login")

document.getElementById("submit").addEventListener("click", () => {
    socket.emit("Login", {
        "Email": document.getElementById("email").value, 
        "Password": document.getElementById("password").value
    })
})


socket.on("Log", (data) => {
    if(data.Log == false) {
        alert(data.message)
        location.reload()
    }else if(data.Log == true) {
        location.href = "/User/" + data.loginID
    }
})