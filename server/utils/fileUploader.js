const cloudinary = require("cloudinary").v2;

exports.fileUploader = async (file, height, quality) => {
  let options = {};

  if (height) {
    options.height = height;
  }

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
