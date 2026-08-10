import Event from '../models/Event.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error parsing event listings', error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Target event record not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error extracting individual event operational parameters', error: error.message });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, venue, image } = req.body;
    
    if (!title || !description || !date || !venue) {
      return res.status(400).json({ message: 'Mandatory structural form entities missing values' });
    }

    const newEvent = new Event({ title, description, date, venue, image });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to commit new event data securely into storage parameters', error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, venue, image } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Target event requested for update operation missing' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.venue = venue || event.venue;
    event.image = image || event.image;

    const updatedEvent = await event.save();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Modification failure within runtime update routine', error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Target event element missing from standard collections' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event entry eliminated safely from active data clusters' });
  } catch (error) {
    res.status(500).json({ message: 'Purge routine failure during data collection operations', error: error.message });
  }
};