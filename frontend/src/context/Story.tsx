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

// Define the shape of the context data
interface StoryContextType {
  stories: IStory[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
  fetchStories: () => Promise<void>;
  addStory: (storyData: StoryData) => Promise<void>;
}

// Create the Story Context
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// StoryProvider component
export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Function to fetch all stories grouped by user
  const fetchStories = async () => {
    try {
      const data = await getAllStoriesGroupedByUser();
      setStories(data);
    } catch (err) {
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
  }, []);

  return (
    <StoryContext.Provider
      value={{ stories, loading, uploading, error, fetchStories, addStory }}
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
