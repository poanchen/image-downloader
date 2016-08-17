v1.0.5 (2016-08-17)
======

* We realized that some image has .PNG extension instead of .png, as a result, we ignore the character cases when comparing.
* Some site, instead of using <img src="" or <img file="", they use <img data-src="", then we need to modify the script to accommodate it, so that we can also download images off from their site.
* Notice that, we first check if image tag has attribute src, then data-src, then file. Hence, if the image has attribute src with some value, then we will be ignoring the contents of data-src and file.

v1.0.4 (2016-08-16)
======

* Now, the initial url accepts link that will get redirect. For example, say a person physically located in Canada, he put www.google.com as the initial url, of course google will redirect the person to the google.ca. As a result, the person will end up downloading images for google.ca.
* We added the fallback that exit the program when url request is timeout. (Default, 5 seconds)

v1.0.3 (2016-08-14)
======

* For site that has redirected image link may lead to bunch of file(s) stored in the directory with no use. Now, they will be removed if the file size is 0.

v1.0.2 (2016-08-14)
======

* Before the url gets check, we converts it to lowercase letters.
* When we get the image url from the image tag, we removes the whitespace from both sides of the url before we continue.
* For some website like https://www.youtube.com, most of their images has the exact same name. In order to download those images, we append random characters in the front of the file name.

v1.0.1 (2016-08-13)
======

* Now, the image file format svg is supported.
* As more and more web static assets go on to the CDN, many of the image url gets redirect to different url based on their physical location. The script is now has the ability to download the image off from the redirected link.

v1.0.0 (2016-08-13)
======

* Check if there is a given url.
* Check if inputted url starts with http or https.
* Check if the image file formats are either png, jpg, jpeg, gif.
* Make sure that it is not just grabbing the source attribute from the image tag, but also the file attribute.
* Remove the GET parameters from url if any.
* Let you know the progress by printing out the progress every time it downloads an image.