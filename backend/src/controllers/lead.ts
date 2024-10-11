import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Lead from "../models/lead"; // Import the Lead model
import { CustomRequest } from "../middleware/auth";
import Location from "../models/location";
import Service from "../models/service";
import { uploadMediaToS3 } from "../utils/media";

// Create Lead Controller
export const createLead = async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id;
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: "Validation errors",
      errors: errors.array(),
    });
    return;
  }

  try {
    const {
      customerName,
      email,
      phone,
      contactMethod,
      address,
      serviceRequestDate,
      details,
      location,
      service,
      uploadedMedia,
    } = req.body;

    const existService = await Service.findById(service);

    if (!existService) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }
    const existLocation = await Location.findById(location);

    if (!existLocation) {
      res.status(404).json({
        message: "Location not found",
      });
      return;
    }

    const imageUploadPromises: Promise<any>[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        imageUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const imageUploadResults = await Promise.all(imageUploadPromises);
    console.log(imageUploadResults);

    // Create a new Lead instance
    const newLead = new Lead({
      customerName,
      email,
      phone,
      contactMethod,
      address,
      serviceRequestDate,
      details,
      location,
      service,
      user: userId,
      partner: existLocation.partnerId,
      uploadedMedia: imageUploadResults.map((image) => image.url),
      status: "pending",
    });

    // Save the lead to the database
    const savedLead = await newLead.save();

    // Respond with the saved lead
    res.status(201).json({
      message: "Lead created successfully",
      lead: savedLead,
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    res.status(500).json({
      message: "Server error while creating lead",
      error: error.message,
    });
  }
};

// Add Note to Lead by Partner
export const addNoteToLead = async (req: CustomRequest, res: Response) => {
  const { leadId } = req.params;
  const { note } = req.body;
  const partnerId = req.user?._id;

  try {
    // Find the lead
    const lead = await Lead.findById(leadId);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    // Ensure the partner assigned to this lead is the one making the request
    if (String(lead.partner) !== String(partnerId)) {
      res.status(403).json({
        message: "You are not authorized to add a note to this lead",
      });
      return;
    }

    // Update the note field
    lead.note = note;
    await lead.save();

    res.status(200).json({
      message: "Note added successfully",
      lead,
    });
  } catch (error: any) {
    console.error("Error adding note to lead:", error);
    res.status(500).json({
      message: "Server error while adding note to lead",
      error: error.message,
    });
  }
};

// Approve or Decline Lead by Partner
export const approveOrDeclineLead = async (
  req: CustomRequest,
  res: Response
) => {
  const { leadId } = req.params;
  const { status } = req.body; // Status should be 'approved' or 'declined'
  const partnerId = req.user?._id;

  try {
    // Validate status
    if (!["approved", "declined"].includes(status)) {
      res.status(400).json({
        message: "Invalid status value. Must be 'approved' or 'declined'.",
      });
      return;
    }

    // Find the lead
    const lead = await Lead.findById(leadId);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    // Ensure the partner assigned to this lead is the one making the request
    if (String(lead.partner) !== String(partnerId)) {
      res.status(403).json({
        message: "You are not authorized to update this lead",
      });
      return;
    }

    if (lead.status === "approved" || lead.status === "declined") {
      res.status(400).json({
        message: `Cannot update lead status. Lead is already ${lead.status}.`,
      });
      return;
    }

    // Update the status field
    lead.status = status;
    await lead.save();

    res.status(200).json({
      success: true,
      message: `Lead ${status} successfully`,
      lead,
    });
  } catch (error: any) {
    console.error("Error approving or declining lead:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating lead status",
      error: error.message,
    });
  }
};

// Controller to get all leads for a partner
export const getPartnerLeads = async (req: CustomRequest, res: Response) => {
  const partnerId = req.user?._id;

  try {
    const leads = await Lead.find({ partner: partnerId });

    if (!leads || leads.length === 0) {
      res.status(404).json({
        message: "No leads found for this partner",
      });
      return;
    }

    res.status(200).json({
      message: "Partner leads fetched successfully",
      leads,
    });
  } catch (error: any) {
    console.error("Error fetching partner leads:", error);
    res.status(500).json({
      message: "Server error while fetching partner leads",
      error: error.message,
    });
  }
};
