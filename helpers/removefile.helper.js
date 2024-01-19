const fs = require("fs");

const removeFile = (data) => {
  try {
    if (Array.isArray(data)) {
      data.map((images) => {
        const splitValue = images.split("/uploads/")[1];
        const filepath = "." + "/uploads/" + splitValue;

        fs.unlink(filepath, function (error) {
          if (error) return error;
        });
      });
    } else {
      const splitValue = data.split("/uploads/")[1];
      const filepath = "." + "/uploads/" + splitValue;

      // Delete file here if error occurred.
      fs.unlink(filepath, function (error) {
        if (error) return error;
      });
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = { removeFile };
