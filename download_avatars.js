const request = require('request');
const fs = require('fs');

const repoOwner = process.argv[2];
const repoName = process.argv[3];

const GITHUB_USER = "ahmedalani";
const GITHUB_TOKEN = "22967f63f7c9cdde33628425b608998b83dc17ad";

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
    cb(err, JSON.parse(body))
  });
}


function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream(filePath));
};


getRepoContributors(repoOwner, repoName, function(err, contributorsData) {
  if (!repoOwner || !repoName) {
    return console.log('pass in argument after calling the function repoO and repoN');
  }
  for (var key in contributorsData) {
    const user = contributorsData[key];
    if (user.login) {
      downloadImageByURL(user["avatar_url"], './avatars/'+user.login + '.png');
    }
  }
});





