import { Comment } from "./comment";
import { Location } from "./location";

export enum MediaType {
  IMAGE = "image",
  VIDEO = "video",
}

interface Media {
  url: string;
  type: MediaType;
}

export interface Post {
  _id: string;
  partnerId: string;
  location: Location;
  content?: string;
  media?: Media[];
  likes: string[];
  createdAt: Date;
  comments: string[];
}
