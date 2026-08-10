import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      trim: true,
      lowercase: true
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },
    semester: {
      type: String,
      required: [true, 'Semester is required']
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Associated Event ID is required']
    }
  },
  {
    timestamps: true
  }
);

// This safely checks if the model exists, otherwise creates it pointing to 'registrations'
export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema, 'registrations');