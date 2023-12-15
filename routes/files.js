const express = require('express');
const router = express.Router();
const { createReadStream } = require('fs');
const { GridFSBucket } = require('mongodb');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // This will save files to an 'uploads' directory

module.exports = (db) => {
  // Create a new instance of GridFSBucket
  const gfs = new GridFSBucket(db, {
    bucketName: 'uploads'
  });

  // File upload route
  router.post('/upload', upload.single('file'), (req, res) => {
    const { filename } = req.body; // You might want to use a form or a different way to provide the filename
    const writeStream = gfs.openUploadStream(filename);

    writeStream.on('finish', (file) => {
      console.log(`File ${file.filename} has been uploaded.`);
      res.send(`File ${file.filename} has been uploaded.`);
    });

    writeStream.on('error', (error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });

    // Assuming a form with a file input named 'file' is submitted
    createReadStream(req.file.path).pipe(writeStream);  // Updated line
  });


  return router;
};
