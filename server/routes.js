const routes = require("express").Router();
const path   = require('path')
const dataTxt = require('./models/data');

routes.get("/", (req, res) => {
    res.sendFile(path.join(__dirname ,'/client/index.html'))
});

routes.post('/send/txt' , async(req, res)=>{
    try {    
        let date = new Date().toLocaleString();
        date  = date.replace('/' , '-').replace('/' , '-')
        req.body["date"] = date

        if(req.body.txt){
            const txt = new dataTxt(req.body);
            
            const isTxtSave = await txt.save()
            console.log(`New txt save : `, isTxtSave);
            
            if(isTxtSave)
                res.redirect('/browse')
            else{
                res.setHeader('Content-type' , 'text/html')
                res.end("<h2>Error Try Again!</h2>")
            }
        }
    } 
    catch (error) {
        console.log(`Error on /send/txt : ${error.message}`);
    }
    
})

routes.get("/browse" , (req, res)=>{
    res.sendFile(path.join(__dirname ,'./client/browse/browse.html'))
})

routes.get('/browse/txt' , async(req, res)=>{
    try{
        const data = await dataTxt.find({}).limit(20).sort({date : -1})
        res.send(data)
    }
    catch(err){
        console.log(`Error on /browse/txt : ${err.message}`);
    }
})

routes.post('/vote' , async(req , res)=>{
    try{
        const voteUpdate = await dataTxt.updateOne({_id : req.body.id} , {$inc : {'likes' : req.body.change}})
        if(voteUpdate.ok){
            const updatedVote = await dataTxt.findOne({_id : req.body.id} , {likes : 1 , _id : 0})
            res.send({status : updatedVote.likes})
        }
        else
            res.send({status : 0})
    }
    catch(err){
        console.log(`Error in /vote : ` , err.message)
    }
})



module.exports = routes;

