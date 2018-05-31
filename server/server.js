const express = require('express')
const mysql = require('mysql')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


const app = express();

const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: 'admin',
    database: 'todo',
    port: '3306'
})

    db.connect(function(err) {
       
        if (!err) {
            console.log("Database is connected");
        }
        else {
            console.log("Error connecting database", err);
        }
    })

app.get('/',function(req , res){
    db.query("SELECT * FROM valueTable",function(error,results,fields){
        if(error){
            console.log("error",error);
        }else{
            console.log("success");
            console.log(results);
            res.send(results);
        }
    })
})

app.post('/add',jsonParser,function(req , res){
    console.log("add",req.body);
    val = req.body;
    db.query(`INSERT INTO valueTable(value) VALUES ('${val.add}')`,function(error,results,fields){
        if(error){
            console.log("error",error);
        }
        else{
            db.query("SELECT * FROM valueTable",function(error,results,fields){
                if(error){
                    console.log("error",error);
                }else{
                    console.log("success");
                    console.log(results);
                    res.send(results);
                }
            })
        }
    })
})
app.post('/delete',jsonParser,function(req,res){
    console.log("delete",req.body);
    val = req.body;
    db.query(`DELETE FROM valueTable WHERE id = ${val.id}`,function(error,results,fields){
        if(error){
            console.log("error",error)
        }else{
            db.query("SELECT * FROM valueTable",function(error,results,fields){
                if(error){
                    console.log("error",error);
                }else{
                    console.log("success");
                    console.log(results);
                    res.send(results);
                }
            })
        }
    })
})

app.post('/edit',jsonParser,function(req,res){
    console.log("edit",req.body);
    val = req.body;
    db.query(`UPDATE valueTable SET value = '${val.edit}' WHERE id = '${val.id}'`,function(error,results,fields){
        if(error){
            console.log("error",error)
        }else{
            db.query("SELECT * FROM valueTable",function(error,results,fields){
                if(error){
                    console.log("error",error);
                }else{
                    console.log("success");
                    console.log(results);
                    res.send(results);
                }
            })
        }
    })
})

app.listen('3000',()=>{
    console.log("server started on port 3000");
})