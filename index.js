const https = require('https');
const fs = require('fs');
var express = require("express")
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
var app = express()
var server = https.createServer(options, app)
var {Server} = require("socket.io")
var io = new Server(server)
var crypt = require("crypto")
app.use("/static", express.static("public"))

io.of("/index").on("connection", (socket) => {
    console.log("Index User")
    //Login or Register User
    //must be a LIU EmailAddress
    //Save Data for cookies and GDPR
    socket.on("SendReg", (data) => {
        console.log(data)
        var database = fs.readFileSync(__dirname + "/database/userDatabase.json")
        database = JSON.parse(database)
        for(var i = 0; i < database.length; i++) {
            console.log(data)
            console.log(database)
            if(database[i].Email == data.email || database[i].Name == data.name) {
                socket.emit("user", {"reg" : false, "message" : "this user is allready in the database. Contact Noa Andersson if this is a misstake!"})
                return
            }else if(data.Email.includes("@student.liu.se") == false) {

                socket.emit("user", {"reg" : false, "message" : "You need to signup with a liu email adress!"})

            }else {

                var password = data.password
                var hash = crypt.createHash("md5").update(password).digest("hex")
                data = {
                    "Name" : data.Name,
                    "Email": data.Email,
                    "GDPR" : data.GDPR,
                    "Birdate" : data.Birdate,
                    "Gender": data.Gender,
                    "class" : data.class,
                    "password" : hash
                
                }

                database.push(data)
                fs.writeFileSync(__dirname + "/database/userDatabase.json", JSON.stringify(database))

                socket.emit("user", {"reg" : true})
                return
            }
        }
    
    
    })

})

io.of("/Login").on("connection", (socket) => {
    console.log("Login User")
    socket.on("Login", (data) => {
        var database = fs.readFileSync(__dirname + "/database/userDatabase.json")
        database = JSON.parse(database)
        var hash = crypt.createHash("md5").update(data.Password).digest("hex")
        console.log(crypt.createHash("md5").update("1234").digest("hex") + 123123123)
        
        for(var i = 0; i < database.length; i++) {
            console.log(database[i].password)
            if(data.Email == database[i].Email ) {
                if(database[i].password == hash) {
                    var id = Math.random(1000000)
                    socket.emit("Log", {"Log" : true, "loginID" : id})
                    app.get("/user/" + id, (req,res) => {
                        res.render("Game")
                    })
                    io.of("/Game/" + id).on("connection", (socket) => {
                        var playerData = fs.readFileSync(__dirname + "/database/PlayerDatabase.json")
                        playerData = JSON.parse(playerData)

                        for(var i = 0; i < playerData.length; i++) {
                            if(playerData[i].Email == data.Email) {

                                socket.emit("PlayerData", playerData[i])
                            }
                        }
                        
                    })
                    return
                }else{
                    socket.emit("Log", {"Log" : false, "message": "Wrong Login!"})
                }
                
            }

        }

    })



})


app.set('view engine', 'ejs');
app.get("/GDPR", (req, res) => {
    res.sendFile(__dirname + "/GDPR.pdf")
})
app.get("/Login", (req, res) => {
    res.render("Login")
})


app.get("/", (req, res) => {
    res.render("index")

})


server.listen(3000)