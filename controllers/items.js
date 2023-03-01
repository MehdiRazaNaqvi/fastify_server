
const data = require("../data.json")


const getItems = (req, res) => {
    res.send({ data: data })
}



const postItems = (req, res) => {
    data[0] = req.body
    res.send({ message: 'Recieved', data })

}



module.exports = { postItems, getItems }