import Registration from '../models/Registration.js';

export const createRegistration = async (req, res) => {
  try {
    const { studentName, email, department, semester, eventId } = req.body;

    if (!studentName || !email || !department || !semester || !eventId) {
      return res.status(400).json({ message: 'All structural context field values are required' });
    }

    const existingRegistration = await Registration.findOne({ email, eventId });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Email address already associated with a submission entry for this event' });
    }

    const enrollment = new Registration({ studentName, email, department, semester, eventId });
    const savedEnrollment = await enrollment.save();
    res.status(201).json(savedEnrollment);
  } catch (error) {
    res.status(500).json({ message: 'Database transactional runtime error during profile enrollment persistence execution', error: error.message });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const enrollments = await Registration.find({}).populate('eventId', 'title date venue');
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Failed processing reference parsing on data pipeline queries', error: error.message });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const enrollment = await Registration.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Specified identity metric index record trace non-existent' });
    }

    await Registration.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Registration tracking profile disconnected and eliminated' });
  } catch (error) {
    res.status(500).json({ message: 'Operational processing breakdown during extraction runtime parameters', error: error.message });
  }
};