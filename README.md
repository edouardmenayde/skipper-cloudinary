# Skipper Cloudinary

This adapter is made to work with skipper.

The conventional test suite for skipper adapter can't be used for this adapter because cloudinary only support images and videos. Thus there are no tests for the moment.

Any PR, advice is welcomed :-)

## How to use

```js
req.file('awesomefile')
    .upload({
      adapter  : require('skipper-cloudinary'),
      key      : 'cloudinaryApiKey',
      secret   : 'cloudinarySecretKey',
      cloudName: 'cloudinaryCloudName'
    }, (error, uploadedFiles) => {
      uploadedFiles.forEach(uploadedFile => {
        console.log(uploadedFile); // contains regular meta
        console.log(uploadedFile.extra); // contains cloudinary response
      });
    });
```
