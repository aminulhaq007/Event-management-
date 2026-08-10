import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    venue: {
      type: String,
      required: [true, 'Event venue is required'],
      trim: true
    },
    image: {
      type: String,
      required: [true, 'Event image URL is required'],
      default: 'https://images.unsplash.com/photo-1511578314322-379afb476865'
    }
  },
  {
    timestamps: true
  }
);

// This safely checks if the model exists, otherwise creates it pointing to 'events'
export default mongoose.models.Event || mongoose.model('Event', eventSchema, 'events');