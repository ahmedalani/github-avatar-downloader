var request = require('request');
var fs = require('fs');


// console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "ahmedalani";
var GITHUB_TOKEN = "22967f63f7c9cdde33628425b608998b83dc17ad";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
  const option = {
    url: 'https://api.github.com/repos/jquery/jquery/contributors',
      qs: {
        access_token: GITHUB_TOKEN
      },
      headers: {
        'User-Agent': 'anything'
      }
    };
  request(option, function(err, response, body) {
    // console.log('body:', JSON.parse(body));
    cb(err, JSON.parse(body))
  });

}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

function downloadImageByURL(url, filePath) {


}

request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')
   .on('error', function (err) {
     throw err;
   })
   .on('response', function (response) {
     console.log('Response Status Code: ', response.statusCode);
   })
   .pipe(fs.createWriteStream('./kvirani.jpg'));



