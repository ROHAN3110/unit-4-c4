const express = require("express")

const router = express.Router();
const authenticate = require("../middlewares/authenticate")
const todo= require("../models/todo.model")

router.post("", authenticate, async (req, res) => {

    req.body.user_id = req.userID;
    try{
        const todo = await todo.create(req.body)
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(401).send({message : err.message})
    }
 
})

router.get("", async (req, res) => {
    try{
        const todo = await todo.find()
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(401).send({message : err.message})
    }
})

router.get("/:id",authenticate, async(req,res)=>{
    try {
        const todo=await todo.find()
        return res.status(200).send(todo)
        
    } catch (error) {
        return res.status(401).send({message:err.messege})
        
    }
})

router.delete("/:id",authenticate, async(req,res)=>{
    try {
        const todo=await todo.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(todo);
    } catch (error) {
        return res.status(401).send({message:err.messege})
        
    }
})


router.patch("/:id",authenticate, async(req,res)=>{
    try{
        const todo = await todo.findByIdAndUpdate(req.params.id, req.body, {new:true})
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(401).send({message : err.message})
    }
})

module.exports = router;
  