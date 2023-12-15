const mongoose = require('mongoose');
const { Schema } = mongoose;

const fileSchema = new Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  aliases: [String],
  metadata: {},
});

const File = mongoose.model('File', fileSchema, 'fs.files');
