# image-downloader
Downloading images off from a given url using a CasperJS-powered script onto the local filesystem.

## Why is this useful?

If you ever need an easy way to download all the images off from a given url. You are in luck. This can be as easy as it seems.

## Requirements

- [PhantomJS](http://phantomjs.org/) or [SlimerJS](https://slimerjs.org/)
- [CasperJS](http://casperjs.org/)

## Installation

Once you have PhantomJS or SlimerJS with CasperJS ready, run the following commands to get the getImages.js working,

```
git clone https://github.com/poanchen/image-downloader.git
cd image-downloader
npm install
```

## Usage

```
casperjs getImages.js http://www.example.com
```

Or, to enable debugging mode

```
casperjs getImages.js http://www.example.com --g
```

## Demo

![Loading the first image](demo.gif)
![Loading the first image](demo.PNG)