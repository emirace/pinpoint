import { Request, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import Story from "../models/story";
import { uploadMediaToS3 } from "../utils/media";

// Create a new story
export const createStory = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { mediaType, caption, location } = req.body;
    console.log(req.body);
    // Assuming you are using some kind of authentication middleware to set req.user
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }
    console.log(req.files);
    const mediaUploadPromises: Promise<any>[] = [];
    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const mediaType = file.mimetype.startsWith("image") ? "image" : "video";
        mediaUploadPromises.push(
          uploadMediaToS3(file.path, file.filename, mediaType)
        );
      }
    }

    const mediaUploadResults = await Promise.all(mediaUploadPromises);
    console.log(mediaUploadResults);

    // Create a new story
    const newStory = new Story({
      user: userId,
      location,
      media: mediaUploadResults[0].url,
      mediaType,
      caption,
    });

    // Save the story to the database
    const savedStory = await newStory.save();

    res
      .status(201)
      .json({ message: "Story created successfully", story: savedStory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all stories, grouped by user
export const getAllStoriesGroupedByUser = async (
  req: Request,
  res: Response
) => {
  try {
    // Fetch stories that are not archived or deleted and created within the last 24 hours
    const stories = await Story.find({
      isArchived: false,
      isDeleted: false,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }, // Stories within 24 hours
    })
      .populate("user", "username avatarUrl")
      .populate("location", "images locationName address");
    // .sort({ createdAt: -1 });

    // Group stories by user
    const groupedStories = stories.reduce((acc: any, story: any) => {
      const userId = story.user._id;

      if (!acc[userId]) {
        acc[userId] = {
          _id: userId,
          user: {
            username: story.user.username,
            avatarUrl: story.user.avatarUrl,
          },
          stories: [],
        };
      }

      acc[userId].stories.push({
        _id: story._id,
        media: story.media,
        mediaType: story.mediaType,
        caption: story.caption,
        createdAt: story.createdAt,
        views: story.views,
      });

      return acc;
    }, {});

    // Convert the grouped object into an array for easier frontend handling
    const result = Object.values(groupedStories);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
