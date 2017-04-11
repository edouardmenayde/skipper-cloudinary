const Writable = require('stream').Writable;

module.exports = function CloudinaryReceiver(cloudinary, options) {

  const receiver = Writable({
    objectMode: true
  });

  options.rowHandler = options.rowHandler || function () {
    };

  options.uploadOptions = {};

  receiver._files = [];

  receiver._write = function onFile(file, encoding, done) {

    const headers = options.headers || {};

    const stream = cloudinary.uploader.upload_stream(function (result) {

      if (result.error) {
        return receiver.emit('error', new Error(result.error.message));
      }

      file.extra     = result;
      file.byteCount = result.bytes;
      file.size      = result.bytes;
      done();
    }, options.uploadOptions);

    stream.on('error', function (error) {
      done(error);
    });

    stream.on('readable', function () {
      let record;
      while (record = stream.read()) {
        options.rowHandler(record, file.fd, file);
      }
    });

    file.pipe(stream);
  };

  return receiver;
};
