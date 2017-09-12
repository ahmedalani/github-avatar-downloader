var request = require('request');

// console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = "ahmedalani";
var GITHUB_TOKEN = "22967f63f7c9cdde33628425b608998b83dc17ad";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
