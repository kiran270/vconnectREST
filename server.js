var express=require('express');
var app=express();
app.listen(5000);
var mysql=require('mysql');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var request = require('request');
var ActiveDirectory = require('activedirectory');
var ldap = require('ldapjs');
var Change = ldap.Change;
var client = ldap.createClient({
  url: 'ldap://blr.velankani.com',
  baseDN: 'dc=velankani,dc=com',
  username: 'CN=vconnect test,OU=ITIT,OU=Teams,DC=blr,DC=velankani,DC=com',
  password: 'Local@admin12'
});
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
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
app.post('/setSecurityAnswers', (req, res) => {
	var userID=req.body.userID;
	var answer1=req.body.answer1;
	var answer2=req.body.answer2;
	var query='insert into users (username, answer1 ,answer2) values(?,?,?)'
	connection.query(query,[userID,answer1,answer2],function(err,users){
		if(err){
	  		res.json({"message":"failure"})
	  	}
		else{
			res.json({"message":"success"})		
		}
	});
});
// app.post('/resetPassword', (req, res) => {
// 	var userID=req.body.userID;
// 	var password=req.body.password;
// 	var newPassword=req.body.newPassword;
// 	var a = new Change({
//   			operation: 'add',
// 		  modification: {
// 		    password: [password, newPassword]
// 		  }
// 		});

// 	client.modify(userID,a, function(err) {
// 		if (err) {
// 			console.log(err);
// 		}
// 	});
// });

app.post('/authenticate', (req, res) => {
	var username=req.body.username;
	username=username+'@blr.velankani.com'
	var password=req.body.password;
	client.bind(username,password, function(err) {
	  if(err){
	  	res.json({"message":"failure"})
	  }
	  else{
		res.json({"message":"success"})		
	  }
	});
});


// client.bind('kiran.koribilli@blr.velankani.com', '!Gowthami5009', function(err) {
//   if(err){
//   	console.log(err);
//   }
//   else{
//   	console.log("success");
//   }
// });
// function encodePassword(password) {
// 	var newpassword=Buffer.from(password, 'utf8');
//     return newpassword; 
// }

// function Check(user,pass,newPassword){
// 	client.bind('CN=vconnect test,OU=ITIT,OU=Teams,DC=blr,DC=velankani,DC=com', 'Local@admin12', function (err, result) {
// 		if (err) {
// 			console.error('error: ' + err);
// 		}
// 		else {
// 			client.search('DC=blr,DC=velankani,DC=com', {
// 				filter:'(mail=kiran.koribilli@velankani.com)',
// 				scope: 'sub'
// 		}, function(err, res) {
// 			res.on('searchEntry', function(entry) {
// 				var userDN = entry.object.dn;
// 				// console.log(userDN);
// 				client.modify(userDN, [
// 					new ldap.Change({
// 						operation: 'delete',
// 						modification: {
// 							unicodePwd: encodePassword(pass)
// 						}
// 					}),
// 					new ldap.Change({
// 						operation: 'add',
// 						modification: {
// 							unicodePwd: encodePassword(newPassword)
// 						}
// 					})
// 				], function(err) {
// 					if (err) {
// 						console.log(err.code);
// 						console.log(err.name);
// 						console.log(err.message);
// 						client.unbind();
// 					}
// 					else {
// 						console.log('Password changed!');
// 					}
// 				});
// 			});
// 			res.on('error', function(err) {
// 				console.error('error:nhhh ' + err);
// 			});
// 			res.on('end', function(result) {
// 				console.log('status: ' + result);
// 			});
// 		});
// 		}
// 	});
// }