
const data = require("../data.json")
// const fastify = require('fastify')()




const loginUser = async (req,res) => {
   
    


    // const result = await data.find(v => v.email == req.body.email && v.password == req.body.password)


    // if (result) {
        res.send({ message: "login"})
    // }
    // else {

    //     res.send({ message: "failed", result })

    // }



}



const registerUser = async (req,res) => {
   
    


    // const result = await data.find(v => v.email == req.body.email && v.password == req.body.password)


    // if (result) {
    //     res.send({ message: "success", result })
    // }
    // else {

        res.send({ message: "register" })

    // }



}




module.exports = {loginUser , registerUser }