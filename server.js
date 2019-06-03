var express=require('express');
var app=express();
app.listen(5000);
var mysql=require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var request = require('request');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'kumar',
  database : 'vconnect'
});
app.post('/forgotpassword', (req, res) => {
	var userID=req.body.userID;
	var answer1=req.body.answer1;
	var answer2=req.body.answer2;
	var query='select * from users where username= ? AND answer1 = ? AND answer2= ?'
	connection.query(query,[userID,answer1,answer2],function(err,users){
		if(err) throw err;
		else{
			if(users.length==1){
				res.json({"message":"success"})
			}else{
				res.json({"message":"failure"})
			}
		}
	});
});