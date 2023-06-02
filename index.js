var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var compiler = require('compilex');
const path = require('path')
const dirPath = path.join(__dirname, "static")
console.log(dirPath)

app.use(bodyParser())
var option = { stats: true };

compiler.init(option);
app.get("/", (req, resp) => {
    resp.sendFile(dirPath + "/compiler.html")

})
app.post("/compilecode", (req, resp) => {
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputradio;
    var lang = req.body.lang;
    if (lang === "C" || lang === "C++") {

        if (inputRadio === true) {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
            compiler.compileCPPWithInput(envData, code, input, function (data) {
                if (data.error) {
                    resp.send(data.error);
                } else {
                    resp.send(data.output);
                }
            });

        }
        else {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
            compiler.compileCPP(envData, code, function (data) {
                resp.send(data);
                //data.error = error message 
                //data.output = output value
            });
        }
    }

    // if (lang === "python") {
    //     if (inputRadio === true) {
    //         var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
    //         compiler.compilePythonWithInput(envData, code, input, function (data) {
    //             if (data.error) {
    //                 resp.send(data.error);
    //             } else {
    //                 resp.send(data.output);
    //             }
    //         }
    //         );
    //     }
    //     else {
    //         var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
    //         compiler.compilePython(envData, code, function (data) {
    //             resp.send(data);
    //             //data.error = error message 
    //             //data.output = output value
    //         });
    //     }
    // }
})



app.get("/fullStat", (res, req) => {
    compiler.fullStat(function (data) {
        res.send(data);
    });
})
compiler.flush(function () {
    console.log("All temporary files flushed !");
})

app.listen(5000, () => {
    console.log("Server Started");
})