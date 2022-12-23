export interface IPost {
  id: number;
  image?: string;
  text: string;
  // lesson_num: number;
  title: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
  // author: number;
  // date: string;
  liked?: boolean;
  marked?: boolean;
}
