// Request is for making the request
var request = require('request');
// Cheerio is for parsing what we get back
var cheerio = require('cheerio');
// fs is for writing a file with inputs we get from this file.
var fs = require('fs');

request("https://www.reddit.com", function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  console.log("Status code: " + response.statusCode);

  var $ = cheerio.load(body);

  // The hash selects a div with the id siteTable, and the > selects a child of that div with the class link, of which there are several, hence the each function
  $('div#siteTable > div.link').each(function( index ) {
    // The following var declarations are simply selecting the proper elements. It seems like the hardest part of this is simply narrowing content down to the right point.
    var title = $(this).find('p.title > a.title').text().trim();
    var score = $(this).find('div.score.unvoted').text().trim();
    var user = $(this).find('a.author').text().trim();
    console.log("Title: " + title);
    console.log("Score: " + score);
    console.log("User: " + user);
    // The following function puts everything in a file of our choosing. How you delimit/separate things has a large impact of its format and, consequently, what programs can read it.
    fs.appendFileSync('reddit.xlsx', "'" + title + "'" + ',' +  "'" + score + "'" + ',' + "'" + user + "'" + ',');
  });

});
