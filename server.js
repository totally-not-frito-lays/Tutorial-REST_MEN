require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const EventEmitter = require('events');

class GfsEmitter extends EventEmitter {}
const gfsEmitter = new GfsEmitter();  // allows us to avoid circular dependencies

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // This will save files to an 'uploads' directory


mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => {
  console.log('Connected to Database');
  gfsEmitter.emit('gfsInitialized', db); // Pass the db instance instead of gfs
});

app.use(express.json());

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter);

gfsEmitter.on('gfsInitialized', (db) => {
  const filesRouter = require('./routes/files')(db); // Pass db as an argument to your route file
  app.use('/files', filesRouter); // Use the file routes under the '/files' path
});

app.listen(3000, () => console.log('Server Started'));
