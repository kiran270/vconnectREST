var ActiveDirectory = require('activedirectory');
var config = { url: 'ldap://blr.velankani.com',
				port:'3628',
    			baseDN: 'OU=Teams,DC=blr,DC=velankani,DC=com',
    			username: 'CN=vconnect test,OU=ITIT,OU=Teams,DC=blr,DC=velankani,DC=com',
    			password: 'Local@admin12'
            }
var ad = new ActiveDirectory(config);
// ad.authenticate(username, password, function(err, auth) {
//   if (err) {
//     console.log('ERROR: '+JSON.stringify(err));
//     return;
//   }
  
//   if (auth) {
//     console.log('Authenticated!');
//   }
//   else {
//     console.log('Authentication failed!');
//   }
// });

var username = 'thulasiraman.k';
var groupName = 'Teams';
// ad.isUserMemberOf(username, groupName, function(err, isMember) {
//   if (err) {
//     console.log('ERROR: ' +JSON.stringify(err));
//     return;
//   }
 
//   console.log(username + ' isMemberOf ' + groupName + ': ' + isMember);
// });


// ad.groupExists(groupName, function(err, exists) {
//   if (err) {
//     console.log('ERROR: ' +JSON.stringify(err));
//     return;
//   }
 
//   console.log(groupName + ' exists: ' + exists);
// });

ad.userExists(username, function(err, exists) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }
 
  console.log(username + ' exists: ' + exists);
});