const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
    console.log("Sending subscribers");
  } catch {
    // server side error
   res.status(500).json({message: err.message});
  }
});

// Getting one
router.get('/:id', getSubscriber, (req, res) => {
  // res.send(res.subscriber.name);
  res.json(res.subscriber);
});

// Creating one
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })

  try {
    const newSubscriber = await subscriber.save();
    // 201 means the item was created
    res.status(201).json(newSubscriber);
  } catch {
    // 400 bad user input
    res.status(400).json({message: err.message});
  }
});

// Updating one
router.patch('/:id', getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.subscribedToChannel != null) {
    res.body.subscribedToChannel = req.body.subscribedToChannel;
  }
  try {
    const updatedSubscriber = await res.subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({message:err.message});
  }
});

// Deleting one
router.delete('/:id', getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: 'Deleted Subscriber'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

// Middleware
async function getSubscriber(req, res, next) {
  let subscriber;
  // any function that accesses db code must be an async
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(400).json({ message: 'Cannot find subscriber' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router