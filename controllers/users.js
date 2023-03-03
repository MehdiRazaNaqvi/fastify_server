
const data = require("../data.json")
// const fastify = require('fastify')()




const userLogin = async (req, res) => {
    // fastify.get('/en', (req, res) => { res.send("req.body") })
    // res.send({ data : req.body })

    // data.map(v => {
    //     if (v.email == req.body.email && v.password == req.body.password) {

    //         return res.send({ message: "Success" , token : "123" });

    //     }
    //     else {

    //         return console.log({ message: "Wrong email or password" });

    //     }


    // }
    // )




    const result = await data.find(v => v.email == req.body.email && v.password == req.body.password)


    if (result) {
        res.send({ message: "success", result })
    }
    else {

        res.send({ message: "failed", result })

    }



}




module.exports = userLogin