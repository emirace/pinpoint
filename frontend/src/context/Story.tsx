import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  getAllStoriesGroupedByUser,
  createStory,
  StoryData,
} from "../services/story";
import { IStory } from "../types/story";
import { useUser } from "./User";
import { Location } from "../types/location";

export interface SortedStory {
  _id: string;
  location?: Location;
  media: string;
  mediaType: "image" | "video";
  caption?: string;
  views: string[];
  createdAt: Date;
  username: string;
  avatarUrl: string;
}
// Define the shape of the context data
interface StoryContextType {
  stories: IStory[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
  addStory: (storyData: StoryData) => Promise<void>;
  getSortedStoryMedia: (userId: string) => SortedStory[];
}

// Create the Story Context
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// StoryProvider component
export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  // Function to fetch all stories grouped by user
  const fetchStories = async () => {
    try {
      const data = await getAllStoriesGroupedByUser();
      console.log(data);
      const sortedStory = sortStoriesByRecentAndNotViewed(data);
      setStories(sortedStory);
    } catch (err) {
      console.log("error", err);
      throw err;
    }
  };

  // Function to add a new story
  const addStory = async (storyData: StoryData) => {
    try {
      setUploading(true);
      await createStory(storyData);
      await fetchStories();
    } catch (err) {
      throw err;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const initialFetchStories = async () => {
      if (!user) return;
      try {
        setLoading(true);
        await fetchStories();
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    initialFetchStories();
  }, [user]);

  const sortStoriesByRecentAndNotViewed = (
    storiesArray: IStory[]
  ): IStory[] => {
    return storiesArray.sort((a, b) => {
      // Find the most recent story for each user
      const latestStoryA = a.stories.reduce((latest, current) =>
        new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current
      );
      const latestStoryB = b.stories.reduce((latest, current) =>
        new Date(latest.createdAt) > new Date(current.createdAt)
          ? latest
          : current
      );

      // Check if the logged-in user has viewed the latest story
      const aViewed = latestStoryA.views.includes(user!._id);
      const bViewed = latestStoryB.views.includes(user!._id);
      // Priority 1: Unviewed stories should come first
      if (!aViewed && bViewed) return -1;
      if (aViewed && !bViewed) return 1;

      // Priority 2: Sort by the most recent story
      return (
        new Date(latestStoryB.createdAt).getTime() -
        new Date(latestStoryA.createdAt).getTime()
      );
    });
  };

  const getSortedStoryMedia = (userId: string): SortedStory[] => {
    const notViewedStories: SortedStory[] = [];

    const viewedStories: SortedStory[] = [];

    stories.forEach((story) => {
      story.stories.forEach((individualStory) => {
        if (individualStory.views.includes(user!._id)) {
          viewedStories.push({
            ...individualStory,
            username: story.user.username,
            avatarUrl: story.user.avatarUrl,
          });
        } else {
          notViewedStories.push({
            ...individualStory,
            username: story.user.username,
            avatarUrl: story.user.avatarUrl,
          });
        }
      });
    });

    const userNotViewedStories =
      stories
        .map((story) => ({
          ...story,
          stories: story.stories.map((s) => ({
            ...s,
            username: story.user.username,
            avatarUrl: story.user.avatarUrl,
          })),
        }))
        .find((story) => story._id === userId)
        ?.stories.filter((story) => !story.views.includes(user!._id)) || [];

    return [...userNotViewedStories, ...notViewedStories, ...viewedStories];
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        loading,
        uploading,
        error,
        fetchStories,
        addStory,
        getSortedStoryMedia,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

// Custom hook to use the Story Context
export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
