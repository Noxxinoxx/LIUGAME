
var ser = window.location.search;
var urlperms = new URLSearchParams(ser)
var id = urlperms.get("id")
id = "1234"
var socket = io("/User/" + id)

socket.on("PlayerData", (data) => {
    console.log(data)
    for (var i = 0; i < Object.keys(data.Game).length; i++) {
        
        var div = document.createElement("div")
        
        div.style.width = "70px"
        div.style.height = "70px"
        div.style.borderRadius = "40px"
        div.style.backgroundSize = "cover"
        div.setAttribute("id", data.LevelName[i])
        div.setAttribute("name", data.LevelName[i])
        var label = document.createElement("label")
       
        label.setAttribute("for", data.LevelName[i])
        label.innerText = data.LevelName[i] + ": "
        label.style.fontSize = "35px"
        label.style.fontFamily = "Moul"
        label.style.color = "rgb(85,74,193)"
        if (data.Game[data.LevelName[i]] == true) {
            div.style.backgroundImage = " url(/static/images/" + data.
            imageName[i] + ".png)"
        } else {
            div.style.backgroundImage = "url(/static/images/lock.png), url(/static/images/" + data.
            imageName[i] + ".png)"
        }


        
        
        if(i < 3) {
            document.getElementById("levelsYear1").append(label)
            document.getElementById("levelsYear1").append(div)

        }else if(i > 3 && i <= 5) {
            document.getElementById("levelsYear2").append(label)
            document.getElementById("levelsYear2").append(div)
        }else if(i > 5 && i <= 7) {
            document.getElementById("levelsYear3").append(label)
            document.getElementById("levelsYear3").append(div)
        }else if(i > 7 && i <= 9) {
            document.getElementById("levelsYear4").append(label)
            document.getElementById("levelsYear4").append(div)
        }else if(i > 9 && i <= 11) {
            document.getElementById("levelsYear5").append(label)
            document.getElementById("levelsYear5").append(div)
        }
        
    }
})