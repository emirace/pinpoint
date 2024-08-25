export type Reply = {
  id: string;
  username: string;
  content: string;
  likes: number;
  time: string;
};

export type Comment = {
  id: string;
  username: string;
  content: string;
  likes: number;
  time: string;
  replies: Reply[];
};
