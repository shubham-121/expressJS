const express=require("express")
const bodyParser=require("body-parser")


const app=express();

app.use(bodyParser.urlencoded({extended:true}))     //getting access to form data    //using body parser for storing the posted data
//parsing data from html to js form
//extended({true})// allows us to post nested objects. Not necessary but body parser requires it.



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")    
     //tells about the current file locATION directory where the files are present
})

// app.get('/',function(req,res){
//     res.sendFile(__dirname + "/index.html")
// })

// app.post('/',(req,res)=>{
//     console.log(req.body)            //parsed version of http request
//     res.send("sucessfully posted")
// })

app.post("/",(req,res)=>{

    var num1=Number(req.body.num1);
    var num2=Number(req.body.num2)
    var result=num1+num2
    
    res.send("the result is:"+result)
})

























// app.get('/about',(req,res)=>{
//     res.send("server working")
//    })


app.listen(3000,()=>{
    console.log("server started at port 3000")
})