var socket = io("/index")

document.getElementById("submit").addEventListener("click", () => {
    if(document.getElementById("name").value == "" ||document.getElementById("email").value == "" ||document.getElementById("GDPR").checked == false || document.getElementById("bir").value == "" || document.getElementById("gender").value == "" || document.getElementById("class").value == "" || document.getElementById("password").value == "") {
        //need to fill out all the values
        alert("need to fill out all the values!")
       
    }else {
        
        socket.emit("SendReg", {
            "Name" : document.getElementById("name").value, 
            "Email": document.getElementById("email").value, 
            "GDPR" : document.getElementById("GDPR").checked,
            "Birdate" : document.getElementById("bir").value, 
            "Gender": document.getElementById("gender").value,
            "class" : document.getElementById("class").value,
            "password" : document.getElementById("password").value
        
        })
    }

})


socket.on("user", (data) => {
    if(data.reg == false) {
        alert(data.message)
        location.reload()
    }else{
        alert("You are now registerd to LIUGAME")
        location.href = "/Login"
    }

})