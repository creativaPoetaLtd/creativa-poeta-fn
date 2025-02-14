export interface Job {
  _id: string;
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  howToApply: string;
  applicationInstructions: string;
  isRemote: boolean;
  createdAt: string;
  updatedAt: string;
}