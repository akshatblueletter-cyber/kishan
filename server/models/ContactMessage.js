import mongoose from 'mongoose';

// The subjects offered on the contact form (must match the contactForm block on the Contact page).
export const CONTACT_SUBJECTS = [
  'General correspondence',
  'Book-related enquiries',
  'Media / Speaking / Institutional Enquiry',
];

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, enum: CONTACT_SUBJECTS, default: CONTACT_SUBJECTS[0] },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    emailSent: { type: Boolean, default: false }, // was the notification email delivered?
    meta: {
      ip: { type: String, default: '' },
      userAgent: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });

export default mongoose.model('ContactMessage', contactMessageSchema);
