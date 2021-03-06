
const express = require("express");
const connect = require("./configs/db");
const userController = require("./controller/user.controller")
const todoController = require("./controller/todo.controller")

const {register,login} = require("./controller/auth.controller")
const app = express();

app.use(express.json());


app.use("/users", userController)

app.post("/register", register)

app.post("/login", login)

app.use("/todo", todoController)



app.listen(5000, async () => {
    try{
        await connect();
        console.log("listening on port 5000")
    }
    catch(err){
        console.log(err.message);
    }
});
    