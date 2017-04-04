const cloudinary         = require('cloudinary');
const CloudinaryReceiver = require('./CloudinaryReceiver');

function getCloudinary(options) {
  cloudinary.config(options);
  return cloudinary;
}

module.exports = function SkipperCloudinary(globalOptions) {

  return {
    read   : () => {
      throw new Error('Not implemented yet, PR welcomed :-)');
    },
    rm     : () => {
      throw new Error('Not implemented yet, PR welcomed :-)');
    },
    ls     : () => {
      throw new Error('Not implemented yet, PR welcomed :-)');
    },
    receive: (options) => {
      const mergedOptions = Object.assign({}, globalOptions, options);
      const cloudinary    = getCloudinary({
        cloud_name: mergedOptions.cloudName,
        api_key   : mergedOptions.key,
        api_secret: mergedOptions.secret
      });
      return CloudinaryReceiver(cloudinary, mergedOptions);
    }
  }

};
