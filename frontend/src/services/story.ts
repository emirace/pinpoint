import axiosInstance from "./api";

export interface StoryData {
  location: string;
  content: string;
  media: string[];
  mediaType: "image" | "video";
}

// Create a new story
export const createStory = async (storyData: StoryData) => {
  try {
    const response = await axiosInstance.post(`/stories`, storyData);
    return response.data;
  } catch (error) {
    console.error("Error creating story:", error);
    throw error;
  }
};

// Get all stories grouped by user
export const getAllStoriesGroupedByUser = async () => {
  try {
    const response = await axiosInstance.get(`/stories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};
