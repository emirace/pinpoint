import { User } from "./user";

export interface IStory {
  _id: string;
  user: User;
  location?: Location;
  media: string;
  mediaType: "image" | "video";
  caption?: string;
  views: string[];
  isArchived: boolean;
  isDeleted: boolean;
  createdAt: Date;
}
