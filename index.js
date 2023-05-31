var express=require('express')
var app=express()
var bodyParser=require('body-parser')
var compiler=require('compilex');
const { Console } = require('console');
const path=require('path')
const dirPath=path.join(__dirname,"static")
console.log(dirPath)

app.use(bodyParser())
var option={stats:true};

compiler.init(option);
app.get("/",(req,resp)=>{
    resp.sendFile(dirPath+"/compiler.html")

})
app.post("/compilecode",(req,resp)=>{
    var code=req.body.code;
    var input=req.body.input;

    var lang=req.body.lang;
    console.log(code)
    console.log(input)
    console.log(lang)
    compiler.compileJava({src:code,input:input},function(data){
        console.log(data)
        if(data.error)
        {
            resp.send(data.error)
        }
        else
        {
            resp.send(data.output)
        }
    })
})

app.listen(5000,()=>{
    console.log("Server Started");
})