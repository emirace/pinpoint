import { Location } from "./location";
import { User } from "./user";

interface ServiceOption {
  optionCategory: string;
  optionName: string;
}

interface IReivew {
  userId: string;
  _id: string;
  content: string;
  rating: number;
}
export interface IService {
  _id: string;
  user: User;
  name: string;
  description: string;
  priceType: "flat" | "range";
  priceRange: { from: number; to: number } | null;
  price: number | null;
  images: string[];
  duration: string;
  location: Location[];
  mainCategory: string[];
  category: string[];
  subCategory?: string[];
  options?: ServiceOption[];
  reviews: IReivew[];
  rating: number;
  homeService: boolean;
  serviceRadius?: string;
  createdAt: Date;
}
