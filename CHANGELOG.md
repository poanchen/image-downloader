v1.0.1
======

* Now, the image file format svg is supported.
* As more and more web static assets go on to the CDN, many of the image url gets redirect to different url based on their physical location. The script is now has the ability to download the image off from the redirected link.

v1.0.0
======

* Check if there is a given url.
* Check if inputted url starts with http or https.
* Check if the image file formats are either png, jpg, jpeg, gif.
* Make sure that it is not just grabbing the source attribute from the image tag, but also the file attribute.
* Remove the GET parameters from url if any.
* Let you know the progress by printing out the progress every time it downloads an image.