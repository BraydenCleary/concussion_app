//Thanks to Dominic Barker for below code

// var OAuth2 = require('OAuth').OAuth2;
// var https = require('https');

// var oauth2 = new OAuth2("trBr2JAhAU6P7Be2qmogAQ", "LPdqvJ4S7nghZyUFBUxTWRn22NCqXZx980g9NxzREM", 'https://api.twitter.com/', null, 'oauth2/token', null);
// oauth2.getOAuthAccessToken('', {
//     'grant_type': 'client_credentials'
// }, function (e, access_token) {
//     var options = {
//         hostname: 'api.twitter.com',
//         path: '/1.1/search/tweets.json?q=nfl%20concussion',
//         headers: {
//             Authorization: 'Bearer ' + access_token
//         }
//     };


//     https.get(options, function (result) {
//         var buffer = '';
//         result.setEncoding('utf8');
//         result.on('data', function (data) {
//             buffer += data;
//         });
//         result.on('end', function () {
//             var tweets = JSON.parse(buffer);
//             console.log(tweets); // the tweets!
//         });
//     });
// });
