'use strict';

var casper = require('casper').create({
  pageSettings: {
    webSecurityEnabled: false
  }
});
var fs        = require('fs');
var validUrl  = require('valid-url');
var sourcePage;
var images = [];

if (casper.cli.has(0)) {
  sourcePage = casper.cli.get(0).toLowerCase();
  if (!validUrl.isUri(sourcePage)) {
    casper.echo("Please provide a valid url, for example, http://www.example.com, aborting...").exit();
  } else {
    if (casper.cli.get('g')) {
      casper.options.verbose = true;
      casper.options.logLevel = 'debug';
    }
  }
} else {
  casper.echo("No url passed, aborting...").exit();
}

function getAllTheImagesTag() {
  var els = document.querySelectorAll('img');
  var results = [];
  var uniqueLinks = [];

  Array.prototype.forEach.call(els, function(el) {
    var isPng = new RegExp('png$', 'i');
    var isJpg = new RegExp('jpg$', 'i');
    var isJpeg = new RegExp('jpeg$', 'i');
    var isGif = new RegExp('gif$', 'i');
    var isSvg = new RegExp('svg$', 'i');

    if (el.hasAttribute('src') || el.hasAttribute('data-src') || el.hasAttribute('file')) {
      var imgUrl = el.getAttribute('src') == null ? el.getAttribute('data-src').split('?')[0] : el.getAttribute('src').split('?')[0];

      imgUrl = imgUrl == null ? el.getAttribute('file').split('?')[0] : imgUrl;
      imgUrl = imgUrl.indexOf('//') == 0 ? 'http:' + imgUrl : imgUrl;
      imgUrl = imgUrl.trim();
      if (isPng.test(imgUrl) || isJpg.test(imgUrl) || isJpeg.test(imgUrl) || isGif.test(imgUrl) || isSvg.test(imgUrl)) {
        if (uniqueLinks.indexOf(imgUrl) == -1) {
          uniqueLinks.push(imgUrl);
          results.push({url: imgUrl});
        }
      }
    }
  });

  return results;
}

function outputDownloadProgress(index, numberOfImages, imgName) {
  console.log("Downloading " + index + " out of " + numberOfImages +  " image(s).");
  console.log("\t" + imgName);
}

function downloadTheImage(casper, imgUrl, folderPath, imgName) {
  var pathToImage = folderPath + imgName;

  if (fs.exists(pathToImage)) {
    pathToImage = folderPath + Math.random().toString(36).substring(7) + imgName;
    casper.download(imgUrl, pathToImage);
  } else {
    pathToImage = folderPath + imgName;
    casper.download(imgUrl, pathToImage);
  }
}

casper.start(sourcePage);

casper.on('load.failed', function(status) {
  this.echo(status.url + " failed to load, aborting... ").exit();
});

casper.then(function(res) {
  images = this.evaluate(getAllTheImagesTag);

  var count = 0;
  var numberOfImages = images.length;
  sourcePage = res.url.split('?')[0];

  this.echo("Begin to download all the images...");
  this.echo("There are in total of " + numberOfImages + " image(s).");
  images.forEach(function(currentValue, index, arr) {
    var folderPath = './' + sourcePage.split('//')[1].split('/')[0] + '/';
    var imgUrl = currentValue.url;
    var splittedImageUrl = imgUrl.split('/');
    var imgName = splittedImageUrl[splittedImageUrl.length-1];
    var pathToImage = folderPath + imgName;

    downloadTheImage(casper, imgUrl, folderPath, imgName);
    if (fs.isFile(pathToImage) && fs.size(pathToImage) == 0) {
      fs.remove(pathToImage);
      casper.thenOpen(imgUrl, function(resourse) {
        downloadTheImage(casper, resourse.url, folderPath, imgName);
        outputDownloadProgress(++count, numberOfImages, imgName);
      });
    }else{
      outputDownloadProgress(++count, numberOfImages, imgName);
    }
  });
});

casper.run(function() {
  console.log("Finished downloading " + images.length + " image(s).");
  console.log("Exiting now...");
  this.exit();
});
