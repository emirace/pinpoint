import mongoose, { Schema, Document, Model } from "mongoose";

interface ILead extends Document {
  customerName: string;
  email: string;
  phone: string;
  contactMethod: "text" | "email" | "call"; // Specify the types for contact method
  address: string;
  serviceRequestDate: Date; // Consider using Date type for the date field
  details: string; // Details about the service requested
  location: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  partner: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  uploadedMedia?: string[];
  status: string;
  note: string;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    contactMethod: {
      type: String,
      enum: ["text", "email", "call"],
      required: true,
    },
    address: { type: String, required: true },
    serviceRequestDate: { type: Date, required: true },
    details: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
    service: { type: Schema.Types.ObjectId, ref: "Service" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    partner: { type: Schema.Types.ObjectId, ref: "User" },
    uploadedMedia: { type: [String], default: [] },
    status: { type: String, default: "pending" },
    note: { type: String },
  },
  { timestamps: true }
);

// Create the Lead model
const Lead: Model<ILead> = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
