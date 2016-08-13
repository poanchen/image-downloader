# image-downloader
Downloading images off from a given url using a CasperJS-powered script onto the local filesystem.

## Why is this useful?

If you ever need an easy way to download all the images off from a given url. You are in luck. This can be as easy as it seems.

## Requirements

- PhantomJS or SlimerJS
- CasperJS

## Installation

Once you have PhantomJS or SlimerJS with CasperJS ready, run the following command to get the latest copy of getImages.js,

```
git clone https://github.com/poanchen/image-downloader.git
```

## Usage

```
casperjs getImages.js http://www.example.com
```

Or, to enable debugging mode

```
casperjs getImages.js http://www.example.com --g
```
