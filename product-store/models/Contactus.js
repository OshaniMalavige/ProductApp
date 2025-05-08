import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String },
}, { timestamps: true });

export default mongoose.models.Contactus || mongoose.model('Contactus', contactSchema);