var request = require('request');
var fs = require('fs');


// console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "ahmedalani";
var GITHUB_TOKEN = "22967f63f7c9cdde33628425b608998b83dc17ad";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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


// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });


getRepoContributors("jquery", "jquery", function(err, contributorsData) {

  for (var key in contributorsData) {
    const user = contributorsData[key];

    if (user.login) {
      // .pipe(fs.createWriteStream('./avatars/contributorsData.key' + '.png');
      downloadImageByURL(user["avatar_url"], './avatars/'+user.login + '.png');
    }
  }



});

function downloadImageByURL(url, filePath) {
  console.log('Downloading:', url, '\tto:', filePath);
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
};

// downloadImageByURL('https://avatars2.githubusercontent.com/u/2741?v=3&s=466', './kvirani.jpg');






