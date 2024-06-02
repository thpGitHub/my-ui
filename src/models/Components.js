import mongoose from 'mongoose';

const ComponentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true }
});

export default mongoose.models.Component || mongoose.model('Component', ComponentSchema);
