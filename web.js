const http = require('http')
const fs = require('fs')
const PORT = 3000
const db = './db.json'

const server = http.createServer((req, res)=>{
    let {method, url} = req
    if((method == 'GET' || method == 'POST') && url.toLowerCase() == '/allusers'){
        fs.promises.readFile(db)
        .then(dbuffer => dbuffer.toString())
        .then(dJson => JSON.parse(dJson))
        .then(dObjet => JSON.stringify(dObjet))
        .then(dJson =>{
            res.statusCode = 200
            res.setHeader("Content-Type", "application/json")
            res.write(dJson)

        })
        .catch(e => {
            console.log(e)
            res.write(e)
        })
        .finally(()=> res.end())

    }
    else{
        res.statusCode = 404
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(
            {
                msg: "404 erreur page not found !!",
                ressource: url
            }
        ))
    }
})
server.listen(PORT, ()=>{
    console.log(`server start as port ${PORT}`)
})